import React, { useEffect, useState } from "react";
import Notes from "../models/notes";
import NoteInfo from "./NoteInfo";
import { useAuth } from "../provider/authProvider";
import { v4 as uuid } from "uuid";

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
    <>
      <h1>Your Prayer Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={uuid()}>
            <NoteInfo
              date={note.date}
              season={note.season}
              has_prayed={note.has_prayed}
              notes={note.notes}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserNotes;
