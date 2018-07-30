# Creating and Rendering Components

Now that we know how to create templates and use them to insert rendered HTML into our page, let's move on to the next step, and use what we've learned to build some custom components.

## 1) Simple Component

Our components will be tags that we define ourselves, and attach a template and data object to. We're going to start by replacing our starter user with an HTML element that we're just going to call `<user-item>`. All we want to do is take this user data:

```js
    const userData = {
        picture: {
            thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
        },
        name: {
            first: 'Jack',
            last: 'Burton'
        },
        location: {
            city: 'San Francisco',
            state: 'CA'
        },
        email: 'jack.burton@example.com'
    };
```

then insert it into our `user.html` template, and insert it into the `user-item` tag on our page. (You'll want to use [Document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or something similar to grab the component element.)

## 2) Registering Components

We're about to take our first step into making Zinc a framework that we can use with external templates and data, instead of baking them in to our javascript. You'll see that there are two javascript files now: `zinc.js` and `user.js`. We'll keep working in `zinc.js` to build up our library, and you'll see that we've created a global object called `Zinc` at the top of it. This will allow us to expose the Zinc framework to the rest of our application, and use it in other files.

Here's what we want to do: use Zinc to register our component, telling it what the element name is that we're inserting our content into, what template to use, and where the data is coming from. Let's define a `Zinc.registerComponent` function that does that.

```js
    Zinc.registerComponent = function(elementName, templateFile, dataObject) {
        ...
    }
```