



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Icon from "../assets/Home.svg";

const Homepage = () => {


  return (
    <div>
      <Header />

      <div className="mt-8">
        <img src={Icon} className="mx-auto" alt="Home Icon" />
      </div>

      <div>
      <Link to="/conference">
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4 mx-auto block w-40">
      Go to Conference
      </button>
      </Link>
      </div>
    </div>
  );
};

export default Homepage;







