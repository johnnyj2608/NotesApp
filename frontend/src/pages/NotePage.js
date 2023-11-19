import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getNote = async () => {
      let response = await fetch(`/api/notes/${id}`);
      let data = await response.json();
      setNote(data);
    };
    getNote();
  }, [id]);

  let CSRF = document.cookie.slice(10);
  let updateNote = async () => {
    fetch("/api/notes/" + id + "/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF,
      },
      body: JSON.stringify(note),
    });
  };

  let handleSubmit = () => {
    updateNote();
    navigate("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
