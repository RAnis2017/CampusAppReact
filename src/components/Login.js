import React, { Component } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Link} from 'react-router-dom'
import {fbapp,facebookProvider} from '../index.js';
class Login extends Component {
  
  constructor(props) {
    
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.state = {
      
      redirect: false,
      users: [
       
      ],
    };
  }
  authWithFacebook(){
    fbapp.auth().signInWithPopup(facebookProvider)
    .then((result, error) => {
      if(error){
        this.toaster.innerText = "Unable to Sign-In with Facebook"
      }
      else {
        this.setState({ redirect: true })
      }
    })
  }
  authWithEmailPassword(event){
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value

    fbapp.auth().fetchProvidersForEmail(email)
    .then((providers) => {
      if(providers.length === 0){
        return fbapp.auth().createUserWithEmailAndPassword(email,password)
      }
      else if (providers.indexOf("password") === -1){
        //they used facebook
        this.loginForm.reset()
        this.toaster.innerText = "Try alternative login."
      }
      else{
        return fbapp.auth().signInWithEmailAndPassword(email,password)
      }
    })
    .then((user)=>{
      if(user && user.email){
        this.loginForm.reset()
        this.setState({redirect:true})
      }
    })
    .catch((error)=>{
      this.toaster.innerText= error.message
    })
  }
  render() {
    if(this.state.redirect === true){
      return <Redirect to='/TodoApp' />
    }
    return (
      
      <div className="App loginbg">
        <div className="bg_overlay">
            <div className="row">
                    <div className="col-lg-6 midcontent">
                        <div className="loginform">
                        <section>
                                <div className="card logincard" >
                                        <div className="card-body">
                                        
                                            <form onSubmit={(event)=>{this.authWithEmailPassword(event)}} ref={(form)=>{this.loginForm = form}} >
                                                <div className="form-header default-color">
                                                    <h3><i className="fa fa-lock"></i> Campus Login:</h3>
                                                </div>
                                                <div className="md-form">
                                                    <i className="fa prefix grey-text">FN</i>
                                                    <input type="text" id="defaultForm-fname" className="form-control" name="fname" ref={(input) => {this.fnameInput = input }} />
                                                    <label for="defaultForm-fname"> Your First Name</label>
                                                </div>
                                                <div className="md-form">
                                                    <i className="fa prefix grey-text">LN</i>
                                                    <input type="text" id="defaultForm-lname" className="form-control" name="lname" ref={(input) => {this.lnameInput = input }} />
                                                    <label for="defaultForm-lname"> Your Last Name</label>
                                                </div>
                                                <div className="md-form">
                                                    <i className="fa prefix grey-text">@</i>
                                                    <input type="email" id="defaultForm-email" className="form-control" name="email" ref={(input) => {this.emailInput = input }} />
                                                    <label for="defaultForm-email"> Your email</label>
                                                </div>
                            
                                                <div className="md-form">
                                                    <i className="fa prefix grey-text">$*</i>
                                                    <input type="password" id="defaultForm-pass" className="form-control" name="password" ref={(input) => {this.passwordInput = input }}/>
                                                    <label for="defaultForm-pass">Your password</label>
                                                </div>
                                                <RadioButtonGroup name="role" defaultSelected="student">
                                                <RadioButton
                                                  value="student"
                                                  label="Student"
                                                  style={styles.radioButton}
                                                />
                                                <RadioButton
                                                value="company"
                                                label="Company"
                                                style={styles.radioButton}
                                                />
                                                <RadioButton
                                                value="admin"
                                                label="Admin"
                                                style={styles.radioButton}
                                                />
                                                </RadioButtonGroup>
                                                <div className="text-center">
                                                    <h5 className="accountNote" ref={(element)=>{this.toaster = element}}></h5>
                                                    <button type="submit" className="btn btn-default waves-effect waves-light">Login</button>
                                                    <h5 className="accountNote">Don't have an account already? <Link className="signuplink" to="/signup" aria-label="Log In">Sign Up</Link> Now.
                                                    </h5>
                                                </div>
                                            </form>
                                            <div className="text-center">
                                            <button className="btn btn-default waves-effect waves-light" onClick={()=> { this.authWithFacebook()}} >Facebook Login</button>
                                            </div>
                                        </div>
                        
                                        
                                    </div>
                        
                        
                                </section>
                        </div>    
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
  };

export default Login;
