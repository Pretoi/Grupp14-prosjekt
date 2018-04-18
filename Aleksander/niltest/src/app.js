import * as React from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, HashRouter, Switch, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();
import { userService, eventService } from './services';

//#################MENY##################################################

class Menu extends React.Component {
  render() {
    let signedInUser = userService.getSignedInUser();
    //console.log(userService.getUserInfo(signedInUser.Email))
    //console.log(signedInUser.Administrator)

    if(signedInUser) {
      if(signedInUser.Administrator){
        return (
          <div id="test">
            <div>Du er logget inn som Administrator</div>
            <NavLink activeStyle={{color: 'green'}} exact to='/'>Profil</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/events'>Arrengement</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/signout'>Logg Ut</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/createevent'>Lag Arrangement</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/kalender'>Kalender</NavLink>{' '}
            <NavLink activeStyle={{color: 'green'}} to='/search'>Søk</NavLink>{' '}
          </div>
        );
      }
      return (
        <div>
          <NavLink activeStyle={{color: 'green'}} exact to='/'>Profil</NavLink>{' '}
          <NavLink activeStyle={{color: 'green'}} to='/events'>Arrangement</NavLink>{' '}
          <NavLink activeStyle={{color: 'green'}} to='/signout'>Logg Ut</NavLink>{' '}
          <NavLink activeStyle={{color: 'green'}} to='/kalender'>Kalender</NavLink>{' '}
          <NavLink activeStyle={{color: 'green'}} to='/search'>Søk</NavLink>{' '}
        </div>
      );
    }
    return (
      <div>
        <NavLink activeStyle={{color: 'green'}} to='/signin'>Sign In</NavLink>{' '}
        <NavLink activeStyle={{color: 'green'}} to='/signup'>Sign Up</NavLink>
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
      <form>
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

          <div>
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

    <div id="bodyDiv">
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

componentDidMount() {/*
  let signedInUser = userService.getSignedInUser();
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

  this.refs.editBtn.onclick = () => {
    history.push('/EditProfile')
  }
*/
}


}

//#################Rediger Profil##################################################
/*
class EditProfile extends React.Component {


  render() {

  return (

    <div>
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
  );
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
*/
//#################Events##################################################

class Events extends React.Component {

  render() {
    return(
      <div>
        <div>Arrengmenter:</div>
          <div ref="arrDiv"></div>

      </div>
    )
  }

  componentDidMount() {
    eventService.getEvents("t", result => {
      console.log(result)
      let arrList = [];
      let y = 0;
      for(let arr of result) {
        arrList.push(result[y].Arrnavn)
        y++
      }

      this.refs.arrDiv.innerText = arrList
    })
  }

}

//#################Create Event##################################################

class CreateEvent extends React.Component {
    render() {
      return (

          <div>
            <h1>Røde Kors</h1>

            <label><b>Arrangement_ID</b></label>
            <input type="number" ref="ArrId" placeholder="Arrangement ID" name="ArrId" required>
            </input>
            <br></br>
            <label><b>Arrengement Navn</b></label>
            <input type="text" ref="ArrNavn" placeholder="Arrengement Navn" name="ArrNavn" required>
            </input>
            <br></br>
            <label><b>Beskrivelse</b></label>
            <input type="text" ref="ArrBeskrivelse" placeholder="Arrengement beskrivelse" name="ArrBeskrivelse" required>
            </input>
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
            <input type="text" ref="ArrStart" name="ArrStart">
            </input>
            <br></br>
            <label><b>Sluttidspunkt</b></label>
            <input type="text" ref="ArrSlutt" placeholder="Slutt" name="ArrSlutt" required>
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
            <button ref="signUpButton">Registrer nytt arrengement</button>


          </div>

      )
    }

    componentDidMount() {

      this.refs.signUpButton.onclick = () => {

        userService.signUpAdress(this.refs.ArrPostnr.value, this.refs.ArrPostSted.value, (result) => {
            console.log("Adresse og postnr registrert")
          });

        eventService.createEvent(this.refs.ArrId.value, this.refs.ArrNavn.value, this.refs.ArrBeskrivelse.value,
          this.refs.ArrOppmotested.value, this.refs.ArrOppmotetid.value, this.refs.ArrStart.value,
          this.refs.ArrSlutt.value, this.refs.ArrPostSted.value, this.refs.ArrPostnr.value, (result) => {
            alert("Arrengement registrert")
            history.push('/signin');
        });
      }
    }
  }

  //#################Kalender##################################################

  class Kalender extends React.Component {
    render() {
      return(
        <div>
          <div ref="calendar" />
        </div>
      )
    }

    componentDidMount() {
      let settings = {};
      let events = [
        {'Date': new Date(2018, 3, 4), 'Title': 'Barnas dag 2018', 'Link': ''},
        {'Date': new Date(2018, 3, 7), 'Title': 'Konsert med M&M'},
        {'Date': new Date(2018, 4, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
        {'Date': new Date(2018, 4, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
      ];
      calendar(this.refs.calendar, events, settings);
      //console.log(userService.getSignedInUser());
    }
  }

//#################SØK##################################################

  class Search extends React.Component {
    render() {
      return(
        <div>
          <div>Søk på person:</div>
        <input type='text' ref='searchInput'></input>
        <button ref='searchButton'>Søk</button>
          <div>Personer funnet:
            <div ref="personList"></div>
          </div>

        </div>
      )
    }

    componentDidMount() {
      this.refs.searchButton.onclick = () => {
        //console.log(this.refs.searchInput.value)
        userService.getUserSearch(this.refs.searchInput.value, result => {
          //console.log(result)
          let userList = [];
          let y = 0;
          for(let user of result) {
            userList.push(" Fornavn: "+result[y].Fornavn+" Tlf: "+result[y].Tlf);
            y++
          }

          this.refs.personList.innerText = userList
        })
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
        <Route exact path='/search' component={Search} />
      </Switch>
    </div>
  </HashRouter>
), document.getElementById('root'));
