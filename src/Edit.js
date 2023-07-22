import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3030/users/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put("http://localhost:3030/users/" + id, data).then((res) => {
      alert("data updated successfully!");
      navigate("/");
    });
  }
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">ID:</label>
            <input
              type="text"
              disabled
              name="name"
              value={data.id}
              className="form-control"
            />
          </div>

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              className="form-control"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              className="form-control"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <br />
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}
export default Edit;
