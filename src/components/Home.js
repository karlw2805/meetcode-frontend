// import React from "react";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
//       <button>Join Room</button>
//       <button>Create Room</button>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);
  const [formData, setFormData] = useState({
    roomCode: "",
    password: "",
    projectName: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleJoin = async () => {
    try {
      const res = await fetch("http://localhost:8000/joinroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode: formData.roomCode,
          password: formData.password,
        }),
      });

      if (res.ok) {
        navigate(`/workspace/${formData.roomCode}`);
      } else {
        alert("Invalid room code or password.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("http://localhost:8000/createroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: formData.projectName,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/workspace/${data.roomCode}`);
      } else {
        alert("Failed to create room.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 gap-4">
      {!mode && (
        <>
          <button
            onClick={() => setMode("join")}
            className="bg-blue-500 text-black px-4 py-2 rounded"
          >
            Join Room
          </button>
          <button
            onClick={() => setMode("create")}
            className="bg-green-500 text-black px-4 py-2 rounded"
          >
            Create Room
          </button>
        </>
      )}

      {mode === "join" && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="roomCode"
            placeholder="Room Code"
            value={formData.roomCode}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-black px-4 py-2 rounded"
          >
            Join
          </button>
          <button
            onClick={() => setMode(null)}
            className="text-sm text-gray-600"
          >
            Back
          </button>
        </div>
      )}

      {mode === "create" && (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-green-600 text-black px-4 py-2 rounded"
          >
            Create
          </button>
          <button
            onClick={() => setMode(null)}
            className="text-sm text-gray-600"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
