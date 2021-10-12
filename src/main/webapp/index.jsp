<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="javax.servlet.ServletContext" %>
<%@ page import="java.util.LinkedList" %>
<%@ page import="shagiev.weebo.beans.ResponseBean" %>
<%@ page import="java.util.Iterator" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>web lab №2</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="icon" href="favicon.png" type="image/png">
  <script src="js/main.js"></script>
  <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
  <script src="js/areasDrawer.js"></script>
  <script src="js/clickHandler.js"></script>
</head>
<body>
<table id="main_table">
  <tr>
    <th colspan="2" id="header">Шагиев Семён P3231 вариант 73551</th>
  </tr>
  <tr>
    <td>
      <canvas id="areas" width="800" height="800">
        <img id="areas_picture" src="newAreas.svg" alt="areas picture">
      </canvas>
<%--      раньше форма была здесь--%>
    </td>
    <td>
      <form id="main_form" method="post" onsubmit="return handleForm()">
        <div class="input-container">
          X :
          <label>
            <input type="radio" name="x" value="-5">
            -5
          </label>
          <label>
            <input type="radio" name="x" value="-4">
            -4
          </label>
          <label>
            <input type="radio" name="x" value="-3">
            -3
          </label>
          <label>
            <input type="radio" name="x" value="-2">
            -2
          </label>
          <label>
            <input type="radio" name="x" value="-1">
            -1
          </label>
          <label>
            <input type="radio" name="x" value="0">
            0
          </label>
          <label>
            <input type="radio" name="x" value="1">
            1
          </label>
          <label>
            <input type="radio" name="x" value="2">
            2
          </label>
          <label>
            <input type="radio" name="x" value="3">
            3
          </label>
        </div>
        <br>
        <div class="input-container">
          Y :
          <label>
            <input type="text" name="y" placeholder="значение от -5 до 5">
          </label>
        </div>
        <br>
        <div class="input-container">
          R :
          <label>
            <input type="text" name="r" placeholder="значение от 1 до 4">
          </label>
        </div>
        <br>
        <button type="submit" name="submit">Проверить</button>
      </form>
      <table id="response_table">
        <thead>
          <td>Результат</td>
          <td>X</td>
          <td>Y</td>
          <td>R</td>
          <td>Время</td>
          <td>Выполнение, нс</td>
        </thead>
        <tbody id="response_body">
          <%
            Object historyAttribute = application.getAttribute("history");
            LinkedList history;
            if (historyAttribute instanceof LinkedList) {
                history = (LinkedList) historyAttribute;
                for (Iterator it = history.descendingIterator(); it.hasNext(); ) {
                    Object next = it.next();
                    if (next instanceof ResponseBean) {
                      ResponseBean responseBean = (ResponseBean) next;
                      out.println("<tr><td>" + responseBean.isResult()
                              + "</td><td>" + responseBean.getX()
                              + "</td><td>" + responseBean.getY()
                              + "</td><td>" + responseBean.getR()
                              + "</td><td>" + responseBean.getCurrentTime()
                              + "</td><td>" + responseBean.getExecutionTime() + "</td></tr>");
                    }
                }
            }
          %>
        </tbody>
      </table>
    </td>
  </tr>
</table>
</body>
</html>