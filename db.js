const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
 
// open database in memory
let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

var oneDay = 1432703079 + 5*60;

var sql = `SELECT created_utc date, 
                  body body
           FROM May2015
           WHERE retrieved_on <= ${oneDay}`

var arr = [];
db.each(sql, [], (err, row) => {
    if (err) {
      throw err;
    }
        arr.push({date: new Date(row.date * 1000), body: row.body});
        console.log(arr.length);
});

 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
    fs.writeFile('one.json', JSON.stringify(arr), 'utf8', function(err) {
        if (err) {
            console.log(err);
        }
        console.log('JSON has been created');
    })
  console.log('Close the database connection.');
});