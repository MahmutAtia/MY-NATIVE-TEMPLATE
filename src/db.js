import * as SQLite from "expo-sqlite"; // use * as sqllite to work





const db = SQLite.openDatabase('mydb10.db')


 // create tables
 db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS spaces (id INTEGER PRIMARY KEY , name VARCHAR(30), img TEXT)",
      null,
      (txObj, resulset) => {
        return;
      },
      (txObj, err) => console.log(err)
    );
  });

  // create tables
  db.transaction((tx) => {
    console.log("iam getting data from spaces table");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS cats (id INTEGER PRIMARY KEY , name VARCHAR(30) ,img TEXT , space_id INTEGER,FOREIGN KEY (space_id) REFERENCES spaces(id))",
      null,
      (txObj, resulset) => {
        return;
      },
      (txObj, err) => console.log(err)
    );
  });

  // create tables
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT , title VARCHAR(30), text VARCHAR(255),\
          cat_id INTEGER , space_id INTGER , completed INTEGER , created_at TEXT,\
          completed_at TEXT, urg INTEGER , imp INTEGER,\
          onProgress INTEGER ,\
          FOREIGN KEY (space_id) REFERENCES spaces(id),\
          FOREIGN KEY (cat_id)  REFERENCES cats(id))",
      null,
      (txObj, resulset) => {
        return;
      },
      (txObj, err) => console.log(err)
    );
  });


export default db