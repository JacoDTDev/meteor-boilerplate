import React from 'react';
import {Link} from "react-router";
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
          error:''
        };
    }
    onSubmit(e){
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        //to validate password
        if(password.length<9){
            return this.setState({error:'Password must be more than 8 characters long'});
        }
        Accounts.createUser({email,password},(err)=>{
            if(err){
                this.setState({error:err.reason});
            }else{
                this.setState({error:''});
            }
        });
        // this.setState({
        //     error: 'Something went wrong.'
        // })
    }
    render() {
        return <div className='boxed-view'>
            <div className='boxed-view__box'>
        <h1>Signup Page</h1>
            {this.state.error? <p>{this.state.error}</p>:undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
                <input type="text" ref='email' name="email" placeholder="Email here"/>
                <input type="password" ref='password' name="password" placeholder="Password here"/>
                <button className='button'>Create Account</button>
            </form>
            <p>
                <Link to="/">Already have an account.</Link>
            </p>
            </div>
        </div>
    }
}