'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        console.log(results); // eslint-disable-line no-console
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
