import sqlite3 from 'sqlite3'
// Utils
import mydatabase from '../utils/mydatabase'
// Interfaces
import Table from '../interface/table'
import postTableRow from '../interface/postTableRow'

class PostTable {
    db: sqlite3.Database = mydatabase
    
    constructor() {
        console.log('✅ Database')
    }

    // create = () => {
    //     this.db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='postTable'", (queryErr:Error, table:Table) => {
    //         if (queryErr) {
    //           console.error('Error executing the query:', queryErr.message)
    //           return
    //         }
        
    //         if (!table) {
    //           this.db.run("CREATE TABLE postTable (username TEXT, content TEXT)", (createErr:Error) => {
    //             if (createErr) {
    //               console.error('Error creating the table:', createErr.message)
    //             } else {
    //               console.log('☑ Table postTable created successfully.')
    //             }
    //           })
    //         } else {
    //           console.log('The table postTable already exists.')
    //         }
    //     })
        
    // }
    // open = () => {
    //   this.db = mydatabase;
    // }
    // close = () => {
    //     this.db.close((closeErr:Error | null) => {
    //         if (closeErr) {
    //           console.error('Error closing the database:', closeErr.message)
    //         } else {
    //           console.log('☑ Database closed successfully.')
    //         }
    //     })
    // }
    delete = async (rowIdToDelete:number):Promise<boolean> => {  
      return new Promise((resolve, reject) => {
        this.db.run("DELETE FROM postTable WHERE rowid = ?", [rowIdToDelete], (deleteErr: Error) => {
            if (deleteErr) {
              console.error('Error deleting the row:', deleteErr.message)
              reject(false);
            } else {
              console.log('Row deleted successfully.')
              resolve(true);
            }
        })
      });
    }
    insert = async (username: string, content: string):Promise<boolean> => {  
      const stmt = this.db.prepare("INSERT INTO postTable VALUES (?, ?)")
      return new Promise((resolve, reject) => {
        try {
          stmt.run(username, content)
          stmt.finalize()
          resolve(true);
        } catch (error) {
          console.error("Errore durante l'esecuzione della query:", error)
          reject(false);
        }
      });
    }
    select = async ():Promise<postTableRow[]> => {  
      return new Promise((resolve, reject) => {
        this.db.all("SELECT rowid as id, username, content FROM postTable", (err, rows:postTableRow[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }

}

export default PostTable