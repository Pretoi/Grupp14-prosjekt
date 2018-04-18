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
        console.log('Error 209: Could not get user-expertise');
        return;
      }

       callback(result);
    });
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
    connection.query('SELECT * FROM Arrangement ORDER BY Arrnavn', [], (error, result) => {
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

  createEvent(Arrangement_ID, Arrnavn, Beskrivelse, Oppmotested,
    Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr, callback) {
    connection.query('INSERT INTO Arrangement (Arrangement_ID, Arrnavn, Beskrivelse, Oppmotested, 	Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
     [Arrangement_ID, Arrnavn, Beskrivelse, Oppmotested, Oppmotetidsspunkt, Starttidspunkt, Sluttidspunkt, Poststed, Postnr], (error, result) => {
      if (error) throw error;
      callback();
    })
  }

  getEventRoles(Arrangements_ID, callback) {
    connection.query('SELECT * FROM Arrangement_Rolle WHERE Arrangements_ID = ?', [Arrangements_ID], (error, result) => {
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
