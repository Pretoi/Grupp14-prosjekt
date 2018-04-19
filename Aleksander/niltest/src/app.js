import * as React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();
import { userService, eventService, calendarService } from './services';

//#################MENY##################################################

class Menu extends React.Component {
  render() {
    let signedInUser = userService.getSignedInUser();
    //console.log(userService.getUserInfo(signedInUser.Email))
    //console.log(signedInUser.Administrator)

    if(signedInUser) {
      if(signedInUser.Administrator){
        return (
          <div id="header">
            <div>Du er logget inn som Administrator</div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: '#ffdbdb'}} exact to='/'>Profile</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: '#ffdbdb'}} to='/events'>Arrengement</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: '#ffdbdb'}} to='/createevent'>Lag Arrangement</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: '#ffdbdb'}} to='/kalender'>Kalender</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: '#ffdbdb'}} to='/search'>Søk</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: '#ffdbdb'}} to='/signout'>Logg Ut</NavLink>{' '}
            </div>
          </div>
        )
      }
      return (
        <div id="header">
          <div id="menuBtn">
            <NavLink activeStyle={{color: '#ffdbdb'}} exact to='/'>Profil</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: '#ffdbdb'}} to='/events'>Arrengement</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: '#ffdbdb'}} to='/kalender'>Kalender</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: '#ffdbdb'}} to='/search'>Søk</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: '#ffdbdb'}} to='/signout'>Logg Ut</NavLink>{' '}
          </div>
        </div>
      )
    }
    return (
      <div id="header">
        <div id="menuBtn">
          <NavLink activeStyle={{color: '#ffdbdb'}} to='/signin'>Sign In</NavLink>{' '}
        </div>
        <div id="menuBtn">
          <NavLink activeStyle={{color: '#ffdbdb'}} to='/signup'>Sign Up</NavLink>
        </div>
      </div>
    );
  }

  componentDidMount() {
    menu = this;
  }

  componentWillUnmount() {
    menu = null;
  }
}
let menu;

//#################SIGNIN##################################################

class SignIn extends React.Component {
  render() {
    return(
      <form id="content">
        <div>
          <h1>Logg inn på Røde Kors</h1>
        </div>
        <label><b>Epost-adresse</b></label>
        <input type="email" ref="signInMail" placeholder="Skriv epost-adresse" name="mail" required>
        </input>
        <label><b>Passord</b></label>
        <input type="password" ref="signInPsw" placeholder="Skriv passord" name="newPsw" required>
        </input>
        <br></br>
        <button ref="signInButton">Login</button>
        <button ref="forgotPswButton">Glemt Passord</button>
      </form>
    )
  }

  componentDidMount() {
    menu.forceUpdate();

    this.refs.signInButton.onclick = () => {
      userService.signIn(this.refs.signInMail.value,this.refs.signInPsw.value, () => {
        history.push('/');
      });
    };

    this.refs.forgotPswButton.onclick = () => {
      alert("du har glemt passordet.")
    };
  }
}

//#################SIGNUP##################################################

class SignUp extends React.Component {
    render() {
      return (

          <div id="content">
            <h1>Røde Kors</h1>

            <label><b>Fornavn</b></label>
            <input type="text" ref="signUpName" placeholder="Skriv fornavn" name="newName" required>
            </input>
            <br></br>
            <label><b>Etternavn</b></label>
            <input type="text" ref="signUpSurname" placeholder="Skriv etternavn" name="surName" required>
            </input>
            <br></br>
            <label><b>Passord</b></label>
            <input type="password" ref="signUpPsw" placeholder="Skriv passord" name="newPsw" required>
            </input>
            <br></br>
            <label><b>Epost</b></label>
            <input type="email" ref="signUpMail" placeholder="Skriv epost-adresse" name="mail" required>
            </input>
            <br></br>
            <label><b>Tlf</b></label>
            <input type="number" ref="signUpPhone" placeholder="Skriv telefon-nummer" name="phone" required>
            </input>
            <br></br>
            <label><b>Fødselsdato</b></label>
            <input type="date" ref="signUpBirth" name="bday">
            </input>
            <br></br>
            <label><b>Adresse</b></label>
            <input type="text" ref="signUpAddress" placeholder="Skriv gatenavn" name="adresse" required>
            </input>
            <br></br>
            <label><b>Postnummer</b></label>
            <input type="number" ref="signUpPostnr" placeholder="Skriv postnummer" name="postnr" required>
            </input>
            <br></br>
            <label><b>Poststed</b></label>
            <input type="text" ref="signUpPoststed" placeholder="Skriv poststed" name="poststed" required>
            </input>
            <br></br>
            <button ref="signUpButton">Registrer ny bruker</button>



          </div>

      )
    }

