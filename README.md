# postcss-remove-global [![Build Status][ci-img]][ci]

[PostCSS] plugin to remove :global identifier from your stylesheet files.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/princetoad/postcss-remove-global.svg
[ci]:      https://travis-ci.org/princetoad/postcss-remove-global

## Support three cases

1. Remove :global as a single selector
```css
:global {
    a { }
}
```

```css
a { }
```

2. Remove :global as part of a selector
```css
.root :global .text { margin: 0 6px; }
```

```css
.root .text { margin: 0 6px; }
```

3. Remove :global(selector) as part of a selector
```css
.root :global(#foo1337 .bar:hover) .text { margin: 0 6px; }
```

```css
.root #foo1337 .bar:hover .text { margin: 0 6px; }
```

4. Remove :global as part of params of @keyframe
```css
@keyframes :global(zoomIn) { }
```

```css
@keyframes zoomIn { }
```

## Usage

### Use with PostCSS API
```js
const postcss = require('postcss')
const removeGlobal = require('postcss-remove-global')

const css = postcss()
  .use(removeGlobal())
  .process(':global { a {color: gray(85); background-color: gray(10%, .25)}}')
  .css
console.log('css = ', css)
//= 'a {color: gray(85); background-color: gray(10%, .25)}'

const css2 = postcss([removeGlobal])
  .process('.root :global .text { margin: 0 6px; }')
  .css
console.log('css2 = ', css2)
//= '.root .text { margin: 0 6px; }'

const css3 = postcss([removeGlobal])
  .process('@keyframes :global(zoomIn) { }')
  .css
console.log('css3 = ', css3)
//= '@keyframes zoomIn { }'
```
Reference：https://github.com/princetoad/try-postcss/blob/master/src/Plugin/plugin-remove-global.js

### Use gulp task runner
```js
gulp.task('global', () => {
  return gulp.src('assets/*.css')
    .pipe(postcss([removeGlobal]))
    .pipe(gulp.dest('build/'))
})
```
Reference：https://github.com/princetoad/try-postcss/blob/master/gulpfile.js
