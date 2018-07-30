
## Lesson Structure

### Week 1

* Talk about common elements of frameworks
* Talk about components
* 

## Components in vanilla js

Set up the list of users

```
<ul class="user-list" id="z-user-list">  
  <li class="user">
    <img src="https://f4.bcbits.com/img/0001142378_10.jpg" alt="Photo of Jack Burton" class="user-photo">
    <div class="user-name">Jack Burton</div>
    <div class="user-location">San Francisco, CA</div>
  </li>
</ul>  
```

Get some random user data

```
fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(json => console.log(json));
```

On data get, create new HTML element, populate with data, and append to #g-user-list.

```
function addUsers(users) {
    const userList = document.getElementById('z-user-list');
    users.forEach(user => {
        const fullName = `${user.name.first} ${user.name.last}`;
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${user.picture.thumbnail}" alt="Photo of ${fullName}">
            <div class="user-name">${fullName}</div>
            <div class="user-location">${user.location.city}, ${user.location.state}</div>`;
        userList.appendChild(li);
    });
}

fetch(...)
    .then(json => addUsers(json.results));

```

But you've probably already done that, or something similar.

## Rendering templates

```
const myEmployee = {  
  id: 'asdfsafdasdfasdfa',
  name: {
    first: 'Bob',
    last: 'Builder'
  },
  role: 'Lead Engineer',
  photos: {
    primary: {
      url: 'foobar.com/img.jpg',
      description: 'A photo of Bob the Builder'
    }
  }
}
```

```
<li data-id="{{id}}">  
  <img src="{{photos.primary.url}}" alt="{{photos.primary.description}}">
  <p>
    <strong>{{name.first}} {{name.last}}</strong>
    <small>{{role}}</small>
  </p>
</li>
```

```
function render (template, data) {  
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, variable) => {
    return variable.split('.').reduce((acc, curr) => {
      return acc[curr];
    }, data) || '';
  });
}
```

(Test with Jasmine: https://codepen.io/jacopotarantino/pen/NbZqym)

## One-way binding

```
let data_blob = {  
  movie: 'Iron Man',
  quote: 'They say that the best weapon is the one you never have to fire.'
}
```

```
const quote_data = new Proxy(data_blob, {  
  set: (target, property, value) => {
    target[property] = value;
    console.log('updated!');
  }  
});
```

```
<p class="js-bound-quote">My favorite {{ movie }} quote is "{{ quote }}".</p>  

```

```
const quote_node = document.querySelector('.js-bound-quote')

quote_node.template = quote_node.innerHTML;
quote_node.render = function render (data) {  
  this.innerHTML = this.template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
    return data[variable] || '';
  });
}
```

```
const quote_data = new Proxy(data_blob, {  
  set: (target, property, value) => {
    target[property] = value;
    quote_node.render(data_blob);
  }  
});
```

```
const quotes = [  
  "What is the point of owning a race car if you can't drive it?",
  "Give me a scotch, I'm starving.",
  "I'm a huge fan of the way you lose control and turn into an enourmous green rage monster.",
  "I already told you, I don't want to join your super secret boy band.",
  "You know, it's times like these when I realize what a superhero I am."
];

window.setInterval(() => {  
  const quote_number = Math.floor(Math.random() * quotes.length);
  quote_data.quote = quotes[quote_number];
}, 2000);
```

```
class BoundNode {  
  constructor (node) {
    this.template = node.innerHTML
    this.node = node
  }

  update (data) {
    let temp_template = this.template.slice(0)
    this.node.innerHTML = temp_template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
    return data[variable] || ''
    })
  }
}
```

```
class BoundModel {  
  constructor (handlers) {
    const callbacks = []
    const data = {
      add_callback: function add_callback (fn) {
        callbacks.push(fn)
      }
    }

    const proxy = new Proxy(data, {
      set: function (target, property, value) {
        target[property] = value
        callbacks.forEach((callback) => callback())
        return true
      }
    })

    return proxy 
  }
}
```

(Test with Jasmine: https://codepen.io/jacopotarantino/pen/mEdYQV)
