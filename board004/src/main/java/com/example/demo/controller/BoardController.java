package com.example.demo.controller;

import com.example.demo.model.BoardModel;
import com.example.demo.service.BoardService;
import com.example.demo.utils.PagingVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

@Controller
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping("/list")
    public String boardList(PagingVO vo, Model model, @RequestParam(value="nowPage",required=false)String nowPage,
                            @RequestParam(value="cntPerPage",required=false)String cntPerPage){

        int total = boardService.countBoard();

        if(nowPage==null && cntPerPage==null){
            nowPage="1";
            cntPerPage="5";
        }
        else if(nowPage==null){
            nowPage="1";
        }
        else if(cntPerPage==null){
            cntPerPage="5";
        }
        vo=new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
        model.addAttribute("paging",vo);

        model.addAttribute("viewAll",boardService.selectBoard(vo));

        return "list";
    }

    @RequestMapping("/addBoard")
    public String addBoard(Model model){
        return "addBoard";
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public ModelAndView insert(HttpServletRequest request) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");
        BoardModel board=new BoardModel();
        board.setTitle((String)request.getParameter("title"));
        board.setWriter((String)request.getParameter("writer"));
        board.setContent((String)request.getParameter("content"));
        board.setPassword((String)request.getParameter("password"));

        boardService.insertBoard(board);
        ModelAndView result = new ModelAndView("redirect:/list");

        return result;
    }

    @RequestMapping(value = "/detail/{idx}")
    public String detail(@PathVariable int idx, Model model) throws Exception{
        boardService.hitBoard(idx);

        BoardModel board = boardService.printDetail(idx);

        model.addAttribute("boardDetail",board);

        return "detail";
    }

    @RequestMapping(value = "/delete/{idx}")
    public ModelAndView delete(HttpServletRequest request, @PathVariable int idx) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");

        boardService.deleteBoard(idx);
        ModelAndView result = new ModelAndView("redirect:/list");

        return result;
    }

    @RequestMapping("/modifyBoard/{idx}")
    public String modify(@PathVariable int idx, Model model) throws Exception{

        BoardModel board = boardService.printDetail(idx);

        model.addAttribute("boardDetail",board);

        return "modifyBoard";
    }

    @RequestMapping(value = "/update/{idx}")
    public ModelAndView update(HttpServletRequest request, @PathVariable int idx) throws UnsupportedEncodingException {
        request.setCharacterEncoding("UTF-8");
        BoardModel board=new BoardModel();
        board.setIdx((Integer)idx);
        board.setTitle((String)request.getParameter("title"));
        board.setWriter((String)request.getParameter("writer"));
        board.setContent((String)request.getParameter("content"));
        board.setPassword((String)request.getParameter("password"));
        SimpleDateFormat format1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        board.setModdate((String)format1.format(System.currentTimeMillis()));
        boardService.updateBoard(board);

        ModelAndView result = new ModelAndView("redirect:/detail/{idx}");

        return result;
    }

}
