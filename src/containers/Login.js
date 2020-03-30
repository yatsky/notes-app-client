import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";


export default function Login(props){
    // we use hooks to store/update variables
    const [isLoading, setIsLoading] = useState(false);

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });


    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }
    async function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
            // remove this because UnauthenticatedRoute handles redirection
            // props.history.push("/");
        }catch(err){
            alert(err.message);
            setIsLoading(false);
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
                    value={fields.email}
                    // We could also write
                    // onChange={handleFieldChange}
                    onChange={e => handleFieldChange(e)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                    value={fields.password}
                    onChange={e => handleFieldChange(e)}
                    type="password"
                    />
                </FormGroup>
                <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateForm}
                >Login</LoaderButton>
            </form>
        </div>

    )
}