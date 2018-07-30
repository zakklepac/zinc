'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        const userList = document.getElementById('z-user-list');
        results.forEach((user) => {
            const fullName = `${user.name.first} ${user.name.last}`;
            const li = document.createElement('li');
            li.setAttribute('class', 'user');
            li.innerHTML = `
                <img class="user-photo" src="${user.picture.thumbnail}" alt="Photo of ${fullName}">
                <div class="user-name">${fullName}</div>
                <div class="user-location">${user.location.city}, ${user.location.state}</div>
                <div class="user-email">${user.email}</div>`;
            userList.appendChild(li);
        });
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();