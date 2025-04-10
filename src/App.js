import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import About from "./components/Aboutt";
import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext } from "react";
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import Home from "./components/Home";
import Workspace from "./components/Workspace.js";

const userContext = createContext();
function App() {
  const [mode, setMode] = useState("light");
  const [namee, setNamee] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken")); // Get token from localStorage
    if (!authToken) {
      // If no token found, allow navigation to login or signup
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        navigate("/login"); // Redirect to login page if no token and not visiting login/signup
      }
    } else {
      // If token found, allow navigation to all pages
      setNamee(localStorage.getItem("username"));
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      ) {
        navigate("/"); // Redirect to home page if token is found and visiting login/signup
      }
    }
  }, [authToken, navigate]);

  const [text, setText] = useState("");

  return (
    <userContext.Provider
      value={{
        namee,
        setNamee,
        text,
        setText,
      }}
    >
      <Navbar title="CodePaglus" mode={mode} setMode={setMode} />
      <div
        className="container-fluid"
        style={{
          width: "100vw", // Full width
          height: "100vh", // Full height
          marginTop: "20px", // Add margin from the top
          display: "flex",
          flexDirection: "column", // Ensure content fills the vertical space
          backgroundRepeat: "no-repeat", // Prevent tiling
          backgroundPosition: "center", // Center the image
          backgroundSize: "cover", // Ensure the whole image is visible
          position: "relative",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/workspace/:roomcode" element={<Workspace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/test/:testnum/:questionnum" element={<TestPage />} />
          <Route path="/result/:testnum" element={<Result />} />
          <Route
            path="/admin"
            element={
              <>
                <h1>Hello {namee}</h1>
                <AdminPage />
              </>
            }
          />
          <Route path="/admin/test/:testnum" element={<TestDetail />} />
          <Route path="admin/addtest" element={<Addtest />} /> */}
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
