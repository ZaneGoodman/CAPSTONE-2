import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import formatDate from "../helpers/formatDate";
import NotesForm from "../forms/NotesForm";
import "react-dropdown/style.css";
import { useAuth } from "../provider/authProvider";
import Rosary from "../models/rosary";
import prayers from "../models/staticRosaryData";
import Notes from "../models/notes";
import "./Home.css";
import Button from "react-bootstrap/Button";
import "react-calendar/dist/Calendar.css";

const Home = () => {
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
      //Get Rosary info based on date, add data to state
      const rosaryInfo = await Rosary.getByDate(formatDate(date));
      setRos((r) => ({ ...r, ...rosaryInfo.data[0] }));
      setSeason(rosaryInfo.season);
      //Track if notes have been added,add to state hide form if they have
      const didAddNotes = await Notes.checkDateExists(
        username,
        formatDate(new Date())
      );
      setAddedNotes(didAddNotes);
    };

    getRosary();
  }, [date, addedNotes, username]);

  const toggleCalendar = () =>
    //Toggle showing calendar based on button click
    showCalendar === true ? setShowCalendar(false) : setShowCalendar(true);

  const parseAnnounces = () => {
    let annouceQueue = [];
    for (let i = 1; i <= 5; i++) {
      const announce = (
        <div key={i}>
          <span className="Home-span">
            <h3>Announce {i}</h3>
            <p>{ros[`announce_${i}`]}</p>
          </span>
          <span className="Home-span">
            <h3>Our Father</h3>
            <p>{prayers.getOurFather()}</p>
          </span>
          <span className="Home-span">
            <h3>Hail Mary X10</h3>
            <small>*While meditating on the rosary mystery*</small>
            <p>{prayers.getHailMary()}</p>
          </span>
          <span className="Home-span">
            <h3>Glory Be to the Father</h3>
            <small>*Holding Chain*</small>
            <p>{prayers.getGloryBe()}</p>
          </span>
          <span className="Home-span">
            <h3>Fatima Prayer (oh my Jesus)</h3>
            <p>{prayers.getFatima()}</p>
          </span>
        </div>
      );
      annouceQueue.push(announce);
    }
    return annouceQueue;
  };

  return (
    <div id="Home-page">
      <div className="Home-candle-left">
        <img
          alt="A Lit candle"
          src="https://media2.giphy.com/media/3aWkZTWqeVyHS/giphy.gif"
        />
      </div>
      <div className="Home-candle-right">
        <img
          alt="A Lit candle"
          src="https://media2.giphy.com/media/3aWkZTWqeVyHS/giphy.gif"
        />
      </div>
      <div className="Home-container">
        {showCalendar && (
          <Calendar
            className="Home-calendar"
            data-testid="calendar"
            onChange={setDate}
            value={date}
          />
        )}
        <h1>{season}</h1>
        <small className="Home-date">
          {pickedDay}
          <Button onClick={toggleCalendar} variant="secondary">
            Pick Date
          </Button>
        </small>
        <h2>The {ros.group_by} Mystery</h2>

        <span className="Home-span">
          <h3>Apostles Creeed</h3>
          <small>*Holding Crucifix*</small>
          <p>{prayers.getApostlesCreed()}</p>
        </span>

        <span className="Home-span">
          <h3>Our Father</h3>
          <p>{prayers.getOurFather()}</p>
        </span>

        <span className="Home-span">
          <h3>Hail Mary X3</h3>
          <p>{prayers.getHailMary()}</p>
        </span>

        <span className="Home-span">
          <h3>Glory Be to the Father</h3>
          <small>*Holding Chain*</small>
          <p>{prayers.getGloryBe()}</p>
        </span>

        {parseAnnounces()}

        <span className="Home-span">
          <h3>Hail, Holy Queen</h3>
          <p>{prayers.getHailHolyQueen()}</p>
        </span>

        <span className="Home-span">
          <h3>Final Prayer</h3>
          <p>{prayers.getFinalPrayer()}</p>
        </span>

        <span className="Home-span">
          <h3>{prayers.getInTheName()}</h3>
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
    </div>
  );
};

export default Home;
