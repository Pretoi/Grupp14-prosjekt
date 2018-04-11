const mysql = require('mysql');

// Setup MySQL-server connection
const connection = mysql.createConnection({
  host     : 'mysql.stud.iie.ntnu.no',
  user     : 'aleksahb',
  password : 'AiM1f711',
  database : 'aleksahb'
});

// Connect to MySQL-server
connection.connect(function(error) {
  if(error) throw error; // If error, show error in console and return from this function
});

let personList = document.getElementById('personList');
connection.query('select * from Persons order by FirstName', function(error, results, fields) {
  if(error) throw error; // If error, show error in console and return from this function

  for(let person of results) {
    let li = document.createElement('li');
    li.textContent = person.FirstName + ', ' + person.City;
    personList.appendChild(li);
  }
});
