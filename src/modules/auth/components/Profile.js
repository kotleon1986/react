import React from "react";
import { Link } from "react-router-dom";

const Profile = props => {
  return (
    <div>
      <h1 className="text-center text-danger">Profile page</h1>
      <Link to="/">Home page</Link>
    </div>
  );
};

export default Profile;
