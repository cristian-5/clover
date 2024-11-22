
# 🍀 clover

Utility for generating random values, made with ❤️ in Javascript.

### lorem

```javascript
import { lorem } from 'clover';

console.log(lorem({ paragraphs: 2 }));
console.log(lorem({ paragraphs: [ 1, 5 ] })); // random number of paragraphs
console.log(lorem({ paragraphs: [ 1, 5 ], sentences: 3 }));
console.log(lorem({ paragraphs: 2, words: 10 }));
console.log(lorem({ paragraphs: 2, html: true, tags: [
	'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' // random tags
] }));
```
