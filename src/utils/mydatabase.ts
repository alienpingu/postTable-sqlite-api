import sqlite3 from "sqlite3";

const mydatabase: sqlite3.Database  = new sqlite3.Database('mydatabase.db');

export default mydatabase;