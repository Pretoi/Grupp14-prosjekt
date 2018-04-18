const mysql = require('mysql');

// Setup MySQL-server connection
const connection = mysql.createConnection({
  host     : 'mysql.stud.iie.ntnu.no',
  user     : 'g_oops_14',
  password : 'GnjdqSub',
  database : 'g_oops_14'
});

///////////////// Connect to MySQL-server/////////////////////////////
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


//////////////////////detaljesiden///////////////////////////////////////////////
arrangementDetaljer.onshow = function() {

  let arrNavnDetaljer = document.getElementById('arrNavnDetaljer');
  let arrStedDetaljer = document.getElementById('arrStedDetaljer');
  let arrBeskrivelseDetaljer = document.getElementById('arrBeskrivelseDetaljer')
  let arrPoststedDetaljer = document.getElementById('arrPoststedDetaljer')
  let arrPostnummerDetaljer = document.getElementById('arrPostnummerDetaljer')
  let arrOppmoteDetaljer = document.getElementById('arrOppmoteDetaljer')
  let arrStartDetaljer = document.getElementById('arrStartDetaljer')
  let arrSluttDetaljer = document.getElementById('arrSluttDetaljer')
  let arrDatoDetaljer = document.getElementById('arrDatoDetaljer')

  var ledigePlasser = new Array;
  var opptattePlasser = new Array;
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
    arrBeskrivelseDetaljer.textContent = Arrangement.Beskrivelse
    arrStedDetaljer.textContent = Arrangement.Oppmotested
    arrPoststedDetaljer.textContent = Arrangement.Poststed
    arrPostnummerDetaljer.textContent = Arrangement.Postnr
    arrOppmoteDetaljer.textContent = Arrangement.Oppmotested
    arrStartDetaljer.textContent = Arrangement.Starttidspunkt
    arrSluttDetaljer.textContent = Arrangement.Sluttidspunkt
    arrDatoDetaljer.textContent = Arrangement.Dato

  }
  oppdaterRolle()
  });
  function oppdaterRolle() {
    var sql = 'SELECT * FROM Arrangement_Rolle WHERE Arrangements_ID = ?';

  connection.query(sql, [personsIndex], function (err, results) {
    if (err) throw err;
    for(let Arrangement_Rolle of results) {
    var Medlemsnr = Arrangement_Rolle.Medlemsnr
    var Gitt_Rolle = Arrangement_Rolle.Gitt_Rolle
  //  console.log(Medlemsnr);

    if (!Medlemsnr) {
      //console.log("LOOL");
      ledigePlasser.push(Arrangement_Rolle)
    //  console.log(ledigePlasser);
    }else {
      opptattePlasser.push(Arrangement_Rolle)
      //  console.log("NICE")
    };
      //  console.log(opptattePlasser);

  }

  ledigePlasser.toString();
  //  console.log(ledigePlasser);
    /*for (var i = 0; i < results.length; i++) {


    if (Medlemsnr == 13) {
      console.log("LOOL");
    }else {


        console.log("NICE")};
}*/
  });
};
  }

}

///////////////lag event//////////////////////////////
/*var typeArra = document.getElementById("typeArr");
var arrType =  typeArra.selectedIndex;
var x = typeArra.options[arrType].text;*/
//typeArra.options[typeArra.selectedIndex].text;
/*var stedArra = document.getElementById("plassArr");
var arrSted = stedArra.options[stedArra.selectedIndex].text;*/

function testEvent() {
  var typeArra = document.getElementById("typeArr");
  var arrType =  typeArra.selectedIndex;
  var x = typeArra.options[arrType].text;
  var folk = document.getElementById('antallFolk').value;
  var stedArra = document.getElementById("plassArr");
  var arrSted = stedArra.selectedIndex;
  var z =
  console.log(folk);



  if (arrSted == 0) {
    var z = 1
  } else if (arrSted == 1){
    var z = 2
  }



  if (folk > 200) {
    if (arrType == 0) {

      var sanitet = folk * 0.01 * z
      document.getElementById("Sanitet").innerHTML = sanitet;
      console.log("LOOOOOL");
    } else if (arrType == 1) {
      var sanitet = folk * 0.02 * z
      document.getElementById("Sanitet").innerHTML = sanitet;
      console.log("nice");
    }

  /*  console.log(x);*/
    console.log(z);/*
    console.log(arrType);
    console.log(arrSted);*/
} else {
    var sanitet = 4 * z
    document.getElementById("Sanitet").innerHTML = sanitet;
}

}



////////////////////////////sider ting////////////////////
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
