const mysql = require('mysql');

// Setup MySQL-server connection
const connection = mysql.createConnection({
  host     : 'mysql.stud.iie.ntnu.no',
  user     : 'g_oops_14',
  password : 'GnjdqSub',
  database : 'g_oops_14'
});

// Connect to MySQL-server
connection.connect(function(error) {
  if(error) throw error; // If error, show error in console and return from this function
});

let arrangementList = document.getElementById('arrangementList');
connection.query('select * from Arrangement order by Arrnavn', function(error, results, fields) {
  if(error) throw error; // If error, show error in console and return from this function
  //console.log(results);
  for(let Arrangement of results) {
    let a = document.createElement('a');
    a.className = "arrangementOversikt";
    a.href = '#/arrangementDetaljer/' + Arrangement.Arrangement_ID;
    a.textContent = Arrangement.Arrnavn + ', ' + Arrangement.Oppmotested;
    let li = document.createElement('li');
    li.appendChild(a);
    arrangementList.appendChild(li);
  }
});


//detaljesiden
arrangementDetaljer.onshow = function() {

  let arrNavnDetaljer = document.getElementById('arrNavnDetaljer');


  var parts = window.location.hash.split('/'); // parts[2] contains the index of the person
  var personsIndex = Number(parts[2]);         // to be shown from the persons table
console.log(personsIndex)
  oppdater()
function oppdater() {
  var sql = 'SELECT * FROM Arrangement WHERE Arrangement_ID = ?';
  //Send an array with value(s) to replace the escaped values:
  connection.query(sql, [personsIndex], function (err, results) {
/*
  connection.query('select * from Arrangement WHERE Arrangement_ID = ?', function(error, results, fields) {
    if(error) throw error; // If error, show error in console and return from this function
*/
if (err) throw err;
    console.log(results);
  //  let Arrangement of results
  for(let Arrangement of results) {

    arrNavnDetaljer.textContent = Arrangement.Arrnavn
  }
  });
  }
}







//sider ting
function updatePages() {
  let parts = window.location.hash.split('/');

  if(parts.length < 2) {                       // If parts[1] is not set
    window.location.hash = '#/arrangementHovedside'; // Set default page
  }

  for(let page of document.getElementsByClassName('page')) {
    if(page.id == parts[1]) {
      page.style.display = 'inline'; // Show page
      if(page.onshow)  // If onshow is set
        page.onshow(); // call the onshow() function
    }
    else {
      page.style.display = 'none';  // Hide page
    }
  }
}
document.body.onload = function() { // When the application is fully loaded:
  updatePages();


}

document.body.onhashchange = function() {
  updatePages();
}
//slutt på sider ting
