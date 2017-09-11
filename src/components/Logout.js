import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {fbapp} from '../index.js'

class Logout extends Component {
    constructor(){
        super();
        this.state = {
            redirect:false
        }
    }
    componentWillMount(){
        fbapp.auth().signOut().then((user)=>{
            this.setState({redirect: true})
        })
    }
    render(){
        
        if(this.state.redirect === true){
            return <Redirect to="/" />
        }
        return (
            <div style={{textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
            <h3 className="accountNote animated bounce infinite">Logging Out</h3>
            
            </div>
        )
    
    }
}

export default Logout