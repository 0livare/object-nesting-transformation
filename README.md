# Object Nesting Transformation

Transform JS objects back and forth between nested and flat formats:

```js
{
  foo: {
    bar: {
      baz: 'foobarbaz',
    },
    bam: 4,
  },
  bop: false,
}
```

and

```js
{
  'foo.bar.baz': 'foobarbaz',
  'foo.bam': 4,
  'bop': false,
}
```

Flat objects use dot notation to represent the nesting.

## API

### `flattenObject(nestedObject)`

Turn an object with nested objects into a non-nested object whose keys use dot notation to represent previously nested objects.

- `@param {object} nestedObject` An object where each value is either a string, number, boolean, or plain JS object (arrays are) not supported

- `@returns` A flattened version of the passed object. The keys of the returned object will use dot notation to represent the nesting that was present in the original object. e.g. `{foo: {bar: 'baz'}}` will become `{'foo.bar': 'baz'}`. Primitive values on the original object will not have their keys affected.

### `nestObject(nestedKeyNotationObject)`

Turns a non-nested object whose keys use dot notation to represent nesting into a nested object.

- `@param {object} nestedKeyNotationObject` An object whose keys use dot notation to represent previously nested objects.

- `@returns` A nested version of the passed object. e.g. `{'foo.bar': 'baz'}` will become `{foo: {bar: 'baz'}}`

## Why?

I wrote these functions for a project and didn't end up having a use for them, but I thought they might be useful to someone else or to me in the future.
