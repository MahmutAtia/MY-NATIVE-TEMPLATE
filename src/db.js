import * as SQLlite from "expo-sqlite"; // use * as sqllite to work


const db = SQLlite.openDatabase("my.db")
export default db