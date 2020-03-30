import React, { useState } from "react";
import {API} from "aws-amplify";
import { StripeProvider, Elements } from "react-stripe-elements";
import config from "../config";
import BillingForm from "../components/BillingForm";
import "./Settings.css";

export default function Settings(props){
    const [isLoading, setIsLoading] = useState(false);

    function billUser(details){
        return API.post("notes", "/billing", {
            body: details
        });
    }

    async function handleFormSubmit(storage, { token, error }){
        if (error){
            alert(error);
            return;
        }

        setIsLoading(true);
        try{
            await billUser({
                storage,
                source: token.id
            });
            alert("Your card has been charged successfully!");
            props.history.push("/");
        }catch(err){
            alert(err);
            setIsLoading(false);
        }
    }
    return (
        <div className="Settings">
            <StripeProvider apiKey={config.STRIPE_KEY}>
                <Elements>
                    <BillingForm
                    isLoading={isLoading}
                    onSubmit={handleFormSubmit}
                    />
                </Elements>
            </StripeProvider>
        </div>
    );
}