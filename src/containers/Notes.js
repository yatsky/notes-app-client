import React, {useRef, useState, useEffect } from "react";
import {API, Storage} from "aws-amplify";
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Notes.css";
import { s3Upload } from "../libs/awsLib";

export default function Notes(props){

    const file = useRef(null);
    const [note, setNote]=useState(null);
    const [content, setContent]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadNote() {
            // We get the 'id' of our note from the URL using the props
            // automatically passed to us by React-Router in 'props.match.params.id'
            // The keyword 'id' is a part of the pattern matching in our route(/notes/:id)
            return API.get("notes", `/notes/${props.match.params.id}`);
        }

        async function onLoad(){
            try {
                const note = await loadNote();
                const { content, attachment } = note;
                if (attachment){
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(note);
            }catch(err){
                alert(err);
            }
        }
        onLoad();
    }, [props.match.params.id]);

    function validateForm(){
        return content.length > 0;
    }

    function formatFilename(str){
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(e){
        file.current = e.target.files[0];
    }

    function saveNote(note){
        return API.put("notes", `/notes/${props.match.params.id}`,
        {
            body:note
        });
    }

    async function handleSubmit(e){
        let attachment;
        e.preventDefault();

        if(file.current && file.current.size > config.MAX_ATTACHMENT_SIZE){

            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
        try{
            if(file.current){
                attachment = await s3Upload(file.current);
            }
            await saveNote({
                content,
                // we save the new attachment if there's one
                // else it's just the old note.attachment
                attachment: attachment || note.attachment
            });
            // we redirect user to the home page so no need to
            // setIsLoading(true)
            props.history.push("/");
        }catch(err){
            alert(err);
            setIsLoading(false);
        }

    }

    async function handleDelete(e){
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to delete this note?");

        if(!confirmed){
            return;
        }

        setIsDeleting(true);
    }
    return (
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    {note.attachment && (
                    <FormGroup>
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl.Static>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={note.attachmentURL}
                            >
                                {formatFilename(note.attachment)}
                            </a>
                        </FormControl.Static>
                    </FormGroup>
                    )}
                    <FormGroup controlId="file">
                        {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={handleFileChange} type="file"/>
                    </FormGroup>
                    <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                    block
                    bsSize="large"
                    bsStyle="danger"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    )
}