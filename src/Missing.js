import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>Well, thats disappinting</p>
      <Link to="/">Visit our homepage</Link>
    </main>
  );
};

export default Missing;
