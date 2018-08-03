'use strict';

/* eslint-env browser */
/* eslint-disable no-unused-vars */

const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    // TBD: prefetch or cache templates?
    function renderTemplateFile(templateFile, data) {
        return fetch(`${templateFile}.html`)
            .then(res => res.text())
            .then(html => html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) =>
                variable.split('.').reduce((acc, curr) => acc[curr.toLowerCase()], data) || ''));
    }

    Zinc.renderComponent = (componentName, parentNode = document) => {
        const component = Zinc.components[componentName];
        const nodeList = parentNode.querySelectorAll(componentName);

        nodeList.forEach((node) => {
            const data = {};
            for (let i = 0; i < node.attributes.length; i++) {
                const keyMatches = node.attributes[i].name.match(/z\[([^]+)]/);
                if (keyMatches && keyMatches.length === 2) { // eslint-disable-line no-magic-numbers
                    data[keyMatches[1]] = node.attributes[i].value;
                }
            }

            renderTemplateFile(component.templateFile, data)
                .then((html) => {
                    const doc = domParser.parseFromString(html, 'text/html');
                    const el = node.insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                    el.$data = {};
                    if (component.controller) {
                        el.$controller = component.controller;
                        el.$controller();
                    }
                    Zinc.renderComponents(el);
                });
        });
    };

    Zinc.renderComponents = (rootNode = document) => {
        Object.values(Zinc.components).forEach((component) => {
            Zinc.renderComponent(component.name, rootNode);
        });
    };

    Zinc.registerComponent = (config) => {
        Zinc.components[config.name] = config;
    };

    document.addEventListener('DOMContentLoaded', () => Zinc.renderComponents());
})();
