import sqlite3 from 'sqlite3'
import mydatabase from '../utils/mydatabase'
import postTableRow from '../interface/postTableRow'

class PostTable {
    db: sqlite3.Database = mydatabase
    
    constructor() {}

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