import React from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <h1 style={{ fontWeight: "200", marginTop: "20px" }}>Account</h1>
      <span>
        <h1>Welcome back, {user.displayName}!</h1>
      </span>
    </>
  );
};

export default Account;
