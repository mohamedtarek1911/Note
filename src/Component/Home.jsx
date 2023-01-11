import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function Home() {
  let token = localStorage.getItem("token");
  let userID = localStorage.getItem("userid");
  let baseurl = "https://sticky-note-fe.vercel.app/";
  // const [userdata, setUserData] = useState({ token, userID });
  const [note, setNote] = useState({
    title: "",
    desc: "",
    token,
    citizenID: userID,
  });
  const [notes, setNotes] = useState([]);

  async function getData() {
    let { data } = await axios.post(baseurl + "getUserNotes", {
      token,
      userID,
    });

    setNotes(data.Notes);
  }

  useEffect(() => {
    getData();
  }, []);

  function getnote(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  async function addnote(e) {
    e.preventDefault();
    let { data } = await axios.post(baseurl + "addNote", note);
    console.log(data);
    if (data.message === "success") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("add-form").reset();
      getData();
    }
  }
  async function deletnote(NoteID) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseurl + "deleteNote", {
            data: {
              token,
              NoteID,
            },
          })
          .then((response) => {
            console.log(response);
            if (response.data.message === "deleted") {
              getData();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  }
  function getnoteid(index) {
    console.log(notes[index]);
    document.querySelector("#exampleModal1 input").value = notes[index].title;
    document.querySelector("#exampleModal1 textarea").value = notes[index].desc;
    // console.log({...note,"title":notes[index].title,"desc":notes[index].desc,"NoteID":notes[index]._id});
    setNote({
      ...note,
      title: notes[index].title,
      desc: notes[index].desc,
      NoteID: notes[index]._id,
    });
  }
  async function updatenote(e) {
    e.preventDefault();
    let { data } = await axios.put(baseurl + "updateNote", note);
    console.log(data);
    getData();
  }

  return (
    <>
      <div className="container my-5">
        <div className="col-md-12 text-end">
          <a
            className="add p-2 btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fas fa-plus-circle"></i> Add New
          </a>
        </div>
      </div>

      {/* <!-- Add Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="add-form" onSubmit={addnote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  onChange={getnote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={getnote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-info"
                >
                  <i className="fas fa-plus-circle"></i> Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="edit-form" onSubmit={updatenote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  onChange={getnote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={getnote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-info"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- ==========================Notes=============================== --> */}
      <div className="container">
        <div className="row">
          {notes.map((note, index) => {
            return (
              <div key={index} className="col-md-4 my-4">
                <div className="note p-4">
                  <h3 className="float-start">{note.title}</h3>
                  <a
                    onClick={() => {
                      getnoteid(index);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                  >
                    <i className="fas fa-edit float-end edit"></i>
                  </a>
                  <a
                    onClick={() => {
                      deletnote(note._id);
                    }}
                  >
                    {" "}
                    <i className="fas fa-trash-alt float-end px-3 del"></i>
                  </a>
                  <span className="clearfix"></span>
                  <p>{note.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
