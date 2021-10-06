$(document).ready(function () {
    $("#areas").click(function (e) {
        let parentOffset = $("#areas").eq(0).offset();
        let x = (e.pageX - parentOffset.left).toFixed(5);
        let y = (e.pageY - parentOffset.top).toFixed(5);

        let canvas = document.getElementById("areas");
        let size = canvas.width;
        let radius = 5;

        x = (x - 0.5 * size + radius * 0.5) / (size * 0.4);
        y = (y - 0.5 * size + radius * 0.5) / (size * 0.4);
        y = - y;
        let r = getText('r').eq(0).val();
        x = (x * r).toFixed(5);
        y = (y * r).toFixed(5);
        if (validateR()) {
            sendRequest(x, y, r);
        } else {
            alert("Введите корректный R")
        }
    });
});