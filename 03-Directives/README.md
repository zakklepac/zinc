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

Unfortunately, that only allows us to use one chunk of data for each component we register, which is less than useful. So! Let's start by taking the data property of our `registerComponent` function, then adding pieces of data as attributes to our element, and start the rendering from there. We'll start simple, so let's just add the users's name, location, email, and a `src` for the thumbnail in the `user-item` element. To set them apart from regular attributes, let's wrap them in a cozy `z[propertyName]="property value"]` set of square brackets.

```html
    <user-info z[userName]="Jack Burton"] 
               z[userEmail]="jack@gmail.com"
               z[userLocation]="San Francisco, CA"
               z[thumbSrc]="https://f4.bcbits.com/img/0001142378_10.jpg">
    </user-info>
```

Where can we store that data once we render the component? Maybe in the controller? Sounds reasonable. So, our task here is twofold: 

1. Change your renderComponent function to look for `z[var]` attributes on the element it's rendering, and use those to grab the data for the element.
2. Add the data for your user in an object for your controller somewhere (something like `controller.$data` or `controller.$state` or `controller.$scope` will work just fine) and use that when you render.

We'll also have to change our template back to just using `userName` and `userEmail` and whatnot for the momment, until we build a more robust way to handle the data coming in...

## 2) Showing and hiding elements based on data

Let's see if we can use this data for something interesting. (This may seem a little simple redundant at first, but hang on, it get *nuts* later on.) Let's add a `z[canadian]="false"` to all the user info components except for the one for Wade Wilson. Now we know where everyone's from, and we only want to show folks that aren't from Canada, so let's write ourselves another custom attribute—or "directive"—to take care of that.

We want to hide any component that contains a Canadian, so we'll write an attribute directive called `z-hide` to do that for us, like this:

```html
    <user-info z[userName]="Geddy Lee"
               z[canadian]="true"
               z-hide="canadian">
```

Now we just have to modify our 