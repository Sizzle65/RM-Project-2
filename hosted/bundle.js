'use strict';

var setForm = function setForm() {
    console.dir('test');
    switch ($("#game").val()) {
        case 'Dota 2':
            ReactDOM.render(React.createElement(DotaCharacterForm, { csrf: csrf }), document.querySelector("#createForm"));
            break;
        case 'League of Legends':
            break;
        case 'Smite':
            break;
    }
};

var GameForm = function GameForm() {
    return React.createElement(
        'form',
        { id: 'selectGame',
            name: 'selectGame',
            onSubmit: setForm },
        React.createElement(
            'select',
            { name: 'options', id: 'game' },
            React.createElement(
                'option',
                null,
                'Dota 2'
            ),
            React.createElement(
                'option',
                null,
                'League of Legends'
            ),
            React.createElement(
                'option',
                null,
                'Smite'
            )
        ),
        React.createElement('input', { type: 'submit', value: 'Select Game', id: 'submitGame' })
    );
};

var DotaCharacterForm = function DotaCharacterForm() {
    return React.createElement(
        'form',
        { id: 'dotaForm',
            name: 'dotaForm',
            onSubmit: setForm,
            action: '/createCharacter',
            method: 'POST',
            className: 'dotaForm' },
        React.createElement(
            'div',
            { id: 'base' },
            React.createElement(
                'label',
                { htmlFor: 'name' },
                'Name: '
            ),
            React.createElement('input', { id: 'heroName', type: 'text', name: 'name', placeholder: 'Hero Name' }),
            React.createElement(
                'label',
                { htmlFor: 'att' },
                'Primary Attribute: '
            ),
            React.createElement('input', { id: 'primAtt', type: 'text', name: 'att', placeholder: 'Primary Attribute' })
        ),
        React.createElement(
            'div',
            { id: 'stats' },
            React.createElement(
                'label',
                { htmlFor: 'str' },
                'Strength: '
            ),
            React.createElement('input', { id: 'str', type: 'text', name: 'str', placeholder: 'Strength' }),
            React.createElement(
                'label',
                { htmlFor: 'agi' },
                'Agility: '
            ),
            React.createElement('input', { id: 'agi', type: 'text', name: 'agi', placeholder: 'Agility' }),
            React.createElement(
                'label',
                { htmlFor: 'int' },
                'Intelligence: '
            ),
            React.createElement('input', { id: 'int', type: 'text', name: 'int', placeholder: 'Intelligence' }),
            React.createElement(
                'label',
                { htmlFor: 'moveSpeed' },
                'Movement Speed: '
            ),
            React.createElement('input', { id: 'moveSpeed', type: 'text', name: 'moveSpeed', placeholder: 'Movement Speed' }),
            React.createElement(
                'label',
                { htmlFor: 'armor' },
                'Armor: '
            ),
            React.createElement('input', { id: 'armor', type: 'text', name: 'armor', placeholder: 'Armor' })
        ),
        React.createElement(
            'div',
            { id: 'spells' },
            React.createElement(
                'label',
                { htmlFor: 'b1' },
                'Basic Ability 1: '
            ),
            React.createElement('input', { id: 'b1', type: 'text', name: 'b1', placeholder: 'Basic Ability 1' }),
            React.createElement(
                'label',
                { htmlFor: 'b2' },
                'Basic Ability 2: '
            ),
            React.createElement('input', { id: 'b2', type: 'text', name: 'b2', placeholder: 'Basic Ability 2' }),
            React.createElement(
                'label',
                { htmlFor: 'b3' },
                'Basic Ability 3: '
            ),
            React.createElement('input', { id: 'b3', type: 'text', name: 'b3', placeholder: 'Basic Ability 3' }),
            React.createElement(
                'label',
                { htmlFor: 'b4' },
                'Ultimate: '
            ),
            React.createElement('input', { id: 'b4', type: 'text', name: 'b4', placeholder: 'Basic Ability 4' })
        ),
        React.createElement('input', { type: 'submit', value: 'Create', id: 'submitCharacter' })
    );
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#gameChoice"));
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

var setForm = function setForm(e) {
    e.preventDefault();

    switch ($("#game").val()) {
        case 'Dota 2':
            ReactDOM.render(React.createElement(DotaCharacterForm, null), document.querySelector("#createForm"));
            break;
        case 'League of Legends':
            break;
        case 'Smite':
            break;
    }
};

var GameForm = function GameForm() {
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
        React.createElement("input", { type: "submit", value: "Select Game", id: "submitGame" })
    );
};

var DotaCharacterForm = function DotaCharacterForm() {
    return React.createElement(
        "form",
        { id: "dotaForm",
            name: "dotaForm",
            onSubmit: setForm,
            action: "/createCharacter",
            method: "POST",
            className: "dotaForm" },
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
            React.createElement("input", { id: "primAtt", type: "text", name: "att", placeholder: "Primary Attribute" })
        ),
        React.createElement(
            "div",
            { id: "stats" },
            React.createElement(
                "label",
                { htmlFor: "str" },
                "Strength: "
            ),
            React.createElement("input", { id: "str", type: "text", name: "str", placeholder: "Strength" }),
            React.createElement(
                "label",
                { htmlFor: "agi" },
                "Agility: "
            ),
            React.createElement("input", { id: "agi", type: "text", name: "agi", placeholder: "Agility" }),
            React.createElement(
                "label",
                { htmlFor: "int" },
                "Intelligence: "
            ),
            React.createElement("input", { id: "int", type: "text", name: "int", placeholder: "Intelligence" }),
            React.createElement(
                "label",
                { htmlFor: "moveSpeed" },
                "Movement Speed: "
            ),
            React.createElement("input", { id: "moveSpeed", type: "text", name: "moveSpeed", placeholder: "Movement Speed" }),
            React.createElement(
                "label",
                { htmlFor: "armor" },
                "Armor: "
            ),
            React.createElement("input", { id: "armor", type: "text", name: "armor", placeholder: "Armor" })
        ),
        React.createElement(
            "div",
            { id: "spells" },
            React.createElement(
                "label",
                { htmlFor: "b1" },
                "Basic Ability 1: "
            ),
            React.createElement("input", { id: "b1", type: "text", name: "b1", placeholder: "Basic Ability 1" }),
            React.createElement(
                "label",
                { htmlFor: "b2" },
                "Basic Ability 2: "
            ),
            React.createElement("input", { id: "b2", type: "text", name: "b2", placeholder: "Basic Ability 2" }),
            React.createElement(
                "label",
                { htmlFor: "b3" },
                "Basic Ability 3: "
            ),
            React.createElement("input", { id: "b3", type: "text", name: "b3", placeholder: "Basic Ability 3" }),
            React.createElement(
                "label",
                { htmlFor: "b4" },
                "Ultimate: "
            ),
            React.createElement("input", { id: "b4", type: "text", name: "b4", placeholder: "Basic Ability 4" })
        ),
        React.createElement("input", { type: "submit", value: "Create", id: "submitCharacter" })
    );
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#gameChoice"));
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
    //$("#errorMessage").text(message);
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
