import * as mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
let connection;
function connect() {
  connection = mysql.createConnection({
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_oops_14',
    password: 'GnjdqSub',
    database: 'g_oops_14'
  });

  // Connect to MySQL-server
  connection.connect((error) => {
    if (error) throw error; // If error, show error in console and return from this function
  });

  // Add connection error handler
  connection.on('error', (error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') { // Reconnect if connection to server is lost
      connect();
    }
    else {
      throw error;
    }
  });
}
connect();

class UserService {
  signIn(email, password, callback) {
    connection.query('SELECT * FROM Bruker where Email = ? and Passord = ?', [email,password], (error, result) => {
      if(error) throw error;
      if(result.length<1) {
        alert('Wrong username or password');
        return;
      }

      localStorage.setItem('signedInUser', JSON.stringify(result[0]));
      callback();
    });
  }

  signUpAdress(postnr, poststed, callback) {
    connection.query('INSERT INTO Sted (Postnr, Poststed) values (?, ?)',
     [postnr, poststed], (error, result) => {
      if (error) throw error;
      //callback();
    });
  }

  signUp(fornavn, etternavn, passord, epost, telefonnummer,
    adresse, postnr, poststed, callback) {
    connection.query('INSERT INTO Bruker (Fornavn, Etternavn, Passord, Email, Tlf, Adresse, Postnr, Poststed) values (?, ?, ?, ?, ?, ?, ?, ?)',
     [fornavn, etternavn, passord, epost, telefonnummer, adresse, postnr, poststed], (error, result) => {
      if (error) throw error;
      callback();
    });
  }


  getSignedInUser() {
    let item = localStorage.getItem('signedInUser'); // Get User-object from browser
    if(!item) return null;
    return JSON.parse(item);
  }

  getUserInfo(email,callback) {
    connection.query('SELECT * FROM Bruker WHERE Email = ?', [email], (error, result) => {
      if(error) throw error;
      if(result.length<1) {
        alert('Wrong username or password');
        return;
      }

       callback(result[0]);
    });
  }

  getAllMedlemsnr(nada,callback) {
    connection.query('SELECT Medlemsnr FROM Bruker', [], (error, result) => {

       callback(result);
    });
  }

  updateUserInfo(fornavn, etternavn, epost, telefonnummer,
    adresse, postnummer, poststed, id, callback) {
    connection.query('UPDATE Bruker SET fornavn=?, etternavn=?, email=?, tlf=?, adresse=?, postnr=?, poststed=? WHERE email=?',
     [fornavn, etternavn, epost, telefonnummer, adresse, postnummer, poststed, id], (error, result) => {
       if(error) throw error;
      callback();

    });
  }


  signOut() {
    localStorage.removeItem('signedInUser'); // Delete User-object from browser
  }


  getUserExpertise(id, callback){
    connection.query('SELECT * FROM Rolle WHERE Medlemsnr = ?', [id], (error, result) => {
      if(error) throw error
      if(result.length<1) {
        console.log('Error 209: Could not Rolle from selected Medlemsnr')
        return
      }
       callback(result)
    })
  }

  getExpertiseID(K_navn, callback){
    connection.query('SELECT * FROM Kompetanse WHERE K_navn = ?', [K_navn], (error, result) => {
      if(error) throw error
      if(result.length<1){
        console.log('Error 210: Could not find Kompetanse with current ID')
        return
      }
      callback(result)
    })
  }

  createUserExpertise(Medlemsnr, Kompetanse_ID, Rollenavn, callback){
    connection.query('INSERT INTO Rolle (Medlemsnr, Kompetanse_ID, Rollenavn) values (?, ?, ?)', [Medlemsnr, Kompetanse_ID, Rollenavn], (error, result) => {
      if(error) throw error
       callback()
    })
  }

  getUserSearch(input, callback){
    connection.query('SELECT * FROM Bruker WHERE Fornavn Like ?', ['%'+input+'%'], (error, result) => {
      if(error) throw error
      console.log("input til db: "+input)
      console.log("Res fra db:"+result)
      if(result.length<1){
        console.log("Error: Search failed")
      }

      callback(result)
    })
  }

}


class EventService {

  getEvent(input, callback) {
    connection.query('SELECT * FROM Arrangement WHERE Arrangement_ID = ?', [input], (error, result) => {
      if(error) throw error;

      callback(result[0]);
    });
  }

  getEvents(input, callback) {
    connection.query('SELECT * FROM Arrangement ORDER BY Dato DESC', [], (error, result) => {
      if(error) throw error;

      callback(result);
    });
  }

  getUsersEvents(medlemsnr, callback) {
    connection.query('SELECT * FROM Deltager INNER JOIN Arrangement ON Deltager.Arrangement_ID = Arrangement.Arrangement_ID WHERE Medlemsnr = ?', [medlemsnr], (error, result) => {
      if(error) throw error

      callback(result)
    })
  }

