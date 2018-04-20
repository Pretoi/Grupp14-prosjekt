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
    }
  }
}

//#################SIGNUP##################################################

class SignUp extends React.Component {
    render() {
      return (
          <div id="content">
            <h1>Røde Kors</h1>
            <form>
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
            <label><b>Poststed</b></label>
            <input type="text" ref="signUpPoststed" placeholder="Skriv poststed" name="poststed" required>
            </input>
            <br></br>
            </form>
            <button ref="signUpButton">Registrer ny bruker</button>

          </div>

      )
    }

    componentDidMount() {

      this.refs.signUpButton.onclick = () => {
        alert(this.refs.Båtmannskap.value)
        userService.signUpAdress(this.refs.signUpPostnr.value, this.refs.signUpPoststed.value, (result) => {
            alert("Du har nå registrert deg")
            });

        userService.signUp(this.refs.signUpName.value, this.refs.signUpSurname.value, this.refs.signUpPsw.value,
          this.refs.signUpMail.value, this.refs.signUpPhone.value, this.refs.signUpAddress.value,
          this.refs.signUpPostnr.value, this.refs.signUpPoststed.value, (result) => {
            alert("Du har nå registrert deg")
            history.push('/signin')
        })

        userService.createUserExpertise()
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
      <div>
        <button ref="editKompBtn">Legg til kompetanse</button>
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

  this.refs.editKompBtn.onclick = () => {
    history.push('/EditExpertise')
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
  let signedInUser = userService.getSignedInUser()
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
  }

}

}

//#################Rediger Kompetanse##################################################

class EditExpertise extends React.Component {

  render(){
    return(

      <div id="content">
        <div ref="headInfo"></div>
        <div ref="expertiseDiv"></div>
        <div>Legg til kompetanse</div>
        <select ref="selectExpertise">
          <option value="Ambulansesertifisering">Ambulansesertifisering</option>
          <option value="Båtførerprøven">Båtførerprøven</option>
          <option value="Distriktsensorkurs">Distriktsensorkurs</option>
          <option value="Førerkort 160 utrykningskjøring">Førerkort 160 utrykningskjøring</option>
          <option value="Førerkort BE tilhenger">Førerkort BE tilhenger</option>
          <option value="Førerkort S snøscooter">Førerkort S snøscooter</option>
          <option value="Hjelpekorpsprøve">Hjelpekorsprøve</option>
          <option value="Kvalifisert ATV kurs">Kvalifisert ATV kurs</option>
          <option value="Hjelpekorpsprøve">Hjelpekorsprøve</option>
          <option value="Kvalifisert kurs søk og redning">Kvalifisert kurs søk og redning</option>
          <option value="Kvalifisert kurs søk og redning sommer">Kvalifisert kurs søk og redning sommer</option>
          <option value="Kvalifisert kurs søk og redning vinter">Kvalifisert kurs søk og redning vinter</option>
          <option value="Kvalifisert sjøredningskurs">Kvalifisert sjøredningskurs</option>
          <option value="Kvalifisert snøscooterkurs">Kvalifisert snøscooterkurs</option>
          <option value="Maritimt VHF Sertifikat">Maritimt VHF Sertifikat</option>
          <option value="Vaktlederkurs">Vaktlederkurs</option>
          <option value="Videregående førstehjelpskurs">Videregående førstehjelpskurs</option>
          <option value="Videregående sjøredningskurs">Videregående sjøredningskurs</option>

        </select>
        <button ref="saveButton">Lagre Informasjon</button>
      </div>

    )
  }

  componentDidMount(){


    let signedInUser = userService.getSignedInUser()
    this.refs.headInfo.innerText = "Registrert kompetanse for: "+signedInUser.Fornavn+" "+signedInUser.Etternavn

    userService.getUserExpertise(signedInUser.Medlemsnr, (result) => {
      let x = 0

      for(let expertise of result) {
        let roleList = document.createElement('div')
        let roleElement = document.createElement('ul')
        let roleName = document.createElement('li')
        let kompetanse_ID = document.createElement('li')
        roleName.innerText = "Rollenavn: "+result[x].Rollenavn
        kompetanse_ID.innerText = "Kompetanse ID: "+result[x].Kompetanse_ID

        roleElement.appendChild(roleName)
        roleElement.appendChild(kompetanse_ID)
        roleList.appendChild(roleElement)

        this.refs.expertiseDiv.appendChild(roleList)
        x++
      }

    })

    this.refs.saveButton.onclick = () => {
      let selectedExpertise = this.refs.selectExpertise.value
      let selectedExpertiseID = 0

      userService.getExpertiseID(selectedExpertise, (result) => {
        let signedInUser = userService.getSignedInUser()


        selectedExpertiseID = result[0].Kompetanse_ID


        userService.createUserExpertise(signedInUser.Medlemsnr, selectedExpertiseID, selectedExpertise, result => {
          history.push('/');
        })

      })

    }

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
          sendToEventDetails(arr.Arrangement_ID)
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
    })

