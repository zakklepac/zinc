
## Lesson Structure

### Week 1

* Talk about common elements of frameworks
* Talk about components
* Implement simple element creation and appending with data
* Implement simple element creation with templates

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
