var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.

router.get("/",function(request,response){
    response.send('board 접속');
});

/*
 로딩된 mysql 객체로부터 커넥션을 하나 생성합니다. 이때 실제적인 DB와의 연결은 이루어지지 않습니다.
 이후 query문이 실행될 때 이 커넥션을 통해 DB와 연결됩니다.
 */
var connection = mysql.createConnecthion({
    host: 'localhost', // DB가 위치한 IP주소
    port: 3306,          // DB와 연결할 포트번호
    user: 'root',        // 계정이름
    password: '',    // 계정 비밀번호
    database: 'board04'    // 데이터베이스 이름
});

router.get("/list",function(request,response){

    var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board where state="Y" order by idx desc'
        ,function(err,rows){
        if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
        console.log('rows :' +  rows);
        response.render('list', { title:'Board List',rows: rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
    });
});

/* Read Page */
router.get('/read/:idx',function (req,res,next) {
    /* GET 방식의 연결이므로 read 페이지 조회에 필요한 idx 값이 url 주소에 포함되어 전송됩니다.
     이 idx값을 참조하여 DB에서 해당하는 정보를 가지고 옵니다.
    * url에서 idx 값을 가져오기 위해 request 객체의 params 객체를 통해 idx값을 가지고 옵니다.*/
    var idx = req.params.idx;
    console.log("idx : "+idx);
    /*
    * Node는 JSP에서 JDBC의 sql문 PreparedStatement 처리에서와 같이 sql문을 작성할 때
    * ? 를 활용한 편리한 쿼리문 작성을 지원합니다.
    * Node에서 참조해야할 인자값이 있을 때 ? 로 처리하고
    * []를 통해 리스트 객체를 만든 후 ? 의 순서대로 입력해주시면 자동으로 쿼리문에 삽입됩니다.
    * 아래에는 ?에 idx값이 자동으로 매핑되어 쿼리문을 실행합니다.
    * */
    connection.beginTransaction(function(err){
        if(err) console.log(err);
        connection.query('update board set hit=hit+1 where idx=?', [idx], function (err) {
            if(err) {
                /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                console.log(err);
                connection.rollback(function (){
                    console.error('rollback error1');
                })
            }
            connection.query('select idx,title,content,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate,DATE_FORMAT(regdate, "%Y/%m/%d %T") as regdate from board where idx=? and state="Y"',[idx],function(err,rows)
            {
                if(err) {
                    /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                    console.log(err);
                    connection.rollback(function () {
                        console.error('rollback error2');
                    })
                }
                else {
                    connection.commit(function (err) {
                        if(err) console.log(err);
                        console.log("row : " + rows);

                        connection.query('select idx,pid,replyer,rep_content,pp,DATE_FORMAT(rep_moddate, "%Y/%m/%d %T") as rep_moddate from replyment where ppid=? and use_yn="Y" order by pid=idx desc,pp,rep_moddate;',[idx],function(err,rowss)
                        {
                            if(err) {
                                /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                                console.log(err);
                                connection.rollback(function () {
                                    console.error('rollback error2');
                                })
                            }
                            else {
                                    connection.commit(function (err) {
                                        if(err) console.log(err);
                                        console.log("rowss : " + rowss);
                                                //res.render('read',{title:rows[0]. title, rows:rows ,rowss : rowss});
                                        connection.query('select max(idx) as max from replyment',function (err,cnt) {
                                            if(err){
                                                console.log(err);
                                                connection.rollback(function () {
                                                    console.error('rollback error2')
                                                })
                                            }
                                            else{
                                                connection.commit(function (err) {
                                                    if(err) console.log(err);
                                                    console.log("cnt: "+cnt);
                                                    res.render('read',{title:rows[0]. title, rows:rows ,rowss : rowss, cnt:cnt});
                                                })
                                            }
                                        })
                                    })
                            }
                        })
                    })
                }

            })
        })
    })

    //댓글 작성
    router.post('/read/:idx',function (req,res,next) {

        var idx = req.params.idx;
        console.log("idx : " + idx);

        var body = req.body;
        var cidx=req.body.cid;
        var pp = req.body.pp;
        var replyer = req.body.replyer;
        var rep_content=req.body.rep_content;

        if(cidx!=null) {
            if (replyer != null) {
                connection.beginTransaction(function (err) {
                    if (err) console.log(err);
                    connection.query('insert into replyment(pid,ppid,replyer,rep_content,pp) values(?,?,?,?,?)'
                        , [cidx, idx, replyer, rep_content, pp]
                        , function (err) {
                            if (err) {
                                /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                                console.log(err);
                                connection.rollback(function () {
                                    console.error('rollback error1');
                                })
                            } else {
                                connection.commit(function (err) {
                                    if (err) console.log(err);
                                    res.redirect('/board/read/' + idx);
                                })
                            }
                        })
                })
            }
            else
            {
                connection.beginTransaction(function (err) {
                    if (err) console.log(err);
                    connection.query('update replyment set use_yn="N" where idx=? and ppid=?'
                        , [cidx,idx]
                        , function (err) {
                            if (err) {
                                /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                                console.log(err);
                                connection.rollback(function () {
                                    console.error('rollback error1');
                                })
                            } else {
                                connection.commit(function (err) {
                                    if (err) console.log(err);
                                    //console.log("row : " + rows);
                                    //var idx = rows[0].idx;
                                    res.redirect('/board/read/'+idx);
                                })
                            }
                        }
                    )
                })
            }
        }
        else
            {
                    connection.beginTransaction(function (err) {
                        if (err) console.log(err);
                        connection.query('update board set state="N" where idx=?'
                            , [idx]
                            , function (err) {
                                if (err) {
                                    /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                                    console.log(err);
                                    connection.rollback(function () {
                                        console.error('rollback error1');
                                    })
                                } else {
                                    connection.commit(function (err) {
                                        if (err) console.log(err);
                                        //console.log("row : " + rows);
                                        //var idx = rows[0].idx;
                                        res.redirect('/board/list');
                                    })
                                }
                            }
                        )
                    })

            }
    })
})

/* Write Page */
// GET 방식의 요청이 들어왔을 때 write페이지로 이동합니다.

router.get('/write',function (req,res) {
    res.render('write',{title:'글 쓰기 페이지'})
})
// POST 방식의 요청이 들어왔을 때 데이터를 DB에 저장하고 해당하는 DB의 IDX값을
// 가지고 온 후 Read 페이지로 이동합니다.
router.post('/write',function (req,res,next) {
    /*
    *POST 방식의 요청을 URL에 데이터가 포함되지 않고 BODY에 포함되어 전송됩니다.
    * 때문에 request 객체를 통해 body에 접근 후 데이터를 가지고 옵니다.
     *  */
    var body = req.body;
    var writer = req.body.writer;
    var title = req.body.title;
    var content = req.body.content;
    var password = req.body.password;

    connection.beginTransaction(function(err) {
        if(err) console.log(err);
        connection.query('insert into board(title,writer,content,password) values(?,?,?,?)'
            ,[title,writer,content,password]
            ,function (err) {
                if(err) {
                    /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                    console.log(err);
                    connection.rollback(function () {
                        console.error('rollback error1');
                    })
                }
                connection.query('SELECT LAST_INSERT_ID() as idx',function (err,rows) {
                    if(err) {
                        /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                        console.log(err);
                        connection.rollback(function () {
                            console.error('rollback error1');
                        })
                    }
                    else
                    {
                        connection.commit(function (err) {
                            if(err) console.log(err);
                            console.log("row : " + rows);
                            var idx = rows[0].idx;
                            res.redirect('/board/read/'+idx);
                        })
                    }
                })
            })
    })
})

/* Modify Page */
router.get('/modify/:idx',function (req,res,next) {

    var idx = req.params.idx;
    console.log("idx : " + idx);

    connection.beginTransaction(function(err){
        if(err) console.log(err);

            connection.query('select idx,title,content,writer,password from board where idx=?',[idx],function(err,rows)
            {
                if(err) {
                    /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                    console.log(err);
                    connection.rollback(function () {
                        console.error('rollback error2');
                    })
                }
                else {
                    connection.commit(function (err) {
                        if(err) console.log(err);
                        console.log("row : " + rows);
                        res.render('modify',{title:rows[0].title , rows : rows});
                    })
                }
            })
        })


    /* 수정 POST */

    router.post('/modify/:idx',function (req,res,next) {
        /*
        *POST 방식의 요청을 URL에 데이터가 포함되지 않고 BODY에 포함되어 전송됩니다.
        * 때문에 request 객체를 통해 body에 접근 후 데이터를 가지고 옵니다.
         *  */
        var body = req.body;
        var writer = body.writer;
        var title = req.body.title;
        var content = req.body.content;
        var password = req.body.password;

        connection.beginTransaction(function(err) {
            if(err) console.log(err);
            connection.query('update board set title=?, writer=?, content=?, moddate=now() where idx=? and password=? '
                ,[title,writer,content,idx,password]
                ,function (err) {
                    if(err) {
                        /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                        console.log(err);
                        connection.rollback(function () {
                            console.error('rollback error1');
                        })
                    }
                    connection.query('SELECT LAST_INSERT_ID() as idx',function (err,rows) {
                        if(err) {
                            /* 이 쿼리문에서 에러가 발생했을때는 쿼리문의 수행을 취소하고 롤백합니다.*/
                            console.log(err);
                            connection.rollback(function () {
                                console.error('rollback error1');
                            })
                        }
                        else
                        {
                            connection.commit(function (err) {
                                if(err) console.log(err);
                                console.log("row : " + rows);
                                //var idx = rows[0].idx;
                                res.redirect('/board/read/'+idx);
                            })
                        }
                    })
                })
        })
    })

})




/* GET List Page.
router.get('/list',function (req,res,next) {
    res.redirect('/board/1')// /board로 접속요청이 들어왔을 때 1페이지로 자동으로 이동하도록 리다이렉트 해줍니다.
})
router.get('/list/:page', function(req, res, next) {

    var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board',function(err,rows){
        if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
        console.log('rows :' +  rows);
        res.render('list', { title:'Board List',rows: rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
    });
});
*/
module.exports = router;
