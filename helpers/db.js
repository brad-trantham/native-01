import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        // tx is the transaction which is created for you
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
            // bindings
            [],
            // function run on success
            () => {resolve()},
            // function run on failure
            // the underscore here means "I don't care about the first argument"
            (_, err) => {reject(err)})
        })
    })
    return promise
}