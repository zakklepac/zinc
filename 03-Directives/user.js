'use strict';

/* eslint-env browser */
/* globals Zinc */

(() => {
    function userController() {
        this.addEventListener('click', () => {
            this.classList.toggle('hilight');
            this.$state.hilit = !this.$state.hilit;
        });
    }

    Zinc.registerComponent({
        name: 'user-list',
        templateFile: 'user-list'
    });
    Zinc.registerComponent({
        name: 'user-info',
        templateFile: 'user-item',
        controller: userController
    });

    Zinc.renderComponents();
})();
