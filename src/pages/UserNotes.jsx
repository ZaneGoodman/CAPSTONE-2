import React, { useEffect, useState } from "react";
import Notes from "../models/notes";
import NoteInfo from "./NoteInfo";
import { useAuth } from "../provider/authProvider";
import formatDate from "../helpers/formatDate";
import { v4 as uuid } from "uuid";
import "./UserNotes.css";
import Button from "react-bootstrap/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const UserNotes = () => {
  const { username } = useAuth();

  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState();
  const [notes, setNotes] = useState([]);

  // If user has not specified a date range, render the a list of the 10 most recent entires. If user has specified a date range render their entries between those dates.
  useEffect(() => {
    async function getUserNotes() {
      if (date) {
        const userNotes = await Notes.getNotesByRange(
          username,
          formatDate(date[0]),
          formatDate(date[1])
        );
        setNotes(() => userNotes.data.rangedNotes);
      } else {
        const userNotes = await Notes.getRecentNotes(username);
        setNotes(() => userNotes.data.recentNotes);
      }
    }
    getUserNotes();
  }, [username, date]);

  const toggleCalendar = () =>
    //Toggle showing calendar based on button click
    showCalendar === true ? setShowCalendar(false) : setShowCalendar(true);

  return (
    <div className="UserNotes-container">
      <div className="UserNotes-list">
        <h1>Your Prayer Notes</h1>
        <div>
          <Button
            onClick={toggleCalendar}
            className="UserNotes-search"
            variant="dark">
            Search Dates
          </Button>
          {showCalendar && (
            <Calendar
              className="UserNotes-calendar"
              selectRange={true}
              onChange={setDate}
              value={date}
            />
          )}
        </div>
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
          <h3>You haven't added any notes here yet</h3>
        )}
      </div>
    </div>
  );
};

export default UserNotes;
