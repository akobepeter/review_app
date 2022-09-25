import React from "react";
import { Navigate, useNavigate,Routes,Route } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  const onClick = () => {
    console.log("Hello");
    navigate("/about");
  };
  const status = 200;

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  return (
    <div>
      <h1>Redirect</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path="/show" element={<h1>Hello World</h1>}/>
      </Routes>
    </div>
  );
};

export default Redirect;
