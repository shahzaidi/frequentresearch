import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const GET_URL = "http://localhost:4000/users";
  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(GET_URL);
      console.log(res.data.users, "users");
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div
        className="container"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        {loading ? (
          <Spinner />
        ) : error ? (
          <h1>Somthing Went Wrong...///</h1>
        ) : users?.length < 1 ? (
          <div>
            <h1>
              "OOOppsss..." No student data available in the data base to
              show...///{" "}
            </h1>
            <button
              style={{
                background: "blue",
                color: "white",
                height: "40px",
                width: "200px",
                borderRadius: "40px",
                border: "3px solid black",
                marginTop: "50px",
              }}
              onClick={() => navigate("/register")}
            >
              Add User
            </button>
          </div>
        ) : (
          <div>
            <button
              style={{
                background: "blue",
                color: "white",
                height: "40px",
                width: "200px",
                borderRadius: "40px",
                border: "3px solid black",
              }}
              onClick={() => navigate("/register")}
            >
              Add User
            </button>
            <table className="table caption-top table-light">
              <caption>List of Users</caption>

              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Country</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((User, Index) => {
                  return (
                    <tr key={User._id}>
                      <th scope="row">{Index + 1}</th>
                      <td>{User.firstname}</td>
                      <td>{User.lastname}</td>
                      <td>{User.email}</td>
                      <td>{User.gender}</td>
                      <td>{User.country}</td>
                      <td>{User.state}</td>
                      <td>{User.city}</td>
                      <td>{moment(User.dob).format("MMM Do YY")}</td>
                      <td>{User.age}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
