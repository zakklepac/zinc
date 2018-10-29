'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    Zinc.registerComponent = (componentName, temp, data) => {
        Zinc.components[componentName] = {
            componentName,
            temp,
            data
        };
    };

    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (thing, variable) =>
                variable.split('.').reduce((acc, currVal) => acc[currVal], data) || ''));
    }

    function renderComponent(element, temp, content) {
        const ele = document.querySelectorAll(element);
        ele.forEach((ele) => { renderTemplate(temp, content)
                .then(html => ele.insertAdjacentHTML('beforeend', html));
        })
    }

    function renderComponents() {
        Object.values(Zinc.components).forEach((component) => {
            renderComponent(component.componentName, component.temp, component.data);
        });
    }

    function init() {
        renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);
})();