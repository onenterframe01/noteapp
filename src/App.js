import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
<link
  href="https://fonts.googleapis.com/css?family=Pacifico"
  rel="stylesheet"
></link>;

function App() {
  const [columns, setColoumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3030/users").then((res) => {
      setColoumns(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  }, []);
  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to="/create" className="add">
          Add a note!
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link to={`/update/${d.id}`} className="btn btn-sm btn-success">
                  Update
                </Link>
                <button
                  onClick={(e) => handleSubmit(d.id)}
                  className="btn btn-sm ms-1 btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className=""></div>
    </div>
  );
  function handleSubmit(id) {
    const conf = window.confirm("Are you sure you want to delete this?");
    if (conf) {
      axios
        .delete("http://localhost:3030/users/" + id)
        .then((res) => {
          alert("Record has been deleted successfully");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }
}

export default App;