    componentDidMount() {

      this.refs.signUpButton.onclick = () => {

        userService.signUpAdress(this.refs.signUpPostnr.value, this.refs.signUpPoststed.value, (result) => {
            alert("Du har nå registrert deg")
            });

        userService.signUp(this.refs.signUpName.value, this.refs.signUpSurname.value, this.refs.signUpPsw.value,
          this.refs.signUpMail.value, this.refs.signUpPhone.value, this.refs.signUpAddress.value,
          this.refs.signUpPostnr.value, this.refs.signUpPoststed.value, (result) => {
            alert("Du har nå registrert deg")
            history.push('/signin');
        });
      }
    }
  }

//#################SIGNOUT##################################################

class SignOut extends React.Component {
  render() {
    return (<div />);
  }

  componentDidMount() {
    userService.signOut();
    history.push('/signin');
  }
}

//#################Profil##################################################

class Profile extends React.Component {

  render() {

  return (

    <div id="content">
      <div>
        <div>
          <div ref='fullNameDiv'></div>
        </div>
        <div ref='firstNameDiv'></div>
        <div ref='lastNameDiv'></div>
        <div ref='emailDiv'></div>
        <div ref='tlfNmbDiv'></div>
        <div ref='adresseDiv'></div>
        <div ref='postnrDiv'></div>
        <div ref='postStedDiv'></div>

        <button ref="editBtn">Rediger Informasjon</button>
      </div>
      <div>
        <h4>Kompetanse:</h4>
          <div ref='komp1Div'></div>
      </div>
    </div>
  );
}

componentDidMount() {
  let signedInUser = userService.getSignedInUser();
  if(signedInUser) {
    userService.getUserInfo(signedInUser.Email, (result) => {
      //console.log(result)
      this.refs.fullNameDiv.innerText = 'Profilside til: ' + result.Fornavn + ' ' + result.Etternavn;
      this.refs.firstNameDiv.innerText = 'Fornavn: ' + result.Fornavn;
      this.refs.lastNameDiv.innerText = 'Etternavn: ' + result.Etternavn;
      this.refs.emailDiv.innerText = 'Email-adresse: ' + result.Email;
      this.refs.tlfNmbDiv.innerText = 'Telefonnummer: ' + result.Tlf;
      this.refs.adresseDiv.innerText = 'Adresse: ' + result.Adresse;
      this.refs.postnrDiv.innerText = 'Postnummer: ' + result.Postnr;
      this.refs.postStedDiv.innerText = 'Poststed: ' + result.Poststed;
    })

    userService.getUserExpertise(signedInUser.Medlemsnr, (result) => {
      console.log(result)
      let listItems = [];
      let x = 0;
      for(let expertise of result) {
        listItems.push(result[x].Rollenavn);
        x++
      }

      this.refs.komp1Div.innerText = listItems
    })
  }
  else {
    history.push('/signin');
  }

  this.refs.editBtn.onclick = () => {
    history.push('/EditProfile')
  }

}


}

//#################Rediger Profil##################################################

class EditProfile extends React.Component {


