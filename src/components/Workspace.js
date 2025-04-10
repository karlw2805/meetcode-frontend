// import React from "react";
// import { useParams } from "react-router-dom";

// const Workspace = () => {
//   const { roomCode } = useParams();

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         Workspace - Room: <span className="text-blue-600">{roomCode}</span>
//       </h1>

//       <textarea
//         placeholder="Start typing your code..."
//         className="w-full h-[80vh] p-4 border rounded-md font-mono resize-none"
//       ></textarea>
//     </div>
//   );
// };

// export default Workspace;

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Workspace = () => {
  const { roomCode } = useParams();
  const [text, setText] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = new WebSocket("ws://localhost:8000");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");

      // Optionally send a handshake message
      socketRef.current.send(JSON.stringify({ roomCode }));
    };

    socketRef.current.onmessage = (event) => {
      const { content } = JSON.parse(event.data);
      if (content !== text) {
        setText(content);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socketRef.current.close();
    };
  }, [roomCode, text]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Broadcast to other users
    socketRef.current.send(JSON.stringify({ roomCode, content: newText }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Workspace - Room: <span className="text-blue-600">{roomCode}</span>
      </h1>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing your code..."
        className="w-full h-[80vh] p-4 border rounded-md font-mono resize-none"
      ></textarea>
    </div>
  );
};

export default Workspace;
