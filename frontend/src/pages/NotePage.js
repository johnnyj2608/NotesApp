import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id: noteId } = useParams();
  let [note, setNote] = useState(null);
  let navigate = useNavigate();
  let CSRF = document.cookie.slice(10);

  useEffect(() => {
    const getNote = async () => {
      if (noteId === "new") return;
      let response = await fetch(`/api/notes/${noteId}`);
      let data = await response.json();
      setNote(data);
    };
    getNote();
  }, [noteId]);

  let updateNote = async () => {
    fetch("/api/notes/" + noteId + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF,
      },
      body: JSON.stringify(note),
    });
  };

  let createNote = async () => {
    fetch("/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF,
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch("/api/notes/" + noteId + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": CSRF,
      },
    });
    navigate("/");
  };

  let handleSubmit = () => {
    //console.log("NOTE:", note);
    if (noteId !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
    navigate("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    //console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
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
