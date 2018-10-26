'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    const userData = {
        picture: {
            thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
        },
        name: {
            first: 'Jack',
            last: 'Burton'
        },
        location: {
            city: 'San Francisco',
            state: 'CA'
        },
        email: 'jack.burton@example.com'
    };
    
    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (thing, variable) =>
            variable.split('.').reduce((acc, currVal) => acc[currVal], data))
            );
    }

    function renderComponent(element, temp, content) {
        const ele = document.querySelector(element);
        renderTemplate(temp, content)
            .then(html => ele.insertAdjacentHTML('beforeend', html));
    }

    function init() {
        renderComponent('user-item', 'user', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
