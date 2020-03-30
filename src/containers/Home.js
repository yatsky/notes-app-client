import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";

export default function Home(props) {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading]=useState(true);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated){
                return;
            }
            try{
                const notes = await loadNotes();
                setNotes(notes);
            }catch(err){
                alert(err);
            }
            setIsLoading(false);
        }

        onLoad();
        // we only want to run this useEffect() when
        // props.isAuthenticated changes
    }, [props.isAuthenticated]);

    function loadNotes(){
        return API.get("notes", "/notes");
    }

    function renderNotesList(notes){
        // The empty object {} serves as the first LinkContainer
        // for creating a new note
        return [{}].concat(notes).map((note, i) =>
        i !== 0 ? (
            <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
                <ListGroupItem header={note.content.trim().split("\n")[0]}>
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                </ListGroupItem>
            </LinkContainer>
        ) : (
            <LinkContainer key="new" to="/notes/new">
                <ListGroupItem>
                    <h4>
                        <b>{"\uFF0B"}</b> Create a new note
                    </h4>
                </ListGroupItem>
            </LinkContainer>
        )
        );
    }

    function renderLander(){
        return (
        <div className="Home">
            <div className="lander">
                <h1>Scratch</h1>
                <p>A modernised note taking app</p>
            </div>
        </div>
        );
    }

    function renderNotes(){
        return (
            <div className="notes">
                <PageHeader>Your Notes</PageHeader>
                <ListGroup>
                    {!isLoading && renderNotesList(notes)}
                </ListGroup>
            </div>
        );
    }

            console.log(props.isAuthenticated);
    return (
        <div className="Home">
            {props.isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
}