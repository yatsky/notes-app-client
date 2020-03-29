import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login(props){
    // we use hooks to store/update variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await Auth.signIn(email, password);
            props.userHasAuthenticated(true);
        }catch(err){
            alert(err.message);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                    autoFocus
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>

    )
}