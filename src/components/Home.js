import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const navigate = useNavigate();

  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const [repoName, setRepoName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const [joinCode, setJoinCode] = useState("");

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/repos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRepos(data.repos);
        } else {
          console.error("Could not load repositories", data.message);
        }
      })
      .catch((err) => console.error("Error fetching repos:", err));
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/repos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ repoName, roomPassword }),
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/workspace/${data.repoName}`);
      } else {
        alert("Error creating room: " + data.message);
      }
    } catch (err) {
      console.error("Error creating room:", err);
      alert("Error creating room.");
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/repos/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ joinCode }),
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/workspace/${data.repoName}`);
      } else {
        alert("Error joining room: " + data.message);
      }
    } catch (err) {
      console.error("Error joining room:", err);
      alert("Error joining room.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Meet Code Home</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setShowCreate(true);
            setShowJoin(false);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create New Room
        </button>
        <button
          onClick={() => {
            setShowJoin(true);
            setShowCreate(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Join with Code
        </button>
      </div>

      {/* Create New Room Form */}
      {showCreate && (
        <form onSubmit={handleCreateSubmit} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Create a New Room</h2>
          <div className="mb-4">
            <label className="block mb-1">Repository Name:</label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Set Room Password:</label>
            <input
              type="password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Room
          </button>
        </form>
      )}

      {/* Join with Code Form */}
      {showJoin && (
        <form onSubmit={handleJoinSubmit} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Join a Room</h2>
          <div className="mb-4">
            <label className="block mb-1">Enter Room Code:</label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Join Room
          </button>
        </form>
      )}

      {/* List of Repositories Created by the User */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your Repositories</h2>
        {repos.length === 0 ? (
          <p>No repositories created yet.</p>
        ) : (
          <ul>
            {repos.map((repo, index) => (
              <li key={index} className="mb-2 p-2 bg-white shadow rounded">
                <span className="font-bold">{repo.repoName}</span> - Code:{" "}
                {repo.repoCode}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* TEST Button to manually go to dummy workspace */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/workspace/DummyRoom")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Test Workspace Page (DummyRoom)
        </button>
      </div>
    </div>
  );
};

export default Home;
