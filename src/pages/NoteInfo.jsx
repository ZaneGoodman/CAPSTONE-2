import React, { useState } from "react";
import Note from "./Note";
import Accordion from "react-bootstrap/Accordion";
import "./NoteInfo.css";

//Show Note Info, toggle note on click
const NoteInfo = ({ idx, date, season, has_prayed, notes }) => {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey={idx}>
        <Accordion.Header title="noteInfo">
          {date.slice(0, 10)} | {season} {has_prayed ? "🙏🏽📿" : "👎🏽"}
        </Accordion.Header>
        <Accordion.Body>
          <Note note={notes} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
export default NoteInfo;
