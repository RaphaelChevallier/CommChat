import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "CommChat.db";
const database_version = "1.0";
const database_displayname = "SQLite CommChat Local Database";
const database_size = 200000;

export default class Database {
    initDB() {
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                    console.log("Initializing new database");
                    db.transaction((tx) => {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS User (userId, name, userName, userPassword)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Messages (messageId, messageFrom, messageTo, messageTime, messageContent)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Friends (friendId, friendName, friendUserName, friendPeerId)');
                    }).then(() => {
                        console.log("Tables created successfully");
                    }).catch(error => {
                        console.log(error);
                    });
                  resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      };

      closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };


}