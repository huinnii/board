<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
    <title>Detail</title>
</head>

<h2> 게시글 상세 </h2>
<body>

<button class="btn btn-primary"  onclick="location.href='/modifyBoard/${boardDetail.idx}'">수정</button>
<button class="btn btn-danger" onclick="location.href='/delete/${boardDetail.idx}'">삭제</button>

<table border="2">
    <tr>
        <td colspan="10">
            <a href="/list"> 목록 </a>
        </td>
    </tr>
    <tr>
        <th>번호</th>
        <td colspan="3">${boardDetail.idx}</td>
        <th>조회수</th>
        <td colspan="3">${boardDetail.hit}</td>
        <th>글쓴이</th>
        <td colspan="3">${boardDetail.writer}</td>
    </tr>
    <tr>
        <th>제목</th>
        <td colspan="11">${boardDetail.title}</td>
    </tr>
    <tr>
        <th>작성일</th>
        <td colspan="5">${boardDetail.regdate}</td>
        <th>수정일</th>
        <td colspan="5">${boardDetail.moddate}</td>
    </tr>
    <tr>
        <td colspan="12" height="400" >${boardDetail.content}</td>
    </tr>

</table>
</body>
</html>