  render() {

  return (

    <div id="content">
        <div ref='emailDiv'>
        </div>
      <ul>
        <li>Fornavn: <input type='text' ref='firstName' /></li>
        <li>Etternavn: <input type='text' ref='lastName' /></li>
        <li>Epost: <input type='text' ref='email' /></li>
        <li>Telefonnummer: <input type='text' ref='tlfNmb' /></li>
        <li>Fødselsdato: <input type='text' ref='birth' /></li>
        <li>Adresse: <input type='text' ref='adresse' /></li>
        <li>Postnummer: <input type='text' ref='postnr' /></li>
        <li>Poststed: <input type='text' ref='postSted' /></li>
      </ul>
      <button ref="saveButton">Oppdater</button>
    </div>
  )
}

componentDidMount() {
  let signedInUser = userService.getSignedInUser();
  userService.getUserInfo(signedInUser.Email, (result) => {

    this.refs.emailDiv.innerText = 'Rediger informasjon til: ' + signedInUser.Email;
    this.refs.firstName.value = result.Fornavn;
    this.refs.lastName.value = result.Etternavn;
    this.refs.email.value = result.Email;
    this.refs.tlfNmb.value = result.Tlf;
    this.refs.birth.value = result.Fødselsdato;
    this.refs.adresse.value = result.Adresse;
    this.refs.postnr.value = result.Postnr;
    this.refs.postSted.value = result.Poststed;

  });



  this.refs.saveButton.onclick = () => {
    userService.updateUserInfo(this.refs.firstName.value, this.refs.lastName.value, this.refs.email.value,
      this.refs.tlfNmb.value, this.refs.adresse.value,
      this.refs.postnr.value, this.refs.postSted.value, signedInUser.Email, () => {});
    history.push('/')
  };

}

}

//#################Events##################################################

class Events extends React.Component {

  render() {
    return(
      <div id="content">
        <div ref="ArrangementListe">Alle arrengmenter:</div>
          <div ref="arrDiv"></div>
        <div>Aktuelle arrengmenter:</div>
          <div ref="myArrDiv"></div>
          <div ref="eventDetails"></div>
      </div>
    )
  }

  componentDidMount() {
    let signedInUser = userService.getSignedInUser()
    ///////////////// Connect to MySQL-server/////////////////////////////


/*
    eventService.getEvents('null', result =>  {
      let arrangementList = document.createElement('ul')
      for(let Arrangement of result) {
        let a = document.createElement('a');
        let knapp = document.createElement('BUTTON')
        //a.href = history.push('/')
        a.textContent = Arrangement.Arrnavn + ', ' + Arrangement.Oppmotested;
        knapp.innerText = "Rediger"
        let li = document.createElement('li');
        li.appendChild(a);
        arrangementList.appendChild(li);
      }
      this.refs.arrDiv.appendChild(arrangementList)
    });
*/

    //##############HENTER ALLE ARRANGEMENTER#################

    eventService.getEvents("null", result => {
      let eventList = document.createElement('div')
      eventList.id = 'eventlist'
      let y = 0;
      for(let arr of result) {
        let arrnavn = document.createElement('ul')
        let arrbeskrivelse = document.createElement('li')
        let arrdato = document.createElement('li')
        let knapp = document.createElement('BUTTON')
        knapp.onclick = function () {
          test(arr.Arrangement_ID);
        }
        arrnavn.innerText = result[y].Arrnavn
        arrbeskrivelse.innerText = "Info: "+result[y].Beskrivelse
        arrdato.innerText = "Dato: "+result[y].Dato.getFullYear()+ '-' + result[y].Dato.getMonth() + '-' + result[y].Dato.getDate()
        knapp.innerText = "Mer info"
        arrnavn.appendChild(arrbeskrivelse)
        arrnavn.appendChild(arrdato)
        arrnavn.appendChild(knapp)
        eventList.appendChild(arrnavn)

        y++
      }

      this.refs.arrDiv.appendChild(eventList)
    });


    function test(arrnavn) {
      localStorage.setItem("current_arrID", arrnavn)
      history.push('/eventDetails')
      console.log(arrnavn);
    }
    console.log("Medlemsnr: "+signedInUser.Medlemsnr)
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



    //HENTER AKTUELLE ARRANGEMENTER
    eventService.getUsersEvents(signedInUser.Medlemsnr, result => {
      console.log(result)
      let myArrList = [];
      let i = 0;
      let status = "Ikke interessert"
      for(let arr of result) {
        if (result[i].Interesse == 2){
          status = "Interesse meldt!"
          myArrList.push("[X]"+" Arrnavn: "+result[i].Arrnavn+" Status: "+status+"[X]")
          i++
        }
        else if (result[i].Interesse == 1){
          status = "Aktiv periode"
          myArrList.push("[X]"+" Arrnavn: "+result[i].Arrnavn+" Status: "+status+"[X]")
          i++
        }
        else{
          status = "Ikke interessert"
          i++
        }
        console.log(i)
      }

      this.refs.myArrDiv.innerText = myArrList

    })
  }

}

