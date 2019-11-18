"use strict";

var handlePass = function handlePass(e) {
    e.preventDefault();

    if ($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords must match!");
        return false;
    }

    handleError("");

    // Sends signup request to the server
    sendAjax('PATCH', $("#changePass").attr("action"), $("#changePass").serialize(), function (account) {
        $("#passSuccess").text('Password changed successfully!');
    });
};

var AccountInfo = function AccountInfo(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            { id: "passLabel" },
            "Change Password"
        ),
        React.createElement(
            "form",
            { id: "changePass",
                name: "changePass",
                onSubmit: handlePass,
                action: "/changePass",
                method: "PATCH",
                className: "changePass" },
            React.createElement(
                "label",
                { htmlFor: "pass" },
                "Password: "
            ),
            React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
            "  ",
            React.createElement("br", null),
            React.createElement(
                "label",
                { htmlFor: "pass2" },
                "Password: "
            ),
            React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { id: "passSubmit", type: "submit", value: "Change Password" }),
            React.createElement("div", { id: "errorMessage" })
        )
    );
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(AccountInfo, { csrf: csrf }), document.querySelector("#accountInfo"));
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

// Updates the error message div
var handleError = function handleError(message) {
    $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
    window.location = response.redirect;
};

// Sends requests to the server
var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
