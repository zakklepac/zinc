'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    function renderTemplate(template, data) {
        return fetch(`${template}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) =>
                variable.split('.').reduce((acc, curr) => acc[curr], data) || ''));
    }

    function renderComponent(element, templateFile, content) {
        const nodeList = document.querySelectorAll(element);
        for (let i = 0; i < nodeList.length; i++) {
            renderTemplate(templateFile, content)
                .then(html => nodeList[i].insertAdjacentHTML('beforeend', html));
        }
    }

    Zinc.registerComponent = (componentName, templateFile, data) => {
        Zinc.components[componentName] = {
            componentName,
            templateFile,
            data
        };
        renderComponent(componentName, templateFile, data);
    };

    function renderComponents() {
        Object.values(Zinc.components).forEach((component) => {
            renderComponent(component.componentName, component.templateFile, component.data);
        });
    }

    function init() {
        renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