class EventDetails extends React.Component{
  render(){
    return(
      <div className="arrDetaljerListe">
        <div ref="arrNavnDiv"></div>
        <div ref='arrInfoDiv'></div>
        <div ref='arrDatoDiv'></div>
        <div ref='arrLocationDiv'></div>
        <div ref='arrStartDiv'></div>
        <div ref='arrSluttDiv'></div>
        <div ref='arrPostnrDiv'></div>
        <div ref='arrPoststedDiv'></div>
        <div className="arrDetaljerRolleListe">
          <div>Sanitet:<span ref="arrDetaljerRolleLedigSanitet"></span></div>
          <div>Ambulansesjåfør:<span ref="arrDetaljerRolleLedigAmbulanse"></span></div>
        </div>
      </div>

    /*  <div className="arrDetaljerRolleListe">
        //<div>Sanitet:<span ref="arrDetaljerRolleSanitet"></span></div>
      </div>*/
    )
  }
  componentDidMount(){
    let currentArrID = localStorage.getItem("current_arrID")

    eventService.getEvent(currentArrID, (result) => {
      this.refs.arrNavnDiv.innerText = result.Arrnavn
      this.refs.arrInfoDiv.innerText = result.Beskrivelse
      this.refs.arrDatoDiv.innerText = result.Dato
      this.refs.arrLocationDiv.innerText = result.Oppmotested
      this.refs.arrStartDiv.innerText = result.Starttidspunkt
      this.refs.arrSluttDiv.innerText = result.Sluttidspunkt
      this.refs.arrPostnrDiv.innerText = result.Postnr
      this.refs.arrPoststedDiv.innerText = result.Poststed

    })
    eventService.getEventRoles(currentArrID, (result) => {
       console.log(result)

        let ledigeSanitet = [];
        let ledigeAbulanse = [];


        for(let Arrangement_Rolle of result) {
        var Medlemsnr = Arrangement_Rolle.Medlemsnr
        var Gitt_Rolle = Arrangement_Rolle.Gitt_Rolle

      //  console.log(Medlemsnr);

        if (!Medlemsnr) {
          //console.log("LOOL");
          if (Gitt_Rolle == "Sanitet") {
          //  this.refs.arrDetaljerRolleLedigSanitet.innerText = result.arrDetaljerRolleLedigSanitet
            ledigeSanitet.push(Arrangement_Rolle)

        //    console.log(ledigeSanitet[1])
          } else if (Gitt_Rolle == "Ambulansesjåfør"){
            ledigeAbulanse.push(Arrangement_Rolle)
          //  this.refs.arrDetaljerRolleLedigAmbulanse.innerText = result.arrDetaljerRolleLedigAmbulanse
          }



      //  this.refs.arrDetaljerRolleLedig.innerText = ledigePlasser
        //  console.log(ledigePlasser);
        /*}else {
        //  opptattePlasser.push(Arrangement_Rolle)
          //  console.log("NICE")
        };*/
      }
    }
    //  console.log(ledigeSanitet[0,1]);

      for (var i = 0; i < ledigeSanitet.length; i++) {
    this.refs.arrDetaljerRolleLedigSanitet.innerText= ledigeSanitet[i].Arr_RolleID


      }
      console.log(ledigeSanitet)
        /*
        for(let role of result) {
          myArrList.push(result[i].Gitt_Rolle)
          i++
        }

        this.refs.arrDetaljerRolleSanitet.innerText = myArrList*/

      })
  }
}

//#################Create Event##################################################

