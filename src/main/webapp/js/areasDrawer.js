$(document).ready(function () {
    drawPicture();
    drawAllDots();
});

function drawPicture() {
    let canvas = document.getElementById("areas");
    let ctx = canvas.getContext("2d");
    let img = document.getElementById("areas_picture");
    let size = canvas.width;
    ctx.drawImage(img, 0, 0, size, size);
}

function drawDot(x, y, result) {
    let canvas = document.getElementById("areas");
    let ctx = canvas.getContext("2d");
    let radius = 5;
    let size = canvas.width;

    x = x * size * 0.4 + 0.5 * size - radius * 0.5;
    y = - y;
    y = y * size * 0.4 + 0.5 * size - radius * 0.5;

    if (result) {
        ctx.fillStyle = 'rgba(0,255,13,0.77)'
    } else {
        ctx.fillStyle = 'rgba(255,0,59,0.77)'
    }

    // ctx.fillStyle = 'rgba(255,255,255,0.77)';

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawAllDots() {
    let rows = $("#response_body>tr");
    let str = "";
    for (let i = 0; i < rows.length; i++) {
        let row = rows.eq(i);
        let fields = row.children();
        let result = fields.eq(0).text() === 'true';
        let x = fields.eq(1).text();
        let y = fields.eq(2).text();
        let r = fields.eq(3).text();
        str += `x: ${x}, y: ${y}, r: ${r}\n`
        x /= r;
        x = x.toFixed(2);
        y /= r;
        y = y.toFixed(2);
        drawDot(x, y, result);
    }
}