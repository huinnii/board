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

<h2> 게시글 등록 </h2>
<body>
<form name="insertBoard" id="insertBoard" method="post" action="/insert">
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
            <td><input type="text" id="title" name="title" /></td>
            <td><input type="text" id="writer" name="writer" /></td>
            <td><input type="text" id="content" name="content" /></td>
            <td><input type="password" id="password" name="password" /></td>
        </tr>
    </tbody>
    </table>
    <input type="submit" name="추가" value="추가" id="insert" />
</form>
</body>
</html>