class CreateEvent extends React.Component {
    render() {
      return (
          <div id="content">

            <label><b>Arrangement_ID</b></label>
            <input type="number" ref="ArrId" placeholder="Arrangement ID" name="ArrId" required>
            </input>
            <br></br>
            <label><b>Arrengement Navn</b></label>
            <input type="text" ref="ArrNavn" placeholder="Arrengement Navn" name="ArrNavn" required>
            </input>
            <br></br>
            <label><b>Beskrivelse</b></label>
            <textarea ref="ArrBeskrivelse" placeholder="Arrengement beskrivelse" name="ArrBeskrivelse" required>
            </textarea>
            <br></br>
            <label><b>Oppmøtested</b></label>
            <input type="text" ref="ArrOppmotested" placeholder="Sted" name="ArrOppmotested" required>
            </input>
            <br></br>
            <label><b>Oppmøtetidspunkt</b></label>
            <input type="time" ref="ArrOppmotetid" placeholder="Tid" name="ArrOppmotetid" required>
            </input>
            <br></br>
            <label><b>Starttidspunkt</b></label>
            <input type="time" ref="ArrStart" name="ArrStart">
            </input>
            <br></br>
            <label><b>Sluttidspunkt</b></label>
            <input type="time" ref="ArrSlutt" placeholder="Slutt" name="ArrSlutt" required>
            </input>
            <br></br>
            <label><b>Poststed</b></label>
            <input type="text" ref="ArrPostSted" placeholder="Skriv poststed" name="ArrPoststed" required>
            </input>
            <br></br>
            <label><b>Postnummer</b></label>
            <input type="number" ref="ArrPostnr" placeholder="Skriv postnummer" name="ArrPostnr" required>
            </input>
            <br></br>
            <label><b>Dette brukes til å generere vakt mal, hvis du vil lage en selv eller redigere trykket du på knappen på bunnen av siden</b></label>
            <div>Type Arrangement:
            <select name="typeArr" ref="rolleFordeling" id="test234" onChange={() => {oppdaterrolle()}}>
                <option value="1">Festival</option>
                <option value="2">Idretts arrangement</option>
                <option value="3">Show</option>
                <option value="4">Kurs/Opplæring</option>
                <option value="5">Annet</option>
            </select></div>
            <div>Lokasjon:
            <select name="plassArr" ref="rolleFordeling" id="plassArr" onChange={() => {oppdaterrolle()}}>
                <option value="1">Storby</option>
                <option value="2">Tettsted</option>
                <option value="3">Fjell</option>
                <option value="4">Utmark</option>
                <option value="5">Kyst</option>
                <option value="6">Annet</option>
            </select></div>
            <label>Maks antall deltagere</label>
            <input type="number" ref="rolleFordeling" id="antallFolk" onChange={() => {oppdaterrolle()}}>
            </input>

            <br></br>


            <div ref="arrRollListe">
            Sanitet: <input type="number" ref="Sanitet" disabled="true" placeholder="2" id="rollerNyArr"></input>
            Ambulansemedhjelper:  <input type="number" ref="Ambulansemedhjelper" disabled="true" placeholder="0" id="rollerNyArr1"></input>
            Ambulansesjåfor: <input type="number" ref="Ambulansesjåfor" disabled="true" placeholder="0" id="rollerNyArr2"></input>
            3 MannAmbluanse:  <input type="number" ref="3MannAmbluanse" disabled="true" placeholder="0" id="rollerNyArr3"></input>
            Batforer:  <input type="number" ref="Batforer" disabled="true" placeholder="0" id="rollerNyArr4"></input>
            Bathjelper:  <input type="number" ref="Bathjelper" disabled="true" placeholder="0" id="rollerNyArr5"></input>
            Batmannskap:  <input type="number" ref="Batmannskap" disabled="true" placeholder="0" id="rollerNyArr6"></input>
            Vaktlederr:  <input type="number" ref="Vaktleder" disabled="true" placeholder="1" min="1" id="rollerNyArr7"></input>
            Scootersjofor:  <input type="number" ref="Scootersjofor" disabled="true" placeholder="0" id="rollerNyArr8"></input>
            Scootermedhjelper:  <input type="number" ref="Scootermedhjelper" disabled="true" placeholder="0" id="rollerNyArr9"></input>
            3 mannscooter:  <input type="number" ref="3mannscooter" disabled="true" placeholder="0" id="rollerNyArr10"></input>
            ATVforer:  <input type="number" ref="ATVforer" disabled="true" placeholder="0" id="rollerNyArr11"></input>
            Distriktsenor:  <input type="number" ref="Distriktsenor" disabled="true" placeholder="0" id="rollerNyArr12"></input>
            Opplering:  <input type="number" ref="Opplering" disabled="true" placeholder="0" id="rollerNyArr13"></input>
            Markor:  <input type="number" ref="Markor" disabled="true" placeholder="0" id="rollerNyArr14"></input>

            <button ref="redigerRoller">Rediger Roller</button>
            <button ref="signUpButton">REGISTRER</button>
            </div>

          </div>

      )
    }