  createEvent(Arrangement_ID, Arrnavn, Dato, Beskrivelse, Oppmotested,
    Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr, callback) {
    connection.query('INSERT INTO Arrangement (Arrangement_ID, Arrnavn, Dato, Beskrivelse, Oppmotested, Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
     [Arrangement_ID, Arrnavn, Dato, Beskrivelse, Oppmotested, Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr], (error, result) => {
      if (error) throw error;
      callback();
    })
  }

  updateEvent(Arrangement_ID, Arrnavn, Dato, Beskrivelse, Oppmotested,
    Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Postnr, Poststed, callback) {
    connection.query('UPDATE Arrangement SET Arrnavn = ?, Dato = ?, Beskrivelse= ?, Oppmotested = ?, Oppmotetidsspunkt = ?, Starttidspunkt = ?, Sluttidspunkt = ?, Postnr = ?, Poststed= ? WHERE Arrangement_ID = ?',
     [Arrnavn, Dato, Beskrivelse, Oppmotested, Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Postnr, Poststed, Arrangement_ID], (error, result) => {
      if (error) throw error
      callback()
    })
  }

  createEventRoles(Arr_rolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle, callback) {
    connection.query('INSERT INTO Arrangement_Rolle (Arr_RolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle) values (?, ?, ? ,?)',
    [Arr_rolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle], (error, result) => {
      if (error) throw error
      callback()
    })
  }

  removeEventRoles(Arr_rolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle, callback) {
    connection.query('INSERT INTO Arrangement_Rolle (Arr_RolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle) values (?, ?, ? ,?)',
    [Arr_rolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle], (error, result) => {
      if (error) throw error
      callback()
    })
  }

  updateEventRoles(Arr_rolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle, callback) {
    connection.query('UPDATE Arrangement_Rolle SET Medlemsnr = ?, GI (Arr_RolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle) values (?, ?, ? ,?)',
    [Arr_rolleID, Arrangements_ID, Medlemsnr, Gitt_Rolle], (error, result) => {
      if (error) throw error
      callback()
    })
  }

  getEventRoles(Arrangements_ID, callback) {
    connection.query('SELECT * FROM Arrangement_Rolle WHERE Arrangements_ID = ? ORDER BY Gitt_Rolle', [Arrangements_ID], (error, result) => {
      if (error) throw error
      callback(result)
    })
  }


  getUserInfo1(nada, callback) {
    connection.query('SELECT Rolle.Rollenavn AS komp, Bruker.Fornavn AS navn, Bruker.Medlemsnr FROM Rolle JOIN Bruker ON Rolle.Medlemsnr = Bruker.Medlemsnr', [], (error, result) => {
      if (error) throw error

      callback(result)
      });
    }

  getAvailableUsers(Arrangements_ID, callback){
    connection.query('SELECT Bruker.Medlemsnr, Bruker.Fornavn, Bruker.Etternavn, Rolle.Rollenavn, Periode.Status, Periode.Startdato, Periode.Sluttdato FROM Bruker LEFT JOIN Arrangement_Rolle ON Bruker.Medlemsnr = Arrangement_Rolle.Medlemsnr LEFT JOIN Periode ON Bruker.Medlemsnr = Periode.Medlemsnr LEFT JOIN Arrangement ON Arrangement_Rolle.Arrangements_ID = Arrangement.Arrangement_ID LEFT JOIN Rolle ON Bruker.Medlemsnr = Rolle.Medlemsnr WHERE Arrangement_Rolle.Arrangements_ID != ? OR Arrangement_Rolle.Arrangements_ID IS NULL AND Status != 0 AND 2018-03-30 NOT BETWEEN Periode.Startdato AND Periode.Sluttdato',
    [Arrangements_ID], (error, result) => {
      if (error) throw error
      callback(result)
    })
  }
}

class CalendarService{

  createUserPeriod(startdato, sluttdato, status, medlemsnr, callback){
    connection.query('INSERT INTO Periode (Startdato, Sluttdato, Status, Medlemsnr) values (?, ?, ?, ?)',
    [startdato, sluttdato, status, medlemsnr], (error, result) => {
      if (error) throw error
      callback()
    })
  }

  getUserPeriod(medlemsnr, callback){
    connection.query('SELECT * FROM Periode WHERE Medlemsnr = ? ORDER BY Startdato', [medlemsnr], (error, result) => {
      if(error) throw error
      if(result.length<1) {
        console.log('Error 208: Could not get period')
      }
      callback(result)
    })
  }

}

let userService = new UserService();
let eventService = new EventService();
let calendarService = new CalendarService();

export { userService, eventService, calendarService };
