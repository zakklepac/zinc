'use strict';

/* eslint-env browser */

(() => {
    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (thing, variable) =>
            variable.split('.').reduce((acc, currVal) => acc[currVal], data) || ''));
    }

    function populateList(results) {
        const userList = document.getElementById('z-user-list');
        results.forEach((user) => {
            renderTemplate('user', user).then(html =>
            userList.insertAdjacentHTML('beforeend', html));
        });
    }

    function init() {
        fetch('https://randomuser.me/api/?results=3')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();