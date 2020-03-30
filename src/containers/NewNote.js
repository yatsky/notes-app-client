import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";

export default function NewNote(props){
    const file = useRef(null);
    const [content, setContent]= useState("");
    const [isLoading, setIsLoading]=useState(false);

    function validateForm(){
        return content.length>0;
    }

    function handleFileChange(e){
        file.current = e.target.files[0];
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(file.current && file.current.size > config.MAX_ATTACHMENT_SIZE){
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <FormGroup controleId="content">
                    <FormControl
                    value={content}
                    componentClass="textarea"
                    onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controleId="file">
                    <ControlLabel>Attachment</ControlLabel>
                    <FormControl
                    type="file"
                    onChange={handleFileChange}
                    />
                </FormGroup>
                <LoaderButton
                block
                type="submit"
                bsSize="large"
                bsStyle="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </form>
        </div>
    )
}