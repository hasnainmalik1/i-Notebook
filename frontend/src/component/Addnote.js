import React, { useContext, useState } from 'react'
import noteContext from '../context/nodecontext'
export default function Addnote(props) {
    const context = useContext(noteContext)
    const { addNote } = context;
    let [notes, setnotes] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setnotes({ ...notes, [e.target.name]: e.target.value })

    }
    const handleclick = (e) => {
        e.preventDefault()
        setnotes = addNote(notes.title, notes.description, notes.tag);
        let title = document.getElementById("title")
        title.value = ""
        let description = document.getElementById("description")
        description.value = ""
        let tag = document.getElementById("tag")
        tag.value = ""
        props.showalert("note add successfully", "success")
    }

    return (
        <div>
            <div className="container">
                <h1>add notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" onChange={onChange} name="title" id="title" aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">descrption</label>
                        <input type="text" className="form-control" onChange={onChange} name="description" id="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" onChange={onChange} name="tag" id="tag" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>addnote</button>
                </form>
            </div>
        </div>
    )
}
