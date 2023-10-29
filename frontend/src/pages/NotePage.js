import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      let response = await fetch(`/api/notes/${id}`);
      let data = await response.json();
      setNote(data);
    };
    getNote();
  }, [id]);

  return (
    <div>
      <p>{note?.body}</p>
    </div>
  );
};

export default NotePage;
