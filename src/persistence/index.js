import * as ExpoSQLite from "expo-sqlite";

const db = ExpoSQLite.openDatabase("sessions.db");

// crear la tabla
export const initSQLiteDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

// crear la sesion
export const insertSession = ({ localId, email, token }) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sessions (localId, email, token) VALUES (?,?,?)",
        [localId, email, token],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

// obtener la sesion
export const getSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * from sessions",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

// cerrar la sesion
export const truncateSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE from sessions",
            [],
            (_, result) => resolve(result),
            (_, error) => reject(error)
          );
        });
      });
      return promise;
}