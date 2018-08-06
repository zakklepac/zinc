'use strict';

/* eslint-env browser */
/* eslint-disable no-magic-numbers */

const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    const zDirectives = {
        hide: (el, arg) => {
            el.style.display = (el.$state[arg] === 'true' ? 'none' : '');
        },
        show: (el, arg) => {
            el.style.display = (el.$state[arg] === 'true' ? '' : 'none');
        },
    };

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
            const data = component.model || Object.assign({}, parentNode.$state) || {};
            const directiveData = {};
            console.log(data);
            

            for (let i = 0; i < node.attributes.length; i++) {
                /* Process data attributes */
                const keyMatches = node.attributes[i].name.match(/z\[([^]+)]/);
                if (keyMatches && keyMatches.length === 2) {
                    data[keyMatches[1]] = node.attributes[i].value;
                }

                /* Process z-directives and store argument */
                const dirMatches = node.attributes[i].name.match(/z-(\w+)/);
                if (dirMatches && dirMatches.length === 2 && zDirectives[dirMatches[1]]) {
                    directiveData[dirMatches[1]] = node.attributes[i].value;
                }
            }

            renderTemplateFile(component.templateFile, data)
                .then((html) => {
                    const doc = domParser.parseFromString(html, 'text/html');
                    const el = node.insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                    el.$state = data;
                    if (component.controller) {
                        el.$controller = component.controller;
                        el.$controller();
                    }

                    /* Execute z-directives */
                    Object.keys(directiveData).forEach((key) => {
                        zDirectives[key](el, directiveData[key]);
                    });

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
