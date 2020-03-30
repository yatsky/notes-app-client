import { useState } from "react";


// This custom Hook acts as a centralised processor of form fields.
// A custom React Hook starts with the work "use" in its name.
export function useFormFields(initialState) {
    // our Hook takes the initial state of our form fields as an
    // object and saves it as a state variable called "fields"
    const [fields, setValues] = useState(initialState);

    // Return an array with "fields" as an object and a function that
    // sets the new state based on the event object.
    return [
        fields,
        function(event){
            setValues({
                ...fields,
                // setValues() takes an json object {}
                // to avoid "event.target.id" itself from being interpreted as
                // property, we use [] to get its actual value.
                // This event.target.id evaluates to the "controlId",
                // e.g. "email", "password", etc.
                [event.target.id]: event.target.value
            });
        }
    ];
}