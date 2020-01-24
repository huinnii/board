<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
         pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR"></meta>
        <title>List</title>
    </head>

    <h2> �Խñ� ��� </h2>
    <body>
        <table border="2">
            <thead>
            <tr>
                <th>��ȣ</th>
                <th>����</th>
                <th>�۾���</th>
                <th>��ȸ��</th>
                <th>������</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${boardList}" var = "board">
                <tr>
                    <td>${board.idx}</td>
                    <td><a href = "/read/${board.idx}">${board.title}</a></td>
                    <td>${board.writer}</td>
                    <td>${board.hit}</td>
                    <td>${board.moddate}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    <a href = "/insert">�� ���</a>
    </body>
</html>