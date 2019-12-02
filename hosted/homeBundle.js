'use strict';

var handleDelete = function handleDelete(e) {
    e.preventDefault();

    sendAjax('DELETE', '/deleteHero', { id: e.target.heroId.value }, function (data) {
        sendAjax('GET', '/getToken', null, function (result) {
            ReactDOM.render(React.createElement(DotaList, { heroes: data.heroes, csrf: result.csrfToken }), document.querySelector("#dotaCharacters"));
        });
    });
};

// Sets up the list of heroes and how they will be displayed
var DotaList = function DotaList(props) {
    if (props.heroes.length === 0) {
        return React.createElement(
            'div',
            { className: 'heroList' },
            React.createElement(
                'h3',
                { className: 'emptyHero' },
                'No Heroes yet'
            )
        );
    }

    var heroNodes = props.heroes.map(function (hero) {
        return React.createElement(
            'div',
            { className: 'card' },
            React.createElement(
                'form',
                { className: 'deleteForm',
                    id: 'deleteForm',
                    name: 'deleteForm',
                    onSubmit: handleDelete,
                    action: '/deleteHero',
                    method: 'DELETE' },
                React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
                React.createElement('input', { type: 'hidden', name: 'heroId', value: hero._id }),
                React.createElement('input', { type: 'image', src: '/assets/img/delete.png', name: 'upvote', className: 'delete', target: hero.primaryAttribute, title: 'Delete Character' })
            ),
            React.createElement(
                'div',
                { key: hero._id, className: 'dotaCard', target: hero.primaryAttribute },
                React.createElement(
                    'h2',
                    { className: 'name' },
                    ' ',
                    hero.name,
                    ' '
                ),
                React.createElement(
                    'div',
                    { className: 'stats' },
                    React.createElement(
                        'h3',
                        { className: 'primAtt' },
                        ' ',
                        hero.primaryAttribute,
                        ' '
                    ),
                    React.createElement(
                        'h3',
                        { className: 'stat' },
                        ' ',
                        React.createElement('img', { className: 'statIcon', src: '/assets/img/str.png', alt: 'str icon' }),
                        ' ',
                        hero.strength,
                        ' '
                    ),
                    React.createElement(
                        'h3',
                        { className: 'stat' },
                        ' ',
                        React.createElement('img', { className: 'statIcon', src: '/assets/img/agi.png', alt: 'agi icon' }),
                        ' ',
                        hero.agility,
                        ' '
                    ),
                    React.createElement(
                        'h3',
                        { className: 'stat' },
                        ' ',
                        React.createElement('img', { className: 'statIcon', src: '/assets/img/int.png', alt: 'int icon' }),
                        ' ',
                        hero.intelligence,
                        ' '
                    ),
                    React.createElement(
                        'h3',
                        { className: 'stat' },
                        ' ',
                        React.createElement('img', { className: 'statIcon', src: '/assets/img/boot.png', alt: 'boot icon' }),
                        ' ',
                        hero.moveSpeed,
                        ' '
                    ),
                    React.createElement(
                        'h3',
                        { className: 'stat' },
                        ' ',
                        React.createElement('img', { className: 'statIcon', src: '/assets/img/shield.png', alt: 'shield icon' }),
                        ' ',
                        hero.intelligence,
                        ' '
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'abilities' },
                    React.createElement(
                        'div',
                        { className: 'spell' },
                        React.createElement(
                            'h3',
                            { className: 'spellName' },
                            ' ',
                            hero.basicName1,
                            ' '
                        ),
                        React.createElement(
                            'h3',
                            { className: 'spellDesc' },
                            ' ',
                            hero.basicDesc1,
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'spell' },
                        React.createElement(
                            'h3',
                            { className: 'spellName' },
                            ' ',
                            hero.basicName2,
                            ' '
                        ),
                        React.createElement(
                            'h3',
                            { className: 'spellDesc' },
                            ' ',
                            hero.basicDesc2,
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'spell' },
                        React.createElement(
                            'h3',
                            { className: 'spellName' },
                            hero.basicName3,
                            ' '
                        ),
                        React.createElement(
                            'h3',
                            { className: 'spellDesc' },
                            ' ',
                            hero.basicDesc3,
                            ' '
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'spell' },
                        React.createElement(
                            'h3',
                            { className: 'spellName' },
                            ' ',
                            hero.ultimateName,
                            ' '
                        ),
                        React.createElement(
                            'h3',
                            { className: 'spellDesc' },
                            ' ',
                            hero.ultimateDesc,
                            ' '
                        )
                    )
                )
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'heroList' },
        heroNodes
    );
};

// Grabs all the heroes from the server that are tied to the currect account
var loadHeroesFromServer = function loadHeroesFromServer(csrf) {
    sendAjax('GET', '/getHeroes', null, function (data) {
        ReactDOM.render(React.createElement(DotaList, { heroes: data.heroes, csrf: csrf }), document.querySelector("#dotaCharacters"));
    });
};

var setup = function setup(csrf) {
    loadHeroesFromServer(csrf);
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
