# Data Binding

Here's where it gets good. Components are cool, but the real killer feature for most front-end frameworks is data binding. This is where you use a variable in your model or controller in a component template, and when you update the data, the view (web page) changes automatically, too! MAGIC. Only it's not magic, becuse we're going to build it ourselves. Or maybe it is magic, and you're all wizards. We'll see.

## 1) Binding a data object from the controller

First, let's get ourselves a user data object:

```js
    const userData = {
        user1: {
            name: 'Jack Burton',
            email: 'jack@gmail.com',
            location: 'San Francisco, CA',
            photo: 'https://f4.bcbits.com/img/0001142378_10.jpg',
            canadian: false
        },
        user2: {
            name: 'Heddy Lamarr',
            email: 'hlamarr@gmail.com',
            location: 'Casselberry, FL',
            photo: 'https://media.newyorker.com/photos/5a1f13f2f2287d71effeaea4/master/w_727,c_limit/Camhi-Hedy-Lamarr-doc.jpg',
            canadian: false
        },
        user3: {
            name: 'Wade Wilson',
            email: 'dp@gmail.com',
            location: 'Vancouver, BC',
            photo: 'http://cdn.movieweb.com/img.news.tops/NEgG0Vl8amGlji_1_b.jpg',
            canadian: true
        },
        user4: {
            name: 'Marion Ravenwood',
            email: 'marion@gmail.com',
            location: 'Kathmandu, Nepal',
            photo: 'https://imgix.bustle.com/rehost/2016/9/14/300fb745-57cc-47f5-9c66-0d5acd902d91.jpg',
            canadian: false
        },
    };
```

Now, let's add a model property to the component when we register it:

```js
    Zinc.registerComponent({
        name: 'user-list',
        templateFile: 'user-list',
        model: userData
    });
```

And now just hook it up and make it go! Easy as that. Suuuuuper easy. (It's not easy. But you'll get it.)

## 2) Binding the data object to the controller as a model

If you're like me, you probably came up with something gross like this in your `user-list` template: 

```html
<ul class="user-list" id="z-user-list">
    <user-info z[name]="{{user1.name}}" z[email]="{{user1.email}}" z[location]="{{user1.location}}" z[photo]="{{user1.photo}}"></user-info>
    <user-info z[name]="{{user2.name}}" z[email]="{{user2.email}}" z[location]="{{user2.location}}" z[photo]="{{user2.photo}}"></user-info>
    <user-info z[name]="{{user3.name}}" z[email]="{{user3.email}}" z[location]="{{user3.location}}" z[photo]="{{user3.photo}}"></user-info>
    <user-info z[name]="{{user4.name}}" z[email]="{{user4.email}}" z[location]="{{user4.location}}" z[photo]="{{user4.photo}}"></user-info>
</ul>
```

EW. It would be much better to just bind the object that we want, and let the `user-item` template figure it out:

```html
<ul class="user-list" id="z-user-list">
    <user-info z-model="user1"></user-info>
    <user-info z-model="user2"></user-info>
    <user-info z-model="user3"></user-info>
    <user-info z-model="user4"></user-info>
</ul>
```

## 3) One-way data binding

Now, just make the page update when you change the data in the model object. Easy, right? 

(More on this soon, but check out javascript Proxy objects for now.)