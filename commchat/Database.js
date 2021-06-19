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
                    console.log("Initializing database");
                    db.transaction((tx) => {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS User (name, userName, biometry, peerId, multiAddrs)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Messages (messageFrom, messageTo, messageTime, messageContent)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS Friends (friendName, friendUserName, friendPeerId)');
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

      addUser(name, userName, biometry) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO User VALUES (?, ?, ?, ?, ?)', [name, userName, biometry, null, null]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      deleteUser() {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM User').then(([tx, results]) => {
                console.log(results);
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      getUser() {
        return new Promise((resolve) => {
          const users = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM User', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`name: ${row.name}, UserName: ${row.userName}`)
                  const { name, userName, biometry } = row;
                  users.push({
                    name,
                    userName,
                    biometry
                  });
                }
                console.log(users);
                resolve(users);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });
      }

      saveMessage(message) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO Messages VALUES (?, ?, ?, ?)', [message.messageFrom, message.messageTo, message.messageTime, message.messageContent]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      getMessages(messageFrom, messageTo) {
        console.log(id);
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM Messages WHERE messageFrom = ? AND messageTo = ?', [messageFrom, messageTo]).then(([tx,results]) => {
                console.log(results);
                if(results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      addFriend(friend) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO Friends VALUES (?, ?, ?)', [friend.friendName, friend.friendUserName, friend.friendPeerId]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      getFriends() {
        console.log(id);
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM Friends').then(([tx,results]) => {
                console.log(results);
                if(results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      deleteDatabase() {
        SQLite.deleteDatabase(
          {name: 'CommChat.db', location: '~www/test.db'},  
          () => { console.log('second db deleted');  },
          error => {
              console.log("ERROR: " + error); 
          }
      );
      }

}