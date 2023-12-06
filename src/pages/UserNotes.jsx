import React, { useEffect, useState } from "react";
import Notes from "../models/notes";
import NoteInfo from "./NoteInfo";
import { useAuth } from "../provider/authProvider";
import { v4 as uuid } from "uuid";
import "./UserNotes.css";

const UserNotes = () => {
  const { username } = useAuth();

  const [notes, setNotes] = useState([]);
  //Get all notes that the user has submitted to their profile and render them
  useEffect(() => {
    async function getUserNotes() {
      const allNotes = await Notes.getAllNotes(username);
      setNotes(() => allNotes.data.allNotes);
    }
    getUserNotes();
  }, [username]);

  return (
    <div className="UserNotes-container">
      <div className="UserNotes-list">
        <h1>Your Prayer Notes</h1>

        {notes[0] ? (
          notes.map((note, idx) => (
            <div key={uuid()} className="UserNotes-note-container">
              <NoteInfo
                idx={idx}
                date={note.date}
                season={note.season}
                has_prayed={note.has_prayed}
                notes={note.notes}
              />
            </div>
          ))
        ) : (
          <h3>You haven't added any notes yet</h3>
        )}
      </div>
    </div>
  );
};

export default UserNotes;
