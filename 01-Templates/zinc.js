'use strict';

/* eslint-env browser */

(() => {
    const userTemplate = `
    <li class="user">
        <img class="user-photo" src="{{picture.thumbnail}}" alt="Photo of {{name.first}} {{name.last}}">
        <div class="user-name">{{name.first}} {{name.last}}</div>
        <div class="user-location">{{location.city}}, {{location.state}}</div>
        <div class="user-email">{{email}}</div>
    </li>
    `;

    function renderTemplate(template, data) {
        return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) =>
            variable.split('.').reduce((acc, curr) => acc[curr], data) || ''
        );
    }

    function populateList(results) {
        const userList = document.getElementById('z-user-list');
        results.forEach((user) => {
            const html = renderTemplate(userTemplate, user);
            userList.insertAdjacentHTML('beforeend', html);
        });
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
