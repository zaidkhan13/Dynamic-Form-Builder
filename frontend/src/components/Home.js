import React from "react";
import "../assets/styles/home.css";
import Navbar from "../components/Navbar";

const Home = (props) => {
  return (
    <>
      <Navbar
        title="DF Builder"
        showAlert={props.showAlert}
        token={props.token}
        setToken={props.setToken}
      />
      <div className="my-outer-container pt-18 pb-4 px-4">
        <div className="myInnerContainer-1">Home</div>
      </div>
    </>
  );
};

export default Home;
