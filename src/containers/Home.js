import React, { useState } from "react";
import { PageHeader, ListGroup} from "react-bootstrap";
import "./Home.css";
import { PresignedPost } from "aws-sdk/clients/s3";

export default function Home(props) {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading]=useState(true);

    function renderNotesList(notes){
        return null;
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

    return (
        <div className="Home">
            {props.isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
}