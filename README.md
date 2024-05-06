# tsog

> A lightweight package using typescript compiler API to generate an object or value from a type or interface.

## Installation

```sh
$ npm i -D tsog
```

## Usage

### Configurating

The module uses the path to your type files to look for specific type references.

```ts
import { defineConfig } from 'tsog';

defineConfig({
    files: ['type.d.ts']
})
```

If you use this package to help you test your app with jest or vitest, call the method on your test setup file. 

### Generating

type.d.ts
```ts

export interface SomeObjectInterface {
    name: string
    id: number,
    nested: SomeOtherObjectInterface
}

export interface SomeOtherObjectInterface {
    name: string
}
```

app.test.ts
```ts
import { generate } from 'tsog';

const object = generate('SomeObjectInterface');

// you can infer a type
const object = generate<SomeObjectInterface>('SomeObjectInterface');

// and override the results
const object = generate('SomeObjectInterface', {
    'nested.name': 'IPreferThisName'
});
```