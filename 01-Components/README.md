# Making Components

We're going to step through the process of implementing some simple templates or components for our framework. Components are small, reusable chunks of markup and functionality that you can define and use in your web application. Let's begin by working on a user component for a list of users.

## 1) Creating elements from dynamic data

We'll start off by doing things the way we're used to doing them in vanilla javascript: grab a bunch of data from somewhere, create some HTML elements, plop the data into the elements, and stick them in an existing element.

Using the provided index.html and zinc.js files, implement the `populateList` function so that it takes the provided user data and adds them to the list with id `z-user-list`. (If you need a refresher, check out [Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and [Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) on MDN.)

