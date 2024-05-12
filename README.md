# tsog

> A lightweight package using typescript compiler API to generate an object or value from a type or interface.

## Installation

```sh
$ npm i -D tsog
```

## Usage

### Configurating

The module uses the path to your typescript files to look for specific type references. 
It can also take a js file, from which it will compile a declaration file and read the types from it.

```ts
import tsog from 'tsog';

tsog.defineFiles(['type.d.ts', 'uncompiled.js'])
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
import tsog from 'tsog';

const object = tsog.generate('SomeObjectInterface');

// you can infer a type
const object = tsog.generate<SomeObjectInterface>('SomeObjectInterface');

// and override the results
const object = tsog.generate('SomeObjectInterface', {
    overrides: {
        'nested.name': 'IPreferThisName'
    }
});
```