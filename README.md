# Profiling Mobile Databases

Running some performance tests on mobile databases for React Native

## Results

The following graph describes the speed each database can write a batch (1,000) of trivial contacts. These contacts only have a name field and ID. The x-axis is the number of contacts written. Each point represents a batch. The in-memory graph represents writing a batch of contacts to an in-memory JS array. This is used as a baseline for writing a contact.

![20-000-contacts](/assets/20-000-trivial.png)

For a trivial data structure, Realm is faster than Watermelon DB.

The original result was for a trivial database table (just a name and key). Most data models have connections between tables. A contact for examples has phone numbers, emails, social profiles, etc. A better representation of the database can be seen by implementing a more complex data model for 10,000 contacts.

![10-000-complex-contacts](/assets/10-000-complex.png)

Watermelon is better in this situation as well. Notice the upward trend of the SQLite database. Since all tables are in a file, as more elements are added, the file size grows and appending new entries takes longer and longer.

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
