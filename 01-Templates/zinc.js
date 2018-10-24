'use strict';

/* eslint-env browser */

(() => {
    const userTemplate = `
<li class="user">
    <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
    <div class="user-name">{{ name.first }} {{ name.last }}</div>
    <div class="user-location">{{ location.city }}, {{ location.state }}</div>
    <div class="user-email">{{ email }}</div>
</li>
    `;

    function renderTemplate(template, data) {
        return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (thing, variable) => 
        variable.split('.').reduce((acc, currVal) => acc[currVal], data));
    }

    function populateList(results) {
        const userList = document.getElementById('z-user-list');
        results.forEach(user => {
            let renderedTemplate = renderTemplate(userTemplate, user);
            userList.insertAdjacentHTML("beforeend", renderedTemplate);
        });
    }

    function init() {
        fetch('https://randomuser.me/api/?results=3')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();