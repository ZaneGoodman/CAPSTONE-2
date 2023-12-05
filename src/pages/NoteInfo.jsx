import React, { useState } from "react";
import Note from "./Note";

const NoteInfo = ({ date, season, has_prayed, notes }) => {
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    clicked === true ? setClicked(false) : setClicked(true);
  };
  return (
    <span title="noteInfo" onClick={onClick}>
      <h4>
        {date.slice(0, 10)} | {season} {has_prayed ? "🙏📿" : "👎"}
      </h4>
      {clicked && <Note note={notes} />}
    </span>
  );
};
export default NoteInfo;
