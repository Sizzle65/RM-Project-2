"use strict";

var handleCharacter = function handleCharacter(e) {
    e.preventDefault();

    if ($("#heroName").val() == '' || $("#primAtt").val() == '' || $("#str").val() == '' || $("#agi").val() == '' || $("#int").val() == '' || $("#moveSpeed").val() == '' || $("#armor").val() == '' || $("#b1Name").val() == '' || $("#b2Name").val() == '' || $("#b3Name").val() == '' || $("#uName").val() == '' || $("#b1Desc").val() == '' || $("#b2Desc").val() == '' || $("#b3Desc").val() == '' || $("#uDesc").val() == '') {
        handleError("All fields are required");
        return false;
    }
    $("#errorMessage").text('');

    sendAjax('POST', $("#dotaForm").attr("action"), $("#dotaForm").serialize(), function () {
        $("#character").text('Character created successfully!');
    });
};

var setForm = function setForm(e) {
    e.preventDefault();

    switch ($("#game").val()) {
        case 'Dota 2':
            ReactDOM.render(React.createElement(DotaCharacterForm, null), document.querySelector("#dotaFormDiv"));
            break;
        case 'League of Legends':
            break;
        case 'Smite':
            break;
    }
};

var GameForm = function GameForm(props) {
    return React.createElement(
        "form",
        { id: "selectGame",
            name: "selectGame",
            onSubmit: setForm },
        React.createElement(
            "select",
            { name: "options", id: "game" },
            React.createElement(
                "option",
                null,
                "Dota 2"
            ),
            React.createElement(
                "option",
                null,
                "League of Legends"
            ),
            React.createElement(
                "option",
                null,
                "Smite"
            )
        ),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { type: "submit", value: "Select Game", id: "submitGame" })
    );
};

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

var DotaCharacterForm = function DotaCharacterForm(props) {
    return React.createElement(
        "div",
        null,
        React.createElement("img", { id: "dotaLogo", src: "/assets/img/dota.png", alt: "dota logo" }),
        React.createElement(
            "div",
            { id: "base" },
            React.createElement(
                "label",
                { htmlFor: "name" },
                "Name: "
            ),
            React.createElement("input", { id: "heroName", type: "text", name: "name", placeholder: "Hero Name" }),
            React.createElement(
                "label",
                { htmlFor: "att" },
                "Primary Attribute: "
            ),
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
        ),
        React.createElement(
            "div",
            { id: "stats" },
            React.createElement(
                "label",
                { htmlFor: "str" },
                "Strength: "
            ),
            React.createElement("input", { id: "str", type: "number", name: "str", placeholder: "Strength" }),
            React.createElement(
                "label",
                { htmlFor: "agi" },
                "Agility: "
            ),
            React.createElement("input", { id: "agi", type: "number", name: "agi", placeholder: "Agility" }),
            React.createElement(
                "label",
                { htmlFor: "int" },
                "Intelligence: "
            ),
            React.createElement("input", { id: "int", type: "number", name: "int", placeholder: "Intelligence" }),
            React.createElement(
                "label",
                { htmlFor: "moveSpeed" },
                "Movement Speed: "
            ),
            React.createElement("input", { id: "moveSpeed", type: "number", name: "moveSpeed", placeholder: "Movement Speed" }),
            React.createElement(
                "label",
                { htmlFor: "armor" },
                "Armor: "
            ),
            React.createElement("input", { id: "armor", type: "number", name: "armor", placeholder: "Armor" })
        ),
        React.createElement(
            "div",
            { id: "spells" },
            React.createElement(
                "label",
                { htmlFor: "b1" },
                "Basic Ability 1: "
            ),
            React.createElement("input", { id: "b1Name", type: "text", name: "b1Name", placeholder: "Basic Ability 1 Name" }),
            React.createElement("input", { className: "abilityDesc", id: "b1Desc", type: "text", name: "b1Desc", placeholder: "Basic Ability 1 Description" }),
            React.createElement(
                "label",
                { htmlFor: "b2" },
                "Basic Ability 2: "
            ),
            React.createElement("input", { id: "b2Name", type: "text", name: "b2Name", placeholder: "Basic Ability 2 Name" }),
            React.createElement("input", { className: "abilityDesc", id: "b2Desc", type: "text", name: "b2Desc", placeholder: "Basic Ability 2 Description" }),
            React.createElement(
                "label",
                { htmlFor: "b3" },
                "Basic Ability 3: "
            ),
            React.createElement("input", { id: "b3Name", type: "text", name: "b3Name", placeholder: "Basic Ability 3 Name" }),
            React.createElement("input", { className: "abilityDesc", id: "b3Desc", type: "text", name: "b3Desc", placeholder: "Basic Ability 3 Description" }),
            React.createElement(
                "label",
                { htmlFor: "u" },
                "Ultimate Ability: "
            ),
            React.createElement("input", { id: "uName", type: "text", name: "uName", placeholder: "Ultimate Ability Name" }),
            React.createElement("input", { className: "abilityDesc", id: "uDesc", type: "text", name: "uDesc", placeholder: "Ultimate Ability Description" })
        ),
        React.createElement("input", { type: "submit", value: "Create", id: "submitCharacter" })
    );
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#gameChoice"));

    ReactDOM.render(React.createElement(DotaForm, { csrf: csrf }), document.querySelector("#createForm"));
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

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
    window.location = response.redirect;
};

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
