<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
    <title>Insert</title>
</head>

<h2> 게시글 수정 </h2>
<body>
<form name="updateBoard" id="updateBoard" method="post" action="/update/${boardDetail.idx}">
    <table border="1">
        <thead>
        <tr>
            <th>제목</th>
            <th>글쓴이</th>
            <th>내용</th>
            <th>비밀번호</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><input type="text" id="title" name="title" value="${boardDetail.title}" /></td>
            <td><input type="text" id="writer" name="writer" value="${boardDetail.writer}" /></td>
            <td><input type="text" id="content" name="content" value="${boardDetail.content}" /></td>
            <td><input type="password" id="password" name="password" value="${boardDetail.password}" /></td>
        </tr>
        </tbody>
    </table>
    <input type="submit" name="수정" value="수정" id="update" />
</form>
</body>
</html>