'use strict';

// Grabs all the heroes for the selected account from the server 
var handleCharacters = function handleCharacters(e) {
    e.preventDefault();
    sendAjax('GET', '/getAccount', { id: e.target.id.value }, function (data) {
        $("#selectedAccount").text(data.account.username + "'s Heroes");

        // Adds the queried heroes to the screen
        ReactDOM.render(React.createElement(DotaList, { heroes: data.heroes }), document.querySelector("#dotaCharacters"));
    });
};

// Sets up the format for the displaying of heroes
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
            { key: hero._id, className: 'heroCard', target: hero.primaryAttribute },
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
        );
    });

    return React.createElement(
        'div',
        { className: 'heroList' },
        heroNodes
    );
};

// Sets up the format for the displaying of accounts
var AccountList = function AccountList(props) {
    if (props.accounts.length === 0) {
        return React.createElement(
            'div',
            { className: 'accountList' },
            React.createElement(
                'h3',
                { className: 'emptyAccounts' },
                'No Accounts yet'
            )
        );
    }

    var accountNodes = props.accounts.map(function (account) {
        var action = '/getAccount?' + account._id;
        return React.createElement(
            'div',
            { key: account._id, className: 'accountCard' },
            React.createElement(
                'form',
                { id: 'accountForm',
                    name: 'accountForm',
                    onSubmit: handleCharacters,
                    action: action,
                    method: 'GET',
                    className: 'accountForm' },
                React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
                React.createElement('input', { type: 'hidden', name: 'id', value: account._id }),
                React.createElement('input', { type: 'submit', value: account.username, id: 'submitAccount' })
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'accountList' },
        accountNodes
    );
};

// Grabs all accounts from the server, except the one currently logged on
var loadAccountsFromServer = function loadAccountsFromServer(csrf) {
    sendAjax('GET', '/getAccounts', null, function (data) {
        ReactDOM.render(React.createElement(AccountList, { accounts: data.accounts, csrf: csrf }), document.querySelector("#accounts"));
    });
};

var setup = function setup(csrf) {
    loadAccountsFromServer(csrf);
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
