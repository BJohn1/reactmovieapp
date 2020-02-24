import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Firebase from '../Firebase/firebase';
import {  Wrapper, Form  } from './style'

class SignUp extends Component{
    state = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        isAuth: false,
        error: null,
    };

    handleChange = (e) =>{
        this.setState({
        [e.target.name]: e.target.value,
    });
    console.log('clicked',e.target);
};

    handleFormSubmit= async e=>{
        const{
            email,
            password1,
            username
        }=this.state
        e.preventDefault();
        try{
            await Firebase.doCreateUserWithEmailAndPassword(
                email,
                password1,
            );
        this.props.doSetCurrentUser({
            username,
            email,
        });
        this.setState({isAuth: true});
        }catch (error){
            this.setState({
                error,
            });
            setTimeout(()=>{
                this.setState({
                    error:null,
                });
            }, 3000);
        }
        //.then(res=>console.log(res));
        //const user = {
        //    username: this.state.username,
        //    email: this.state.email,
        //}
        //this.props.doSetCurrentUser(user);
        this.props.history.push('/');
    }

    render(){
        const{
            username,
            email,
            password1,
            password2,
            error
        } = this.state;
        const isInvalid = password1 !== password2 || password1 === '' || email === '' || username === '';
    return (
    <Wrapper color={'dodgerblue'}>
        <h1>SignUp</h1>
        <Form onSubmit={this.handleFormSubmit}>
            <input placeholder='Full Name' name='username' value={username} onChange={this.handleChange}/>
            <br />
            <input placeholder='Email'name='email' value={email} onChange={this.handleChange}/>
            <br />
            <input placeholder='Password' type='password' name='password1' value={password1} onChange={this.handleChange}/>
            <br />
            <input placeholder='Confirm Password' type='password' name='password2' value={password2} onChange={this.handleChange}/>
            <button disabled={isInvalid} type='submit'>Submit</button>
        </Form>
        {
            error && <div style={{color: 'red'}}>{error.message}</div>
        }
    </Wrapper>
    );
 }
};

export default withRouter(SignUp);