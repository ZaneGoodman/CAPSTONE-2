import React, { useState, useRef } from "react";
import Notes from "../models/notes";
import "./NotesForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//** Form for adding notes for the current Rosary prayer. Will render underneath the Rosary */
const NotesForm = ({ date, season, username, setAddedNotes }) => {
  const checkbox = useRef();
  const INITIAL_STATE = {
    notes: "",
    marker: "false",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await Notes.addNotes(
      username,
      formData.notes,
      formData.marker,
      date,
      season
    );
    /**Setting addedNotes to true on submit will tell the parent component to hide the form */
    setAddedNotes(true);
    setFormData(INITIAL_STATE);
  };

  const handleCheckbox = (evt) => {
    const { name } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: checkbox.current.checked,
    }));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="NotesForm-label" htmlFor="notes">
            Notes
          </Form.Label>

          <Form.Control
            className="NotesForm-input"
            as="textarea"
            onChange={handleChange}
            id="notes"
            name="notes"
            rows={15}
            cols={100}
            value={formData.notes}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="NotesForm-label" htmlFor="marker">
            Prayed today?
          </Form.Label>
          <Form.Check
            onChange={handleCheckbox}
            type="checkbox"
            id="marker"
            name="marker"
            ref={checkbox}
            value={formData.marker}
          />
        </Form.Group>
        <Button variant="secondary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NotesForm;
