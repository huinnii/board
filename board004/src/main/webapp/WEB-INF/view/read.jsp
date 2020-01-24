<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
         pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
    <title>Detail</title>
</head>

<body>

<h2> 게시글 상세 </h2>
<table border="2">
    <tbody>
    <tr>
        <td colspan="10">
            <a href="/list"> 목록 </a>
        </td>
        <td colspan="2" style = align:right>
            <a href="modify/${board.idx}">수정</a>
        </td>
    </tr>
    <thead>
    <tr>
        <th>번호</th>
        <p>${read.idx}</p>
        <th>조회수</th>
        <td colspan="3">${board.hit}</td>
        <th>글쓴이</th>
        <td colspan="3">${board.writer}</td>
    </tr>
    <tr>
        <th>제목</th>
        <td colspan="11">${board.title}</td>
    </tr>
    <tr>
        <th>작성일</th>
        <td colspan="5">${board.regdate}</td>
        <th>수정일</th>
        <td colspan="5">${board.moddate}</td>
    </tr>
    <tr>
        <td colspan="12" height="400">${board.content}</td>
    </tr>

    </thead>
    </tbody>
</table>
</body>
</html>