import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import formatDate from "../helpers/formatDate";
import NotesForm from "../forms/NotesForm";
import "react-dropdown/style.css";
import { useAuth } from "../provider/authProvider";
import Rosary from "../models/rosary";
import Notes from "../models/notes";

const Home = () => {
  //   const navigate = useNavigate();
  const { username } = useAuth();
  const [ros, setRos] = useState({});
  const [season, setSeason] = useState();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [addedNotes, setAddedNotes] = useState(false);
  const currDate = String(new Date()).slice(0, 15);
  const pickedDay = String(date).slice(0, 15);

  useEffect(() => {
    const getRosary = async () => {
      const rosaryInfo = await Rosary.getByDate(formatDate(date));
      setRos((r) => ({ ...r, ...rosaryInfo.data[0] }));
      setSeason(rosaryInfo.season);
      const didAddNotes = await Notes.checkDateExists(
        username,
        formatDate(new Date())
      );
      setAddedNotes(didAddNotes);
    };

    getRosary();
  }, [date, addedNotes, username]);

  const toggleCalendar = () =>
    showCalendar === true ? setShowCalendar(false) : setShowCalendar(true);

  const parseAnnounces = () => {
    let annouceQueue = [];
    for (let i = 1; i <= 5; i++) {
      const announce = (
        <div key={i}>
          <span>
            <h3>Announce {i}</h3>
            <p>{ros[`announce_${i}`]}</p>
          </span>
          <span>
            <h3>Our Father</h3>
            <p>{ros["our _father_1"]}</p>
          </span>
          <span>
            <h3>Hail Mary X10</h3>
            <small>*While meditating on the rosary mystery*</small>
            <p>{ros["hail _mary_1"]}</p>
          </span>
          <span>
            <h3>Glory Be to the Father</h3>
            <small>*Holding Chain*</small>
            <p>{ros.glory_be_1}</p>
          </span>
          <span>
            <h3>Fatima Prayer (oh my Jesus)</h3>
            <p>{ros.oh_my_jesus_1}</p>
          </span>
        </div>
      );
      annouceQueue.push(announce);
    }
    return annouceQueue;
  };

  return (
    <div>
      {showCalendar && (
        <Calendar data-testid="calendar" onChange={setDate} value={date} />
      )}
      <h1>{season}</h1>
      <small>
        {pickedDay}
        <button onClick={toggleCalendar}>Pick Date</button>
      </small>
      <h2>The {ros.group_by} Mystery</h2>
      <span>
        <h3>Apostles Creeed</h3>
        <small>*Holding Crucifix*</small>
        <p>{ros.i_believe}</p>
      </span>
      <span>
        <h3>Our Father</h3>
        <p>{String(ros["our _father_1"]).replace(/\s/g, " ")}</p>
      </span>
      <span>
        <h3>Hail Mary X3</h3>
        <p>{ros["hail _mary_1"]}</p>
      </span>
      <span>
        <h3>Glory Be to the Father</h3>
        <small>*Holding Chain*</small>
        <p>{ros.glory_be_1}</p>
      </span>
      {parseAnnounces()}
      <span>
        <h3>Hail, Holy Queen</h3>
        <p>{ros.holy_queen}</p>
      </span>
      <span>
        <h3>Final Prayer</h3>
        <p>{ros.final_prayer}</p>
      </span>
      <span>
        <h3>{ros.in_the_name_1}</h3>
      </span>
      {currDate === pickedDay && addedNotes === false && (
        <NotesForm
          date={formatDate(date)}
          season={season}
          username={username}
          setAddedNotes={setAddedNotes}
        />
      )}
    </div>
  );
};

export default Home;
