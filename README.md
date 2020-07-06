# Profiling Mobile Databases

Running some performance tests on mobile databases for React Native

## Getting started

Clone repo

```
git clone git@github.com:JohnWebb4/profiling-mobile-dbs.git
```

Install node modules with yarn

```
cd profiling-mobile-dbs
yarn
```

Build to device

iOS: `yarn ios`

Android: `yarn android`

## In Memory Cache

All the data is put in a giant JavaScript array. Using as a psuedo base line. Not efficient. Comment out write in App.ts for large contact counts (>100,000).

## Realm

Uses [Realm](https://www.npmjs.com/package/realm).

## Watermelon DB

Uses [Watermelon DB](https://www.npmjs.com/package/@nozbe/watermelondb)

## License

[MIT](/LICENSE)
