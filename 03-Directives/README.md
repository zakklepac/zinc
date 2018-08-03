# Directives and Custom Attributes

Now that we've got our basic components up and running, let's make them a bit more useful. We're going to do two major things: First, we're going make it so we can add an attribute to our component tags to set our data on a per-element basis. Instead of registering separate elements with their own data, we're finally going to be able to use the same component with different data! (You're probably already itching to do this, so you're on the right track.) Second, we're going to continue building a library of special attributes (called "directives") that we can use to make the component elements behave in different ways: hiding and showing the elements, looping over a list of data, and so on.

## 1) Setting a data attribute on an element

So right now, we're setting our data object on a component when we register it: 

```js
    Zinc.registerComponent({
        name: 'user-item',
        templateFile: 'user-item',
        data: userData,
        controller: userController
    });
```

and then using that bare component by iteself in our html or template:

```html
    <user-item></user-item>
```

Unfortunately, that only allows us to use one chunk of data for each component we register, which is less than useful. So! Let's add an attribute called `z-model` to our element to specify the data source, and use that instead.

```html
    <user-item z-model="userData"></user-item>
```

Now, you might be asking, where does that userData object come from? We're specifying the object in our HTML, which doesn't know about our javascript unless we tell it, so... how are we attaching javascript to our component? The controller! So, our task here is twofold: 

1. Change your renderComponent function to look for the `z-model` attribute on the element it's rendering, and use that to grab the name of the data source for the element.
2. Add the data for your user in an object for your controller somewhere (something like `controller.$state` or `controller.$scope` will work just fine) and use that when you render.