    componentDidMount() {


      //For å åpne for å redigere roller, gjort VEDLIG tungvindt///
      this.refs.redigerRoller.onclick = () => {
        var testtt = document.getElementById("rollerNyArr")
        if (!testtt.disabled) {
      //    document.getElementsByClassName("rollerNyArr").disabled = true;
          document.getElementById("rollerNyArr").disabled = true;
          document.getElementById("rollerNyArr1").disabled = true;
          document.getElementById("rollerNyArr2").disabled = true;
          document.getElementById("rollerNyArr3").disabled = true;
          document.getElementById("rollerNyArr4").disabled = true;
          document.getElementById("rollerNyArr5").disabled = true;
          document.getElementById("rollerNyArr6").disabled = true;
          document.getElementById("rollerNyArr7").disabled = true;
          document.getElementById("rollerNyArr8").disabled = true;
          document.getElementById("rollerNyArr9").disabled = true;
          document.getElementById("rollerNyArr10").disabled = true;
          document.getElementById("rollerNyArr11").disabled = true;
          document.getElementById("rollerNyArr12").disabled = true;
          document.getElementById("rollerNyArr13").disabled = true;
          document.getElementById("rollerNyArr14").disabled = true;
        }else {
        //  document.getElementsByClassName("rollerNyArr").disabled = false;
       document.getElementById("rollerNyArr").disabled = false;
        document.getElementById("rollerNyArr1").disabled = false;
        document.getElementById("rollerNyArr2").disabled = false;
        document.getElementById("rollerNyArr3").disabled = false;
        document.getElementById("rollerNyArr4").disabled = false;
        document.getElementById("rollerNyArr5").disabled = false;
        document.getElementById("rollerNyArr6").disabled = false;
        document.getElementById("rollerNyArr7").disabled = false;
        document.getElementById("rollerNyArr8").disabled = false;
        document.getElementById("rollerNyArr9").disabled = false;
        document.getElementById("rollerNyArr10").disabled = false;
        document.getElementById("rollerNyArr11").disabled = false;
        document.getElementById("rollerNyArr12").disabled = false;
        document.getElementById("rollerNyArr13").disabled = false;
        document.getElementById("rollerNyArr14").disabled = false;
      }

      }



    /*  this.refs.signUpButton.onclick = () => {

        userService.signUpAdress(this.refs.ArrPostnr.value, this.refs.ArrPostSted.value, (result) => {
            console.log("Adresse og postnr registrert")
          });

        eventService.createEvent(this.refs.ArrId.value, this.refs.ArrNavn.value, this.refs.ArrBeskrivelse.value,
          this.refs.ArrOppmotested.value, this.refs.ArrOppmotetid.value, this.refs.ArrStart.value,
          this.refs.ArrSlutt.value, this.refs.ArrPostSted.value, this.refs.ArrPostnr.value, (result) => {
            alert("Arrengement registrert")
            history.push('/signin');

      });
    }*/


    /*  eventService.getEventRoles('0002', result => {
        console.log(result)

        let myArrList = [];
        let i = 0;
        for(let role of result) {
          myArrList.push(result[i].Gitt_Rolle)
          i++
        }

        this.refs.arrRoller.innerText = myArrList

      })*/
}
    }
    //////////////////MAL GENERERING//////////////////////////
    function oppdaterrolle(){
      console.log("HALO");

      var typeArra = document.getElementById('test234').selectedIndex;
      var folk = document.getElementById('antallFolk').value;
      var stedArra = document.getElementById("plassArr").selectedIndex;
      var z = "";
      var Distriktsenor = 0;
      var sanitet = 2;
      var Scootersjofor = 0;
      var Scootermedhjelper = 0;
      var Scooterhjelper3 = 0;
      var ATVforer = 0;
      var Ambulansesjåfor = 0;
      var Ambulansemedhjelper = 0;
      var MannAmbluanse3 = 0;
      var Batforer = 0;
      var Bathjelper = 0;
      var Batmannskap = 0;


      if (typeArra == 0) {
        z = 1.7
      } else if (typeArra == 1){
        z = 1.2
      } else if (typeArra == 2){
        z = 1
      } else if (typeArra == 3){
        Distriktsenor = 1
        z = 5
      } else {
        z = 1
      }

      if (folk > 200 && folk <= 400) {
        sanitet = folk * 0.01 * z
      }else if (folk < 200){
       sanitet = 2 * z

     }else if (folk > 400 && folk <= 999) {
       sanitet = folk * 0.002 * z
       if (sanitet < 2) {
        sanitet = 2
       }
     } else if (folk > 999 && folk <= 4000) {
       sanitet = folk * 0.0015 * z
       if (sanitet < 4) {
        sanitet = 4
       }
     } else if (folk > 4000) {
       sanitet = folk * 0.0004 *z
       Ambulansesjåfor = 1;
       Ambulansemedhjelper = 1;
       MannAmbluanse3 = 1;
       if (sanitet < 12) {
        sanitet = 12
       }
     }

     if (stedArra == 0) {


     } else if (stedArra == 1) {

     } else if (stedArra == 2) {
       Scootersjofor = 1;
       Scootermedhjelper = 1;
       Scooterhjelper3 = 1;
     } else if (stedArra == 3) {
       ATVforer = 1;
     } else if (stedArra == 4) {
       Batforer = 1;
       Bathjelper = 1;
       Batmannskap = 1;
     } else{

     }
console.log(sanitet);
 document.getElementById('rollerNyArr').value = Math.round(sanitet);
 document.getElementById('rollerNyArr12').value = Math.round(Distriktsenor);
 document.getElementById('rollerNyArr8').value = Math.round(Scootersjofor);
 document.getElementById('rollerNyArr9').value = Math.round(Scootermedhjelper);
 document.getElementById('rollerNyArr10').value = Math.round(Scooterhjelper3);
 document.getElementById('rollerNyArr11').value = Math.round(ATVforer);
 document.getElementById('rollerNyArr1').value = Math.round(Ambulansemedhjelper);
 document.getElementById('rollerNyArr2').value = Math.round(Ambulansesjåfor);
 document.getElementById('rollerNyArr3').value = Math.round(MannAmbluanse3);
 document.getElementById('rollerNyArr4').value = Math.round(Batforer);
 document.getElementById('rollerNyArr5').value = Math.round(Bathjelper);
 document.getElementById('rollerNyArr6').value = Math.round(Batmannskap);
}

  //#################Kalender##################################################

  class Kalender extends React.Component {

    render() {

      return(
        <div>

          <div ref="calendar" />
          <div>
              <div id="periodList" ref="periodeResult"></div>

              <div ref="arrDiv">
              </div>

              <div>
                  <div>Registrer ny periode</div>
                <ul>
                  <li>Startdato: <input type='date' ref='startdato' /></li>
                  <li>Sluttdato: <input type='date' ref='sluttdato' /></li>
                  <li>Status: <input type='number' ref='status' /></li>
                </ul>
                <button ref="regButton">Registrer ny periode</button>
              </div>
          </div>
        </div>
      )
    }

    componentDidMount() {
      let signedInUser = userService.getSignedInUser()

      //HENT ALLE EVENTS OG PUTT INN I kalender
      eventService.getEvents("null", (result) => {

        let settings = {};
        let events = [
          /*{'Date': new Date(2018, 3, 4), 'Title': 'Barnas dag 2018', 'Link': ''},
          {'Date': new Date(2018, 3, 7), 'Title': 'Konsert med M&M'},
          {'Date': new Date(2018, 4-1, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
          {'Date': new Date(2018, 4, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},*/
        ];



        let eventDateCalendar = 0
        let eventDateCalendarList = []
        let eventMonthDatabase = 0 //Måndte må lagres og gjøres om til int, fordi de i kalender appen starter på 0
        let tittel = ''
        let tittelListe = []

        for (let events in result){

          eventMonthDatabase = result[events].Dato.getMonth()
          //console.log("Måndte er:"+eventMonthDatabase)
          eventMonthDatabase = parseInt(eventMonthDatabase)+1
          //console.log("Måndte er så:"+eventMonthDatabase)
          tittel = result[events].Arrnavn
          //console.log("DatoA:"+datoA)
          eventDateCalendar = result[events].Dato.getFullYear()+ ',' + eventMonthDatabase + ',' + result[events].Dato.getDate()
          eventDateCalendarList.push(eventDateCalendar)
          tittelListe.push(tittel)

        }
        for (let i in eventDateCalendarList){
          console.log("Datoliste:"+eventDateCalendarList[i])
          events.push({'Date': new Date(eventDateCalendarList[i]), 'Title': tittelListe[i], 'Link': ''})
        }
        calendar(this.refs.calendar, events, settings)
      })


      console.log(userService.getSignedInUser());

      //HENTER BRUKERENS PERIODER
      calendarService.getUserPeriod(signedInUser.Medlemsnr, (result) => {
        let periodList = document.createElement('ul');
        periodList.id = "periodlist"
        let x = 0;
        let status = "Aktiv periode"
        for(let expertise of result) {
          let navn = document.createElement('li')
          let slutt = document.createElement('ul')

          if(result[x].Status == 1){
            status = "Prioritert Periode"
          }
          else if(result[x].Status == 3){
            status = "Uprioritert Periode"
          }
          let startPunkt = result[x].Startdato.getFullYear()+ '-' + result[x].Startdato.getMonth() + '-' + result[x].Startdato.getDate()
          let sluttPunkt = result[x].Sluttdato.getFullYear()+ '-' + result[x].Sluttdato.getMonth() + '-' + result[x].Sluttdato.getDate()
          navn.innerText = "Status: "+status+" Startdato: "+startPunkt
          slutt.innerText = "Sluttdato: "+sluttPunkt
          periodList.appendChild(navn)
          periodList.appendChild(slutt)
          x++
        }

        this.refs.periodeResult.appendChild(periodList)
      })

      //REGISTRER NY Periode
      this.refs.regButton.onclick = () => {
        console.log(this.refs.startdato.value+this.refs.sluttdato.value)
        calendarService.createUserPeriod(this.refs.startdato.value, this.refs.sluttdato.value,
          this.refs.status.value, signedInUser.Medlemsnr, (result) => {
            alert("Periode Registrert")
          })
      }


    }
  }

