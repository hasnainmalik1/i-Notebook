import React, { useState } from "react";
import noteContext from "./nodecontext";
const NoteState = (props) => {
  const host = "http://localhost:5000"

  const intialnotes = []
  const [Note, setNote] = useState(intialnotes);
  //getnotes
  const getdNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "auth-token": localStorage.getItem("token")
      }
  });
    const JSO1=await response.json();
    setNote(JSO1)
      

  // 
}
  //addnote
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("token")
      }, body: JSON.stringify({ title, description, tag })
    });
    const jsin2= response.json();
    console.log(jsin2)
    getdNote()
  }
  //deletenote
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        "auth-token": localStorage.getItem("token")
      }
     
  }); console.log(response)
  getdNote()
  }
  //editnote
  const editNote = async (id, title, description, tag) => {
    //apicalls
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("token")
      }, body: JSON.stringify({title, description,tag})
    });getdNote()
    const jsisn = response.json({ title, description, tag });
    console.log(jsisn)
  }

  // for (let index = [0]; index < Note.length; index++) {
  //   const element = Note[index];
  //   if (element._id === id) {
  //     element.title = title;
  //     element.description = description;
  //     element.tag = tag;
  //   }
  


  return (
    <noteContext.Provider value={{ Note, setNote,addNote, deleteNote, editNote,getdNote }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;