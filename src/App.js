import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Display only the first 5 users
        setUsers(data.slice(0, 5));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">User Directory</h1>

      {loading && <p className="status-message">Loading users...</p>}

      {!loading && error && (
        <p className="status-message error">Failed to fetch users.</p>
      )}

      {!loading && !error && (
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <h2 className="user-name">{user.name}</h2>
              <p className="user-detail">{user.email}</p>
              <p className="user-detail company">{user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