    function sendToEventDetails(arrnavn) {
      localStorage.setItem("current_arrID", arrnavn)
      history.push('/eventDetails')
    }
    console.log("Medlemsnr: "+signedInUser.Medlemsnr)

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
      <div id="content">
        <div ref="arrNavnDiv"></div>
        <div ref='arrInfoDiv'></div>
        <div ref='arrDatoDiv'></div>
        <div ref='arrLocationDiv'></div>
        <div ref='arrStartDiv'></div>
        <div ref='arrSluttDiv'></div>
        <div ref='arrPostnrDiv'></div>
        <div ref='arrPoststedDiv'></div>

        <div ref="eventRolesDIV"></div>

        <div ref='adminBtnDiv'></div>
      </div>
    )
  }
  componentDidMount(){
    let signedInUser = userService.getSignedInUser()
    let currentArrID = localStorage.getItem("current_arrID")

    if(signedInUser.Administrator){
      let editEventBtn = document.createElement('Button')
      editEventBtn.innerText = "Rediger Arrangement"
      this.refs.adminBtnDiv.appendChild(editEventBtn)
      editEventBtn.onclick = function () {
        console.log(currentArrID)
        //sendToEditEvent(currentArrId)
      }
    }

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
      let x = 0

      for(let roles of result) {
        let roleList = document.createElement('div')
        let roleElement = document.createElement('ul')
        let medlemsnr = document.createElement('li')
        let gitt_rolle = document.createElement('li')
        medlemsnr.innerText = "Medlemsnr: "+result[x].Medlemsnr
        gitt_rolle.innerText = "Rolletittel: "+result[x].Gitt_Rolle

        roleElement.appendChild(medlemsnr)
        roleElement.appendChild(gitt_rolle)
        console.log(roleElement)
        roleList.appendChild(roleElement)
        this.refs.eventRolesDIV.appendChild(roleList)
        x++
      }
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
            <label><b>Dato</b></label>
            <input type="date" ref="ArrDato" placeholder="Arrengement Dato" name="ArrDato" required>
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
            <input type="number" ref="ArrOppmotetid" placeholder="Tid" name="ArrOppmotetid" required>
            </input>
            <br></br>
            <label><b>Starttidspunkt</b></label>
            <input type="number" ref="ArrStart" name="ArrStart">
            </input>
            <br></br>
            <label><b>Sluttidspunkt</b></label>
            <input type="number" ref="ArrSlutt" placeholder="Slutt" name="ArrSlutt" required>
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
            <label><b>Registrer antall roller på arrangementet:</b></label>
            <br></br>

            <div ref="vaktmal"></div>

            <div>Vaktleder</div><input ref="Vaktleder"></input>
            <div>Sanitet</div><input ref="Sanitet"></input>
            <div>Scootersjåfør</div><input ref="Scootersjåfør"></input>
            <div>Tre mann scooter</div><input ref="Tremannscooter"></input>
            <div>Ambulansemedhjelper</div><input ref="Ambulansemedhjelper"></input>
            <div>Ambulansesjåfør</div><input ref="Ambulansesjåfør"></input>
            <div>Tre mann ambulanse</div><input ref="Tremannambulanse"></input>
            <div>Båtfører</div><input ref="Båtfører"></input>
            <div>Båtmedhjelper</div><input ref="Båtmedhjelper"></input>
            <div>Båtmannskap</div><input ref="Båtmannskap"></input>
            <div>Scootermedhjelper</div><input ref="Scootermedhjelper"></input>
            <div>ATVfører</div><input ref="ATVfører"></input>
            <div>Distriktsensor</div><input ref="Distriktsensor"></input>
            <div>Under opplæring</div><input ref="Underopplæring"></input>
            <div>Markør</div><input ref="Markør"></input>
            <button ref="signUpButton">Registrer nytt arrengement</button>
          </div>

      )
    }

    componentDidMount() {

      this.refs.signUpButton.onclick = () => {

        eventService.createEvent(this.refs.ArrId.value, this.refs.ArrNavn.value, this.refs.ArrDato.value, this.refs.ArrBeskrivelse.value,
          this.refs.ArrOppmotested.value, this.refs.ArrOppmotetid.value, this.refs.ArrStart.value,
          this.refs.ArrSlutt.value, this.refs.ArrPostSted.value, this.refs.ArrPostnr.value, (result) => {
            alert("Arrengement registrert")
            history.push('/signin');
        })

        //###########################################################################################

        //Registrer alltid 1 vaktleder
        eventService.createEventRoles(null,this.refs.ArrId.value,null,'Vaktleder', (result) => {
          console.log("Vaktleder til arrangement registrert")
        })
        //Registrer antall Sanitet
        if (this.refs.Sanitet.value != 0){
          let m = this.refs.Sanitet.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Sanitet', (result) => {
              console.log("Sanitet til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Scootersjåfør
        if (this.refs.Scootersjåfør.value != 0){
          let m = this.refs.Scootersjåfør.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Scootersjåfør', (result) => {
              console.log("Scootersjåfør til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Tre-mann-scooter
        if (this.refs.Tremannscooter.value != 0){
          let m = this.refs.Tremannscooter.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'3-mann scooter', (result) => {
              console.log("3-mann scooter til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Ambulansemedhjelper
        if (this.refs.Ambulansemedhjelper.value != 0){
          let m = this.refs.Ambulansemedhjelper.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Ambulansemedhjelper', (result) => {
              console.log("Ambulansemedhjelper til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Ambulansesjåfør
        if (this.refs.Ambulansesjåfør.value != 0){
          let m = this.refs.Ambulansesjåfør.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Ambulansesjåfør', (result) => {
              console.log("Ambulansesjåfør til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Tremannambulanse
        if (this.refs.Tremannambulanse.value != 0){
          let m = this.refs.Tremannambulanse.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'3-mann ambulanse', (result) => {
              console.log("3-mann ambulanse til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Båtfører
        if (this.refs.Båtfører.value != 0){
          let m = this.refs.Båtfører.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Båtfører', (result) => {
              console.log("Båtfører til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Båtmedhjelper
        if (this.refs.Båtmedhjelper.value != 0){
          let m = this.refs.Båtmedhjelper.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Båtmedhjelper', (result) => {
              console.log("Båtmedhjelper til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Båtmannskap
        if (this.refs.Båtmannskap.value != 0){
          let m = this.refs.Båtmannskap.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Båtmannskap', (result) => {
              console.log("Båtmannskap til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Scootermedhjelper
        if (this.refs.Scootermedhjelper.value != 0){
          let m = this.refs.Scootermedhjelper.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Scootermedhjelper', (result) => {
              console.log("Scootermedhjelper til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall ATV-fører
        if (this.refs.ATVfører.value != 0){
          let m = this.refs.ATVfører.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'ATV-fører', (result) => {
              console.log("ATV-fører til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Distriktsensor
        if (this.refs.Distriktsensor.value != 0){
          let m = this.refs.Distriktsensor.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Distriktsensor', (result) => {
              console.log("Distriktsensor til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Under opplæring
        if (this.refs.Underopplæring.value != 0){
          let m = this.refs.Underopplæring.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Under opplæring', (result) => {
              console.log("Under opplæring til arrangement registrert")
            })
            i++
          }
        }
        //Registrer antall Markør
        if (this.refs.Markør.value != 0){
          let m = this.refs.Markør.value
          let i = 0
          while (i<m){
            eventService.createEventRoles(null,this.refs.ArrId.value,null,'Markør', (result) => {
              console.log("Markør til arrangement registrert")
            })
            i++
          }
        }

        //###########################################################################################

      }

    }
  }
//#################EDIT EVENT##################################################
class EditEvent extends React.Component {
  render(){
    return(
      <div></div>
    )
  }
  componentDidMount(){

  }
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
        <Route exact path='/editExpertise' component={EditExpertise} />
        <Route exact path='/events' component={Events} />
        <Route exact path='/kalender' component={Kalender} />
        <Route exact path='/createevent' component={CreateEvent} />
        <Route exact path='/eventDetails' component={EventDetails} />
        <Route exact path='/search' component={Search} />
      </Switch>
    </div>
  </HashRouter>
), document.getElementById('root'));
