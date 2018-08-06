'use strict';

/* eslint-env browser */
/* globals Zinc */

(() => {
    const userData = {
        user1: {
            name: 'Jack Burton',
            email: 'jack@gmail.com',
            location: 'San Francisco, CA',
            photo: 'https://f4.bcbits.com/img/0001142378_10.jpg',
            canadian: false
        },
        user2: {
            name: 'Heddy Lamarr',
            email: 'hlamarr@gmail.com',
            location: 'Casselberry, FL',
            photo: 'https://media.newyorker.com/photos/5a1f13f2f2287d71effeaea4/master/w_727,c_limit/Camhi-Hedy-Lamarr-doc.jpg',
            canadian: false
        },
        user3: {
            name: 'Wade Wilson',
            email: 'dp@gmail.com',
            location: 'Vancouver, BC',
            photo: 'http://cdn.movieweb.com/img.news.tops/NEgG0Vl8amGlji_1_b.jpg',
            canadian: true
        },
        user4: {
            name: 'Marion Ravenwood',
            email: 'marion@gmail.com',
            location: 'Kathmandu, Nepal',
            photo: 'https://imgix.bustle.com/rehost/2016/9/14/300fb745-57cc-47f5-9c66-0d5acd902d91.jpg',
            canadian: false
        },
    };

    function userController() {
        this.addEventListener('click', () => {
            this.classList.toggle('hilight');
            this.$state.hilit = !this.$state.hilit;
        });
    }

    Zinc.registerComponent({
        name: 'user-list',
        templateFile: 'user-list',
        model: userData
    });
    Zinc.registerComponent({
        name: 'user-info',
        templateFile: 'user-item',
        controller: userController
    });
})();
