import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

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

        try{
            const attachment = file.current ? await s3Upload(file.current) : null;
            // We store the attachment key with the content in the note object
            await createNote({ content, attachment });
            props.history.push("/");
        }catch(err){
            alert(err);
            setIsLoading(false);
        }
    }

    function createNote(note){
        return API.post("notes", "/notes", {
            body: note
        });
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