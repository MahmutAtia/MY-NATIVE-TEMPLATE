import * as SQLite from "expo-sqlite"; // use * as sqllite to work
import { version } from "react";





const db = SQLite.openDatabase('mydb1.db')

export default db