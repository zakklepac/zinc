'use strict';

/* eslint-env browser */

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

    function renderComponent(element, content) {
        console.log(element, content); // eslint-disable-line no-console
    }

    function init() {
        renderComponent('user-item', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
