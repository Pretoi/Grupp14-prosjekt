var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'mysql.stud.iie.ntnu.no',
  user     : 'g_oops_14',
  password : 'GnjdqSub',
  database : 'g_oops_14'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO Arrangement (Arrangement_ID, Arrnavn, Beskrivelse, Oppmotested, 	Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr) VALUES ?";
  var values = [
    [001, 'Rosenborg', 'Test1', 'Trondheim', 1500, 1530, 1900, 'Teststed', 0101],
    [002, 'Molde', 'Test2', 'Molde', 1400, 1430, 1800, 'Userland', 3102],

  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
