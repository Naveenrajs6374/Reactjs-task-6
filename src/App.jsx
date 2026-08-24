import React, { useState, useEffect } from "react";
import "./App.css";

export default function UseEffectAIP() {
  const [user, setUser] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <div className="main-container">

        <div className="header">
          <div>
            <span className="small-title">API DASHBOARD</span>
            <h1>User Directory</h1>
            <p>User information fetched dynamically from a public API</p>
          </div>

          <div className="user-count">
            <strong>{user.length}</strong>
            <span>Users</span>
          </div>
        </div>

        {Loading ? (
          <div className="loading">
            <div className="loader"></div>
            <p>Loading user data...</p>
          </div>
        ) : error ? (
          <div className="error">
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Website</th>
                </tr>
              </thead>

              <tbody>
                {user.map((person) => (
                  <tr key={person.id}>
                    <td>
                      <span className="number">
                        {person.id}
                      </span>
                    </td>

                    <td>
                      <strong>{person.name}</strong>
                    </td>

                    <td>
                      <span className="username">
                        @{person.username}
                      </span>
                    </td>

                    <td>{person.email}</td>

                    <td>{person.phone}</td>

                    <td>
                      <span className="website">
                        {person.website}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
