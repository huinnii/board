<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
        <title>List</title>
    </head>

    <h2> 게시글 목록 </h2>
    <body>
        <table border="2">
            <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>조회수</th>
                <th>수정일</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${boardList}" var = "board">
                <tr>
                    <td>${board.idx}</td>
                    <td><a href = "/detail/${board.idx}">${board.title}</a></td>
                    <td>${board.writer}</td>
                    <td>${board.hit}</td>
                    <td>${board.moddate}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    <a href = "/addBoard">글 등록</a>
    </body>
</html>