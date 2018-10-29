'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    Zinc.registerComponent = (componentName, temp, data, controller) => {
        Zinc.components[componentName] = {
            componentName,
            temp,
            data,
            controller
        };
        renderComponent(componentName);
    };

    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (thing, variable) =>
                variable.split('.').reduce((acc, currVal) => acc[currVal], data)));
    }

    function renderComponent(componentName) {
        const component = Zinc.components[componentName];
        const ele = document.querySelectorAll(componentName);
        ele.forEach((ele) => { renderTemplate(component.temp, component.data)
            .then((html) => {
                const doc = domParser.parseFromString(html, 'text/html');
                const el = ele.insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                el.$state = {};
                
                if (component.controller) {
                    el.$controller = component.controller;
                    el.$controller();
                };
                Zinc.components[componentName].element = el;
            });
        });
    }

    function renderComponents() {
        Object.values(Zinc.components).forEach((component) => {
            renderComponent(component.componentName);
        });
    }

    function init() {
        renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);
})();