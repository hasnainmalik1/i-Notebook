import React, { useContext } from 'react'
import noteContext from '../context/nodecontext'
export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updatenote } = props;
    return (
        <div className="col-md-3">
            <div className="card">

                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showalert("deleted successfully", "success") }}></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { updatenote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
