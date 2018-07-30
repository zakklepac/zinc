'use strict';

/* eslint-env browser */

(() => {
    const userTemplate = `
    <li class="user">
        <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
        <div class="user-name">{{ firstName }} {{ lastName }}</div>
        <div class="user-location">{{ city }}, {{ state }}</div>
        <div class="user-email">{{ email }}</div>
    </li>
    `;

    function renderTemplate(template, data) {
        return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, variable) => {
            return data[variable] || '';
        });
    }

    function populateList(results) {
        const userList = document.getElementById('z-user-list');
        results.forEach((user) => {
            const data = {
                photo: user.picture.thumbnail,
                firstName: user.name.first,
                lastName: user.name.last,
                city: user.location.city,
                state: user.location.state,
                email: user.location.email
            };

            const html = renderTemplate(userTemplate, data);
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
