"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Sends a POST request to the server with all the new hero information
var handleCharacter = function handleCharacter(e) {
    e.preventDefault();

    // Error checks to make sure all the information was added
    if ($("#heroName").val() == '' || $("#primAtt").val() == '' || $("#str").val() == '' || $("#agi").val() == '' || $("#int").val() == '' || $("#moveSpeed").val() == '' || $("#armor").val() == '' || $("#b1Name").val() == '' || $("#b2Name").val() == '' || $("#b3Name").val() == '' || $("#uName").val() == '' || $("#b1Desc").val() == '' || $("#b2Desc").val() == '' || $("#b3Desc").val() == '' || $("#uDesc").val() == '') {
        handleError("All fields are required");
        return false;
    }
    handleError('');

    sendAjax('POST', $("#dotaForm").attr("action"), $("#dotaForm").serialize(), function () {
        $("#character").text('Character created successfully!');
    });
};

// Sets up the basic from with a csrf token, which the actual form will be rendered into
var DotaForm = function DotaForm(props) {
    return React.createElement(
        "form",
        { id: "dotaForm",
            name: "dotaForm",
            onSubmit: handleCharacter,
            action: "/createDotaCharacter",
            method: "POST",
            className: "dotaForm" },
        React.createElement("div", { id: "dotaFormDiv" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf })
    );
};

// Sets up the form's interior, which is rendered into the above
var DotaCharacterForm = function DotaCharacterForm(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { id: "base" },
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "name" },
                    "Name"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "heroName", type: "text", name: "name", placeholder: "Hero Name" })
            ),
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "att" },
                    "Primary Attribute"
                ),
                React.createElement("br", null),
                React.createElement(
                    "select",
                    { name: "primAtt", id: "primAtt" },
                    React.createElement(
                        "option",
                        null,
                        "Strength"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "Agility"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "Intelligence"
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { id: "stats" },
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "str" },
                    "Strength"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "str", type: "number", name: "str", placeholder: "Strength" })
            ),
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "agi" },
                    "Agility"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "agi", type: "number", name: "agi", placeholder: "Agility" })
            ),
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "int" },
                    "Intelligence"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "int", type: "number", name: "int", placeholder: "Intelligence" })
            ),
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "moveSpeed" },
                    "Movement Speed"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "moveSpeed", type: "number", name: "moveSpeed", placeholder: "Movement Speed" })
            ),
            React.createElement(
                "div",
                { className: "formInput" },
                React.createElement(
                    "label",
                    { htmlFor: "armor" },
                    "Armor"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "armor", type: "number", name: "armor", placeholder: "Armor" })
            )
        ),
        React.createElement(
            "div",
            { id: "spells" },
            React.createElement(
                "div",
                _defineProperty({ className: "formInput" }, "className", "spellInput"),
                React.createElement(
                    "label",
                    { htmlFor: "b1" },
                    "Basic Ability 1"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "b1Name", type: "text", name: "b1Name", placeholder: "Basic Ability 1 Name" }),
                "    ",
                React.createElement("br", null),
                React.createElement("textarea", { className: "abilityDesc", id: "b1Desc", name: "b1Desc", placeholder: "Basic Ability 1 Description" })
            ),
            React.createElement(
                "div",
                _defineProperty({ className: "formInput" }, "className", "spellInput"),
                React.createElement(
                    "label",
                    { htmlFor: "b2" },
                    "Basic Ability 2"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "b2Name", type: "text", name: "b2Name", placeholder: "Basic Ability 2 Name" }),
                "   ",
                React.createElement("br", null),
                React.createElement("textarea", { className: "abilityDesc", id: "b2Desc", type: "text", name: "b2Desc", placeholder: "Basic Ability 2 Description" })
            ),
            React.createElement(
                "div",
                _defineProperty({ className: "formInput" }, "className", "spellInput"),
                React.createElement(
                    "label",
                    { htmlFor: "b3" },
                    "Basic Ability 3"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "b3Name", type: "text", name: "b3Name", placeholder: "Basic Ability 3 Name" }),
                "   ",
                React.createElement("br", null),
                React.createElement("textarea", { className: "abilityDesc", id: "b3Desc", type: "text", name: "b3Desc", placeholder: "Basic Ability 3 Description" })
            ),
            React.createElement(
                "div",
                _defineProperty({ className: "formInput" }, "className", "spellInput"),
                React.createElement(
                    "label",
                    { htmlFor: "u" },
                    "Ultimate Ability"
                ),
                React.createElement("br", null),
                React.createElement("input", { id: "uName", type: "text", name: "uName", placeholder: "Ultimate Ability Name" }),
                "   ",
                React.createElement("br", null),
                React.createElement("textarea", { className: "abilityDesc", id: "uDesc", type: "text", name: "uDesc", placeholder: "Ultimate Ability Description" })
            )
        ),
        React.createElement("div", { id: "errorMessage" }),
        React.createElement("input", { type: "submit", value: "Create", id: "submitCharacter" }),
        React.createElement("div", { id: "character" })
    );
};

// Sets up the hero creation form
var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(DotaForm, { csrf: csrf }), document.querySelector("#createForm"));

    ReactDOM.render(React.createElement(DotaCharacterForm, { csrf: csrf }), document.querySelector("#dotaFormDiv"));
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
