'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    Zinc.registerComponent = ({
        name,
        templateFile,
        data,
        controller
    }) => {
        Zinc.components[name] = {
            name,
            templateFile,
            data,
            controller
        };
    };

    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (thing, variable) =>
                variable.split('.').reduce((acc, currVal) => acc[currVal], data)));
    }

    Zinc.renderComponent = (componentName, parentNode = document) => {
        const component = Zinc.components[componentName];
        const ele = parentNode.querySelectorAll(componentName);
        ele.forEach((ele) => { renderTemplate(component.templateFile, component.data)
            .then((html) => {
                const doc = domParser.parseFromString(html, 'text/html');
                const el = ele.insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                el.$state = {};
                if (component.controller) {
                    el.$controller = component.controller;
                    el.$controller();
                }
                Zinc.renderComponents(el);
            });
        });
    }

    Zinc.renderComponents = (rootNode = document) => {
        Object.values(Zinc.components).forEach((component) => {
            Zinc.renderComponent(component.name, rootNode);
        });
    };

    function init() {
        Zinc.renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);
})();