'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, userData) {
        console.log(element, content); // eslint-disable-line no-console
    }

    function init() {
        renderComponent('user-item', 'user', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
