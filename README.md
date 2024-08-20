# Babel plugin hands-on

### Setup

-   `npm i`
-   `npm run test:watch`

### Implement plugin under test

-   The source and test files are under `/src`
-   The plugin only transforms syntax for functions
    -   Prefixes names of functions and variables assigned to functions
    -   Option `prefix` defaults to `'_'`, specifying the prefix string
    -   Option `skipPrefixed` defaults to `false`, if a name already has the prefix string at the start, it does not apply the prefix

### Testing

-   Babel is targeting `src/main.js`, transpiled output is in `dist`
-   Test plugin: `npm run build`
