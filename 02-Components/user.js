'use strict';

/* eslint-env browser */
/* globals Zinc */

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
    
    const userData2 = {
        picture: {
            thumbnail: 'https://media.newyorker.com/photos/597611914867016af4a67cb2/master/w_727,c_limit/Aguirre-Octavia-Butler_01.jpg'
        },
        name: {
            first: 'Octavia',
            last: 'Butler'
        },
        location: {
            city: 'Lake Forest Park',
            state: 'WA'
        },
        email: 'octavia.butler@example.com'
    };

    Zinc.registerComponent('user-item', 'user', userData);
    Zinc.registerComponent('user-two', 'user', userData2);
})();

