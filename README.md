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

## Profiling In Memory Cache

All the data is put in a giant JavaScript array. Not efficient.

In App.ts, uncomment the contactService variable so inMemoryContactService is used.

## Realm

Uses [Realm](https://www.npmjs.com/package/realm).

In App.ts, uncomment the contactService variable so realmContactService is used.

## Watermelon DB

Uses [Watermelon DB](https://www.npmjs.com/package/@nozbe/watermelondb)

In App.ts, uncomment the contactService variable so watermelonContactService is used.

In contactList.js, uncomment the line that enhances the ContactList at the bottom of the file.

## License

[MIT](/LICENSE)
