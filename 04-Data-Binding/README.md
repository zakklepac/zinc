# Data Binding

Let's add an attribute called `z-model` to our element to specify the data source, and use that instead.

```html
    <user-item z-model="userData"></user-item>
```

Now, you might be asking, where does that userData object come from? We're specifying the object in our HTML, which doesn't know about our javascript unless we tell it, so... how are we attaching javascript to our component? The controller! So, our task here is twofold: 

1. Change your renderComponent function to look for the `z-model` attribute on the element it's rendering, and use that to grab the name of the data source for the element.
2. Add the data for your user in an object for your controller somewhere (something like `controller.$state` or `controller.$scope` will work just fine) and use that when you render.