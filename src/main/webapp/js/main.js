function handleForm() {
    if(validateForm()) {
        request();
    }
    return false;
}

function request() {
    let x = getRadio('x').eq(0).val();
    let y = getText('y').eq(0).val();
    if (y == 0) {
        y = 0;
    }
    let r = getText('r').eq(0).val();
    sendRequest(x, y, r);
}

function sendRequest(x, y, r) {
    $.ajax({
        url: "./controller",
        type: "POST",
        data: {'x': x, 'y': y, 'r': r},
        success: function(response){
            // alert("succ: " + response);
            window.location.reload(true);
            // let data = JSON.parse(response);
            // addNewRow(data.result, data.x, data.y, data.r, data.current, data.execution);
        },
        error: function (response) {
            alert("err: " + response);
        }
    });
}

function addNewRow(result, x, y, r, time, execution) {
    let row = `<tr><td>${result}</td><td>${x}</td><td>${y}</td><td>${r}</td><td>${time}</td><td>${execution}</td></tr>`
    $("#response_table tbody").prepend(row);
}

function validateForm() {
    let validated = true;

    if (!validateRadio("x")) {
        $(".input-container:eq(0)").addClass("error-hovered");
        validated = false;
    } else {
        $(".input-container:eq(0)").removeClass("error-hovered");
    }

    if (!validateY()) {
        $(".input-container:eq(1)").addClass("error-hovered");
        validated = false;
    } else {
        $(".input-container:eq(1)").removeClass("error-hovered");
    }

    if (!validateR()) {
        $(".input-container:eq(2)").addClass("error-hovered");
        validated = false;
    } else {
        $(".input-container:eq(2)").removeClass("error-hovered");
    }

    return validated;
}

function validateRadio(name) {
    return getRadio(name).length === 1;
}

function validateY() {
    let y = getText("y").val();
    return y.match(/^-?[0-5]\.?[0-9]{0,5}$/) && y >= -5 && y <= 5;
}

function validateR() {
    let r = getText("r").val();
    return r.match(/^-?[0-5]\.?[0-9]{0,5}$/) && r >= 1 && r <= 4;
}

function getRadio(name) {
    return $(`:input[name = "${name}"]:checked`);
}

function getText(name) {
    return $(`:input[name = "${name}"]`);
}