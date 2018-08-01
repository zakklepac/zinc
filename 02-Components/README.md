# Creating and Rendering Components

Now that we know how to create templates and use them to insert rendered HTML into our page, let's move on to the next step, and use what we've learned to build some custom components.

1) Simple Component

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

then render it into our `user.html` template, and insert the whole thing into the `user-item` tag on our page. (You'll want to use [Document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or something similar to grab the component element.)
