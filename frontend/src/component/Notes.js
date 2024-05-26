import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/nodecontext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
  const history = useNavigate()
  const context = useContext(noteContext)
  const { Note, getdNote, editNote } = context;
  let [notes, setnotes] = useState({ etitle: "", edescription: "", etag: "" })
  let { showalert } = props
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getdNote()
    }
    else {
      history("/Login")
    }
    // eslint-disable-next-line
  }, [])
  const updatenote = (currentnote) => {
    ref.current.click();
    setnotes({ eid: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag, })
  }
  const onChange = (e) => {
    setnotes({ ...notes, [e.target.name]: e.target.value })
  }
  const handleclick = (e) => {
    // e.preventDefault()
    // editNote("65152a7f85b9a2e4613ef099","DSfsdf","DSfsdfds","dsfdsfdsfds")
    editNote(notes.eid, notes.etitle, notes.edescription, notes.etag)
    console.log(notes);
    refclose.current.click();
    props.showalert("edited successfully", "success")
  }
  const ref = useRef(null)
  const refclose = useRef(null)

  return (
    <div>
      <Addnote showalert={showalert} />
      <button type="button" ref={ref} className="btn btn-primary" id="unwanted" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button><div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">edited note</h1>
              <button type="button" ref={refclose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input type="text" className="form-control" onChange={onChange} value={notes.etitle} name="etitle" id="etitle" aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">descrption</label>
                  <input type="text" className="form-control" onChange={onChange} value={notes.edescription} name="edescription" id="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">tag</label>
                  <input type="text" className="form-control" onChange={onChange} value={notes.etag} name="etag" id="etag" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" onClick={handleclick} className="btn btn-primary">updatenote</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-10 container" id="change">
        <h1>Your notes</h1>
        {Note.length === 0 && "no notes to show"}
        {Note.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} note={note} />
          )
        })
        }
      </div></div>)
}
