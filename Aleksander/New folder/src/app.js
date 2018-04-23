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
              <NavLink activeStyle={{color: 'white'}} exact to='/'>Profile</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: 'white'}} to='/events'>Arrengement</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: 'white'}} to='/createevent'>Lag Arrangement</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: 'white'}} to='/calendar'>Kalender</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: 'white'}} to='/search'>Søk</NavLink>{' '}
            </div>
            <div id="menuBtn">
              <NavLink activeStyle={{color: 'white'}} to='/signout'>Logg Ut</NavLink>{' '}
            </div>
          </div>
        )
      }
      return (
        <div id="header">
          <div id="menuBtn">
            <NavLink activeStyle={{color: 'white'}} exact to='/'>Profil</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: 'white'}} to='/events'>Arrengement</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: 'white'}} to='/calendar'>Kalender</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: 'white'}} to='/search'>Søk</NavLink>{' '}
          </div>
          <div id="menuBtn">
            <NavLink activeStyle={{color: 'white'}} to='/signout'>Logg Ut</NavLink>{' '}
          </div>
        </div>
      )
    }
    return (
      <div id="header">
        <div id="menuBtn">
          <NavLink activeStyle={{color: 'white'}} to='/signin'>Sign In</NavLink>{' '}
        </div>
        <div id="menuBtn">
          <NavLink activeStyle={{color: 'white'}} to='/signup'>Sign Up</NavLink>
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
        <img id="banner" src="rødekors_logo.jpg"/>
        <label><b>Epost-adresse</b></label>
        <input type="email" ref="signInMail" placeholder="Skriv epost-adresse" name="mail" required>
        </input>
        <label><b>Passord</b></label>
        <input type="password" ref="signInPsw" placeholder="Skriv passord" name="newPsw" required>
        </input>
        <br></br>
        <button ref="signInButton">Log inn</button>
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

  }
}

//#################SIGNUP##################################################

class SignUp extends React.Component {
    render() {
      return (
          <div id="content">
            <img id="banner" src="rødekors_logo.jpg"/>
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

          <div className="innerContentDiv">
            <b>Profilside til:</b>
            <div ref='fullNameDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='firstNameDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='lastNameDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='emailDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='tlfNmbDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='adresseDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='postnrDiv'></div>
          </div>
          <div className="innerContentDiv">
            <div ref='postStedDiv'></div>
          </div>
          <div className="innerContentDiv">
            <button ref="editBtn">Rediger Informasjon</button>
          </div>

        <div className="innerContentDiv">
          <h4>Kompetanse:</h4>
          <div ref='komp1Div'></div>
        </div>
        <div className="innerContentDiv">
          <button ref="editKompBtn">Legg til kompetanse</button>
        </div>

    </div>
  );
}