//#################SØK##################################################

  class Search extends React.Component {
    render() {
      return(
        <div id="content">
          <div>Søk på person:</div>
        <input type='text' ref='searchInput'></input>
        <button ref='searchButton'>Søk</button>
          <div>Personer funnet:
            <div ref="searchUserDiv"></div>
          </div>

        </div>
      )
    }

    componentDidMount() {
      let signedInUser = userService.getSignedInUser()
      let searchUserList = document.createElement('div')
      if(signedInUser.Administrator){
        this.refs.searchButton.onclick = () => {

          while (searchUserList.firstChild) {
            searchUserList.removeChild(searchUserList.firstChild);
          }
          userService.getUserSearch(this.refs.searchInput.value, result => {

            let y = 0;
            for(let user of result) {
              let userName = document.createElement('ul')
              userName.innerText = "Fornavn: "+result[y].Fornavn


              let userTlf = document.createElement('li')
              userTlf.innerText = "Tlf: "+result[y].Tlf

              let userId = document.createElement('li')
              userId.innerText = "Medlemsnr: "+result[y].Medlemsnr


              userName.appendChild(userTlf)
              userName.appendChild(userId)
              searchUserList.appendChild(userName)
              y++
            }

            this.refs.searchUserDiv.appendChild(searchUserList)
          })
        }
      }
      else{
        this.refs.searchButton.onclick = () => {

          while (searchUserList.firstChild) {
            searchUserList.removeChild(searchUserList.firstChild);
          }

          userService.getUserSearch(this.refs.searchInput.value, result => {
            let searchUserList = document.createElement('div')
            let y = 0;
            for(let user of result) {
              let userName = document.createElement('ul')
              userName.innerText = "Fornavn: "+result[y].Fornavn

              let userTlf = document.createElement('li')
              userTlf.innerText = "Tlf: "+result[y].Tlf

              userName.appendChild(userTlf)
              searchUserList.appendChild(userName)
              y++
            }

            this.refs.searchUserDiv.appendChild(searchUserList)
          })
        }
      }
  }
}

//#########################################################################

ReactDOM.render((
  <HashRouter>
    <div>
      <Menu />
      <Switch>
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signout' component={SignOut} />
        <Route exact path='/' component={Profile} />
        <Route exact path='/editProfile' component={EditProfile} />
        <Route exact path='/events' component={Events} />
        <Route exact path='/kalender' component={Kalender} />
        <Route exact path='/createevent' component={CreateEvent} />
        <Route exact path='/eventDetails' component={EventDetails} />

        <Route exact path='/search' component={Search} />
      </Switch>
    </div>
  </HashRouter>
), document.getElementById('root'));