  componentDidMount() {

    userService.getAllMedlemsnr(null, (result) => {
      for (let numbers of result){
        console.log("Medlemsnr: "+result[numbers])
      }
      console.log("Alle medlemsnr:"+result)
    })

    let signedInUser = userService.getSignedInUser();
    if(signedInUser) {
      userService.getUserInfo(signedInUser.Email, (result) => {
        //console.log(result)
        this.refs.fullNameDiv.innerText = result.Fornavn + ' ' + result.Etternavn;
        this.refs.firstNameDiv.innerText = 'Fornavn: ' + result.Fornavn;
        this.refs.lastNameDiv.innerText = 'Etternavn: ' + result.Etternavn;
        this.refs.emailDiv.innerText = 'Email-adresse: ' + result.Email;
        this.refs.tlfNmbDiv.innerText = 'Telefonnummer: ' + result.Tlf;
        this.refs.adresseDiv.innerText = 'Adresse: ' + result.Adresse;
        this.refs.postnrDiv.innerText = 'Postnummer: ' + result.Postnr;
        this.refs.postStedDiv.innerText = 'Poststed: ' + result.Poststed;
      })

      userService.getUserExpertise(signedInUser.Medlemsnr, (result) => {
        let x = 0;
        for(let expertise of result) {
          let roleList = document.createElement('div')
          let roleElement = document.createElement('ul')
          let roleName = document.createElement('li')
          let kompetanse_ID = document.createElement('li')
          roleName.innerText = "Kompetanse: "+result[x].Rollenavn
          kompetanse_ID.innerText = "Kompetanse ID: "+result[x].Kompetanse_ID

          roleElement.appendChild(roleName)
          roleElement.appendChild(kompetanse_ID)
          roleList.appendChild(roleElement)

          this.refs.komp1Div.appendChild(roleList)
          x++
        }
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
        <button ref="saveButton">Legg til</button>
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
        let arrdato = document.createElement('li')
        let arrbeskrivelse = document.createElement('li')
        let knapp = document.createElement('BUTTON')
        knapp.onclick = function () {
          sendToEventDetails(arr.Arrangement_ID)
        }
        arrnavn.innerText = "Navn: "+result[y].Arrnavn
        let currentEventMonth = result[y].Dato.getMonth()
        currentEventMonth = parseInt(currentEventMonth)+1 //Må gjøre dette fordi getMonth henter verdier fra 0 til 11
        arrdato.innerText = "Dato: "+result[y].Dato.getFullYear()+ '-' + currentEventMonth + '-' + result[y].Dato.getDate()
        arrbeskrivelse.innerText = "Info: "+result[y].Beskrivelse
        knapp.innerText = "Mer info"
        arrnavn.appendChild(arrdato)
        arrnavn.appendChild(arrbeskrivelse)
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
        <div className='innerContentDiv'>
          <b>Navn:</b>
          <div ref="arrNavnDiv"></div>
        </div>
        <div className='innerContentDiv'>
          <b>Informasjon:</b>
          <div ref='arrInfoDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Dato:</b>
          <div ref='arrDatoDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Oppmøtetidspunkt:</b>
          <div ref='arrOppmøteDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Starttidspunkt:</b>
          <div ref='arrStartDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Slutttidspunkt:</b>
          <div ref='arrSluttDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Adresse:</b>
          <div ref='arrStedDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Postnummer:</b>
          <div ref='arrPostnrDiv'></div>
        </div>
        <div className='innerContentDiv'>
          <b>Poststed:</b>
          <div ref='arrPoststedDiv'></div>
        </div>

        <div className='innerContentDiv'>Medlemmer registrert i dette arrangementet:</div>
        <div ref="eventRolesDiv"></div>


        <div id="myModal" className="modal">

          <div className="modal-content">
            <span className="close">&times;</span>
            <div ref="testidid" id="testidmodal"></div>
            <ul ref="ledigePersonerUL" id="ledigePersonerUL"></ul>
          </div>

        </div>

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
        history.push('/editEvent')
      }
    }

    eventService.getEvent(currentArrID, (result) => {
      this.refs.arrNavnDiv.innerText = result.Arrnavn
      this.refs.arrInfoDiv.innerText = result.Beskrivelse
      this.refs.arrDatoDiv.innerText = result.Dato
      this.refs.arrOppmøteDiv.innerText = result.Oppmotetidsspunkt
      this.refs.arrStartDiv.innerText = result.Starttidspunkt
      this.refs.arrSluttDiv.innerText = result.Sluttidspunkt
      this.refs.arrStedDiv.innerText = result.Oppmotested
      this.refs.arrPostnrDiv.innerText = result.Postnr
      this.refs.arrPoststedDiv.innerText = result.Poststed

    })

    eventService.getEventRoles(currentArrID, (result) => {
      let x = 0

      for(let Arrangement_Rolle of result) {
        let arr_rolleID = Arrangement_Rolle.Arr_RolleID
        let medlemsnr = document.createElement('li')
        medlemsnr.innerText = "Medlemsnr: "+Arrangement_Rolle.Medlemsnr

        let roleName = document.createElement('li')
        roleName.className = "rolle"
        roleName.innerText = "Rollenavn:"+Arrangement_Rolle.Gitt_Rolle


        let updateButton = document.createElement('button');
        updateButton.setAttribute ("id", arr_rolleID)
        updateButton.setAttribute ("classname", "myModal")
        updateButton.onclick = function () {
          showModal(Arrangement_Rolle)
          }
        updateButton.innerHTML = 'Oppdater'
        let eventRoleElement = document.createElement('ul') //for hver rolle knyttet til bruker lages et element
        eventRoleElement.appendChild(roleName)
        eventRoleElement.appendChild(medlemsnr)
        eventRoleElement.appendChild(updateButton)

        this.refs.eventRolesDiv.appendChild(eventRoleElement);

      }

    })

    let modal = document.getElementById('myModal');
    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];


    // Når brukeren trykker på krysset, så lukkes den
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Når brukeren klikke utenfor modalen, så lukkes den
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function showModal(Arrangement_Rolle){

      while (ledigePersonerUL.firstChild) {
        ledigePersonerUL.removeChild(ledigePersonerUL.firstChild); //fjerner tidligere element i listen
      }
       modal.style.display = "block"; //viser modal
       document.getElementById('testidmodal').innerText = Arrangement_Rolle.Gitt_Rolle //viser valgt rolle til modal

       eventService.getAvailableUsers(currentArrID, result => {
         for(let Ledig_pers of result) {
           var ledigNavn = Ledig_pers.Fornavn
           var PersRolleID = Ledig_pers.Medlemsnr
           console.log(Ledig_pers.Rollenavn)
         if (Ledig_pers.Rollenavn == "Hjelpekorpsprøve") {
           if (Ledig_pers.Rollenavn == "Hjelpekorpsprøve" && Ledig_pers.Status) {
             let b = document.createElement('b');
             b.className = "rollePersoner"
           //  a.href = '#/personDetailsPage/' + personsIndex;
             b.textContent = ledigNavn;
             let VelgPerson = document.createElement('button');
             VelgPerson.setAttribute ("id", PersRolleID)

           /*  VelgPerson.onclick = function () {
               fjerndenne(Arrangement_Rolle);
             }*/
           //  openlist.setAttribute ("onclick", "fjerndenne()")
             VelgPerson.innerHTML = 'Velg';
             let li = document.createElement('li');
             li.appendChild(b);
             li.appendChild(VelgPerson);



             ledigePersonerUL.appendChild(li);
           }
         }else {
           console.log("LKOSKDO");


            }
          }
        });

   }

    /*
    eventService.getAvailableUsers(currentArrID, (result) => {
      let y = 0

      for(let roles of result) {
        if(result[y].Medlemsnr != null){
          console.log("Medlemsnr ikke knyttet til arr: "+result[y].Medlemsnr)
        }
        y++
      }
    })
    */

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
              <select name="typeArr" ref="rolleFordeling" id="arrType" onChange={() => {genererRolleMal()}}>
                  <option value="1">Festival</option>
                  <option value="2">Idretts arrangement</option>
                  <option value="3">Show</option>
                  <option value="4">Kurs/Opplæring</option>
                  <option value="5">Annet</option>
              </select>
            </div>
            <div>Lokasjon:
              <select name="plassArr" ref="rolleFordeling" id="arrLokasjon" onChange={() => {genererRolleMal()}}>
                  <option value="1">Storby</option>
                  <option value="2">Tettsted</option>
                  <option value="3">Fjell</option>
                  <option value="4">Utmark</option>
                  <option value="5">Kyst</option>
                  <option value="6">Annet</option>
              </select>
            </div>
            <label>Maks antall deltagere</label>
            <input type="number" ref="rolleFordeling" id="antallFolk" onChange={() => {genererRolleMal()}}></input>

            <div>Vaktleder</div><input ref="Vaktleder" id="Vaktleder" disabled="true"></input>
            <div>Sanitet</div><input ref="Sanitet" id="Sanitet"></input>
            <div>Scootersjåfør</div><input ref="Scootersjåfør" id="Scootersjåfør"></input>
            <div>Tre mann scooter</div><input ref="Tremannscooter" id="Tremannscooter"></input>
            <div>Ambulansemedhjelper</div><input ref="Ambulansemedhjelper" id="Ambulansemedhjelper"></input>
            <div>Ambulansesjåfør</div><input ref="Ambulansesjåfør" id="Ambulansesjåfør"></input>
            <div>Tre mann ambulanse</div><input ref="Tremannambulanse" id="Tremannambulanse"></input>
            <div>Båtfører</div><input ref="Båtfører" id="Båtfører"></input>
            <div>Båtmedhjelper</div><input ref="Båtmedhjelper" id="Båtmedhjelper"></input>
            <div>Båtmannskap</div><input ref="Båtmannskap" id="Båtmannskap"></input>
            <div>Scootermedhjelper</div><input ref="Scootermedhjelper" id="Scootermedhjelper"></input>
            <div>ATVfører</div><input ref="ATVfører" id="ATVfører"></input>
            <div>Distriktsensor</div><input ref="Distriktsensor" id="Distriktsensor"></input>
            <div>Under opplæring</div><input ref="Underopplæring" id="Underopplæring"></input>
            <div>Markør</div><input ref="Markør" id="Markør"></input>
            <button ref="signUpButton">Registrer nytt arrengement</button>
          </div>

      )
    }

    componentDidMount() {

      this.refs.Vaktleder.value = 1

      genererRolleMal()

      this.refs.signUpButton.onclick = () => {

        eventService.createEvent(this.refs.ArrId.value, this.refs.ArrNavn.value, this.refs.ArrDato.value, this.refs.ArrBeskrivelse.value,
          this.refs.ArrOppmotested.value, this.refs.ArrOppmotetid.value, this.refs.ArrStart.value,
          this.refs.ArrSlutt.value, this.refs.ArrPostSted.value, this.refs.ArrPostnr.value, (result) => {
            alert("Arrengement registrert")
            history.push('/signin')
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

function genererRolleMal(){

  let typeArra = document.getElementById('arrType').selectedIndex
  let folk = document.getElementById('antallFolk').value
  let stedArra = document.getElementById("arrLokasjon").selectedIndex
  let z = ""
  let Sanitet = 0
  let Scootersjåfør = 0
  let Tremannscooter = 0
  let Ambulansemedhjelper = 0
  let Ambulansesjåfør = 0
  let Tremannambulanse = 0
  let Båtfører = 0
  let Båtmedhjelper = 0
  let Båtmannskap = 0
  let Scootermedhjelper = 0
  let ATVfører = 0
  let Distriktsensor = 0
  let Underopplæring = 0
  let Markør = 0


  if (typeArra == 0) {
    z = 1.7
  } else if (typeArra == 1){
    z = 1.2
  } else if (typeArra == 2){
    z = 1
  } else if (typeArra == 3){
    Distriktsensor = 1
    z = 5
  } else {
    z = 1
  }

  if (folk > 200 && folk <= 400) {
    Sanitet = folk * 0.01 * z
  }else if (folk < 200){
   Sanitet = 2 * z

 }else if (folk > 400 && folk <= 999) {
   Sanitet = folk * 0.002 * z
   if (Sanitet < 2) {
    Sanitet = 2
   }
 } else if (folk > 999 && folk <= 5000) {
   Sanitet = folk * 0.0015 * z
   if (Sanitet < 4) {
    Sanitet = 4
   }
 } else if (folk > 5000) {
   Sanitet = folk * 0.0004 *z
   Ambulansesjåfør = 1;
   Ambulansemedhjelper = 1;
   Tremannambulanse = 1;
   if (Sanitet < 12) {
    Sanitet = 12
   }
 }

 if (stedArra == 0) {


 } else if (stedArra == 1) {

 } else if (stedArra == 2) {
   Scootersjåfør = 1;
   Scootermedhjelper = 1;
   Tremannscooter = 1;
 } else if (stedArra == 3) {
   ATVfører = 1;
 } else if (stedArra == 4) {
   Båtfører = 1;
   Båtmedhjelper = 1;
   Båtmannskap = 1;
 } else{

 }

 document.getElementById('Sanitet').value = Math.round(Sanitet)
 document.getElementById('Scootersjåfør').value = Math.round(Scootersjåfør)
 document.getElementById('Tremannscooter').value = Math.round(Tremannscooter);
 document.getElementById('Ambulansemedhjelper').value = Math.round(Ambulansemedhjelper);
 document.getElementById('Ambulansesjåfør').value = Math.round(Ambulansesjåfør);
 document.getElementById('Tremannambulanse').value = Math.round(Tremannambulanse);
 document.getElementById('Båtfører').value = Math.round(Båtfører);
 document.getElementById('Båtmedhjelper').value = Math.round(Båtmedhjelper);
 document.getElementById('Båtmannskap').value = Math.round(Båtmannskap);
 document.getElementById('Scootermedhjelper').value = Math.round(Scootermedhjelper);
 document.getElementById('ATVfører').value = Math.round(ATVfører);
 document.getElementById('Distriktsensor').value = Math.round(Distriktsensor);
 document.getElementById('Underopplæring').value = Math.round(Underopplæring);
 document.getElementById('Markør').value = Math.round(Markør);

}

//#################EDIT EVENT##################################################
class EditEvent extends React.Component {
  render() {
    return (
        <div id="content">

          <label><b>Arrengement Navn</b></label>
          <input type="text" ref="arrNavnDiv" placeholder="Arrengement Navn" name="ArrNavn" required>
          </input>
          <br></br>
          <label><b>Dato</b></label>
          <input ref="arrDatoDiv" placeholder="Arrengement Dato" name="ArrDato" required>
          </input>
          <br></br>
          <label><b>Beskrivelse</b></label>
          <textarea ref="arrInfoDiv" placeholder="Arrengement beskrivelse" name="ArrBeskrivelse" required>
          </textarea>
          <br></br>
          <label><b>Oppmøtested</b></label>
          <input type="text" ref="arrStedDiv" placeholder="Sted" name="ArrOppmotested" required>
          </input>
          <br></br>
          <label><b>Oppmøtetidspunkt</b></label>
          <input type="time" ref="arrOppmoteDiv" placeholder="Tid" name="ArrOppmotetid" required>
          </input>
          <br></br>
          <label><b>Starttidspunkt</b></label>
          <input type="time" ref="arrStartDiv" name="ArrStart">
          </input>
          <br></br>
          <label><b>Sluttidspunkt</b></label>
          <input type="time" ref="arrSluttDiv" placeholder="Slutt" name="ArrSlutt" required>
          </input>
          <br></br>
          <label><b>Poststed</b></label>
          <input type="text" ref="arrPoststedDiv" placeholder="Skriv poststed" name="ArrPoststed" required>
          </input>
          <br></br>
          <label><b>Postnummer</b></label>
          <input type="number" ref="arrPostnrDiv" placeholder="Skriv postnummer" name="ArrPostnr" required>
          </input>
          <br></br>

          <div>Vaktleder</div><input ref="Vaktleder" id="Vaktleder" disabled="true"></input>
          <div>Sanitet registrert:</div>
            <input ref="Sanitet" id="Sanitet" disabled="true"></input>
            <input ref="SanitetNew" id="SanitetNew" placeholder="Legg til/fjern"></input>
            <select ref="updateSanitetStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Scootersjåfør registrert:</div>
            <input type="number" ref="Scootersjåfør" id="Scootersjåfør" disabled="true"></input>
            <input ref="ScootersjåførNew" id="ScootersjåførNew" placeholder="Legg til/fjern"></input>
            <select ref="updateScootersjåførStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Tre mann scooter registrert:</div>
            <input type="number" ref="Tremannscooter" id="Tremannscooter" disabled="true"></input>
            <input ref="TremannscooterNew" id="TremannscooterNew" placeholder="Legg til/fjern"></input>
            <select ref="updateTremannscooterStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Ambulansemedhjelper registrert:</div>
            <input type="number" ref="Ambulansemedhjelper" id="Ambulansemedhjelper" disabled="true"></input>
            <input ref="AmbulansemedhjelperNew" id="AmbulansemedhjelperNew" placeholder="Legg til/fjern"></input>
            <select ref="updateAmbulansemedhjelperStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Ambulansesjåfør registrert:</div>
            <input type="number" ref="Ambulansesjåfør" id="Ambulansesjåfør" disabled="true"></input>
            <input ref="AmbulansesjåførNew" id="AmbulansesjåførNew" placeholder="Legg til/fjern"></input>
            <select ref="updateAmbulansesjåførStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Tre mann ambulanse registrert:</div>
            <input type="number" ref="Tremannambulanse" id="Tremannambulanse" disabled="true"></input>
            <input ref="TremannambulanseNew" id="TremannambulanseNew" placeholder="Legg til/fjern"></input>
            <select ref="updateTremannambulanseStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Båtfører registrert:</div>
            <input type="number" ref="Båtfører" id="Båtfører" disabled="true"></input>
            <input ref="BåtførerNew" id="BåtførerNew" placeholder="Legg til/fjern"></input>
            <select ref="updateBåtførerStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Båtmedhjelper registrert:</div>
            <input type="number" ref="Båtmedhjelper" id="Båtmedhjelper" disabled="true"></input>
            <input ref="BåtmedhjelperNew" id="BåtmedhjelperNew" placeholder="Legg til/fjern"></input>
            <select ref="updateBåtmedhjelperStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Båtmannskap registrert:</div>
            <input type="number" ref="Båtmannskap" id="Båtmannskap" disabled="true"></input>
            <input ref="BåtmannskapNew" id="BåtmannskapNew" placeholder="Legg til/fjern"></input>
            <select ref="updateBåtmannskapStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Scootermedhjelper registrert:</div>
            <input type="number" ref="Scootermedhjelper" id="Scootermedhjelper" disabled="true"></input>
            <input ref="ScootermedhjelperNew" id="ScootermedhjelperNew" placeholder="Legg til/fjern"></input>
            <select ref="updateScootermedhjelperStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>ATVfører registrert:</div>
            <input type="number" ref="ATVfører" id="ATVfører" disabled="true"></input>
            <input ref="ATVførerNew" id="ATVførerNew" placeholder="Legg til/fjern"></input>
            <select ref="updateATVførerStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Distriktsensor registrert:</div>
            <input type="number" ref="Distriktsensor" id="Distriktsensor" disabled="true"></input>
            <input ref="DistriktsensorNew" id="DistriktsensorNew" placeholder="Legg til/fjern"></input>
            <select ref="updateDistriktsensorStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Under opplæring registrert:</div>
            <input type="number" ref="Underopplæring" id="Underopplæring" disabled="true"></input>
            <input ref="UnderopplæringNew" id="UnderopplæringNew" placeholder="Legg til/fjern"></input>
            <select ref="updateUnderopplæringStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <div>Markør registrert:</div>
            <input type="number" ref="Markør" id="Markør"></input>
            <input ref="MarkørNew" id="MarkørNew" placeholder="Legg til/fjern"></input>
            <select ref="updateMarkørStatus">
              <option value='add'>Legg til antall</option>
              <option value='remove'>Fjern antall</option>
            </select>
          <button ref="updateButton">Oppdater informasjon</button>
        </div>

    )
  }
  componentDidMount(){
    let currentArrID = localStorage.getItem("current_arrID")
    console.log("ArrID:"+currentArrID)

    eventService.getEvent(currentArrID, (result) => {
      console.log(result.Arrnavn)
      this.refs.arrNavnDiv.value = result.Arrnavn
      this.refs.arrInfoDiv.value = result.Beskrivelse
      this.refs.arrDatoDiv.value = result.Dato.getFullYear()+ '-' + result.Dato.getMonth() + '-' + result.Dato.getDate()
      this.refs.arrStedDiv.value = result.Oppmotested
      this.refs.arrOppmoteDiv.valye = result.Oppmotetidsspunkt
      this.refs.arrStartDiv.value = result.Starttidspunkt
      this.refs.arrSluttDiv.value = result.Sluttidspunkt
      this.refs.arrPostnrDiv.value = result.Postnr
      this.refs.arrPoststedDiv.value = result.Poststed
    })

    eventService.getEventRoles(currentArrID, (result) => {
      let x = 0

      for(let roles of result) {

        if (this.refs.Vaktleder.id == result[x].Gitt_Rolle) {
          this.refs.Vaktleder.value ++
        }
        else if (this.refs.Sanitet.id == result[x].Gitt_Rolle) {
          this.refs.Sanitet.value ++
        }
        else if (this.refs.Scootersjåfør.id == result[x].Gitt_Rolle) {
          this.refs.Scootersjåfør.value ++
        }
        else if ('3-mann scooter' == result[x].Gitt_Rolle) {
          this.refs.Tremannscooter.value ++
        }
        else if (this.refs.Ambulansemedhjelper.id == result[x].Gitt_Rolle) {
          this.refs.Ambulansemedhjelper.value ++
        }
        else if (this.refs.Ambulansesjåfør.id == result[x].Gitt_Rolle) {
          this.refs.Ambulansesjåfør.value ++
        }
        else if ('3-mann ambulanse' == result[x].Gitt_Rolle) {
          this.refs.Tremannambulanse.value ++
        }
        else if (this.refs.Båtfører.id == result[x].Gitt_Rolle) {
          this.refs.Båtfører.value ++
        }
        else if (this.refs.Båtmedhjelper.id == result[x].Gitt_Rolle) {
          this.refs.Båtmedhjelper.value ++
        }
        else if (this.refs.Båtmannskap.id == result[x].Gitt_Rolle) {
          this.refs.Båtmannskap.value ++
        }
        else if (this.refs.Scootermedhjelper.id == result[x].Gitt_Rolle) {
          this.refs.Scootermedhjelper.value ++
        }
        else if ('ATV-fører' == result[x].Gitt_Rolle) {
          this.refs.ATVfører.value ++
        }
        else if ('Distriktsensor' == result[x].Gitt_Rolle) {
          this.refs.Distriktsensor.value ++
        }
        else if ('Under opplæring' == result[x].Gitt_Rolle) {
          this.refs.Underopplæring.value ++
        }
        else if (this.refs.Markør.id == result[x].Gitt_Rolle) {
          this.refs.Markør.value ++
        }
        x++
      }

    })

    //################OPPDATER ARRANGMENET SPØRRINGER###############################
    this.refs.updateButton.onclick = () => {

      eventService.updateEvent(currentArrID, this.refs.arrNavnDiv.value, this.refs.arrDatoDiv.value, this.refs.arrInfoDiv.value,
        this.refs.arrStedDiv.value, this.refs.arrOppmoteDiv.value, this.refs.arrStartDiv.value,
        this.refs.arrSluttDiv.value, this.refs.arrPostnrDiv.value, this.refs.arrPoststedDiv.value, (result) => {
          alert("Arrengement oppdatert")
          history.push('/signin')
      })

      //###########################################################################################

      //Registrer antall Sanitet
      if (this.refs.SanitetNew.value != 0){
        let m = this.refs.SanitetNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Sanitet', (result) => {
            console.log("Sanitet til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Scootersjåfør
      if (this.refs.ScootersjåførNew.value != 0){
        let m = this.refs.ScootersjåførNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Scootersjåfør', (result) => {
            console.log("Scootersjåfør til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Tre-mann-scooter
      if (this.refs.TremannscooterNew.value != 0){
        let m = this.refs.TremannscooterNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'3-mann scooter', (result) => {
            console.log("3-mann scooter til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Ambulansemedhjelper
      if (this.refs.AmbulansemedhjelperNew.value != 0){
        let m = this.refs.AmbulansemedhjelperNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Ambulansemedhjelper', (result) => {
            console.log("Ambulansemedhjelper til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Ambulansesjåfør
      if (this.refs.AmbulansesjåførNew.value != 0){
        let m = this.refs.AmbulansesjåførNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Ambulansesjåfør', (result) => {
            console.log("Ambulansesjåfør til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Tremannambulanse
      if (this.refs.TremannambulanseNew.value != 0){
        let m = this.refs.TremannambulanseNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'3-mann ambulanse', (result) => {
            console.log("3-mann ambulanse til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Båtfører
      if (this.refs.BåtførerNew.value != 0){
        let m = this.refs.BåtførerNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Båtfører', (result) => {
            console.log("Båtfører til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Båtmedhjelper
      if (this.refs.BåtmedhjelperNew.value != 0){
        let m = this.refs.BåtmedhjelperNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Båtmedhjelper', (result) => {
            console.log("Båtmedhjelper til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Båtmannskap
      if (this.refs.BåtmannskapNew.value != 0){
        let m = this.refs.BåtmannskapNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Båtmannskap', (result) => {
            console.log("Båtmannskap til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Scootermedhjelper
      if (this.refs.ScootermedhjelperNew.value != 0){
        let m = this.refs.ScootermedhjelperNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Scootermedhjelper', (result) => {
            console.log("Scootermedhjelper til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall ATV-fører
      if (this.refs.ATVførerNew.value != 0){
        let m = this.refs.ATVførerNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'ATV-fører', (result) => {
            console.log("ATV-fører til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Distriktsensor
      if (this.refs.DistriktsensorNew.value != 0){
        let m = this.refs.DistriktsensorNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Distriktsensor', (result) => {
            console.log("Distriktsensor til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Under opplæring
      if (this.refs.UnderopplæringNew.value != 0){
        let m = this.refs.UnderopplæringNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Under opplæring', (result) => {
            console.log("Under opplæring til arrangement registrert")
          })
          i++
        }
      }
      //Registrer antall Markør
      if (this.refs.MarkørNew.value != 0){
        let m = this.refs.MarkørNew.value
        let i = 0
        while (i<m){
          eventService.createEventRoles(null,currentArrID,null,'Markør', (result) => {
            console.log("Markør til arrangement registrert")
          })
          i++
        }
      }

      //###########################################################################################

    }
  }
}

//#################Kalender##################################################

class Calendar extends React.Component {

  render() {

    return(
      <div>
        <div id="content">
          <div ref="calendar" />
        </div>
        <div>
            <div id="periodList" ref="periodeResult"></div>

            <div ref="arrDiv">
            </div>

            <div>
                <div>Registrer ny periode</div>
              <ul>
                <li>Startdato: <input type='date' ref='startdato' /></li>
                <li>Sluttdato: <input type='date' ref='sluttdato' /></li>
                <li>Status:
                <select ref='status'>
                  <option value='0'>Passiv</option>
                  <option value='1'>Aktiv</option>
                </select>
                </li>
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
        {'Date': new Date(2018, 3, 4), 'Title': 'Barnas dag 2018', 'Link': ''}
      ];

      let eventDateCalendar = 0
      let eventDateCalendarList = []
      let eventMonthDatabase = 0 //Måndte må lagres og gjøres om til int, fordi de i kalender appen starter på 0
      let tittel = ''
      let tittelListe = []

      for (let events in result){

        eventMonthDatabase = result[events].Dato.getMonth()
        eventMonthDatabase = parseInt(eventMonthDatabase)+1
        tittel = result[events].Arrnavn
        eventDateCalendar = result[events].Dato.getFullYear()+ ',' + eventMonthDatabase + ',' + result[events].Dato.getDate()
        eventDateCalendarList.push(eventDateCalendar)
        tittelListe.push(tittel)

      }
      for (let i in eventDateCalendarList){
        //console.log("Datoliste:"+eventDateCalendarList[i])
        events.push({'Date': new Date(eventDateCalendarList[i]), 'Title': tittelListe[i], 'Link': function(){history.push('/search')}})
      }
      calendar(this.refs.calendar, events, settings)
    })

    function sendToEventDetails(arrnavn) {
      console.log("Hey")

    }


    //HENTER BRUKERENS PERIODER
    calendarService.getUserPeriod(signedInUser.Medlemsnr, (result) => {
      let periodList = document.createElement('ul');
      periodList.id = "periodlist"
      let x = 0;
      let status = "Aktiv periode"
      for(let expertise of result) {
        let periodElement = document.createElement('ul')
        let navn = document.createElement('li')
        let slutt = document.createElement('li')

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
        <Route exact path='/calendar' component={Calendar} />
        <Route exact path='/createevent' component={CreateEvent} />
        <Route exact path='/editEvent' component={EditEvent} />
        <Route exact path='/eventDetails' component={EventDetails} />
        <Route exact path='/search' component={Search} />
      </Switch>
    </div>
  </HashRouter>
), document.getElementById('root'));
