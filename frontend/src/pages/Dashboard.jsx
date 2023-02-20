import React from "react";
import { useSelector } from "react-redux";
import GoalForm from "../components/GoalForm";
import { Link } from "react-router-dom";
import GoalsList from "../components/GoalsList";
import UsersList from "../components/UsersList";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      {/* TODO: add user and their goals component for admin role */}
      {user ? (
        <>
          {isAdmin ? (
            <UsersList />
          ) : (
            <>
              <GoalForm />
              <GoalsList />
            </>
          )}
        </>
      ) : (
        <Link to="/login">Go to login</Link>
      )}
    </>
  );
};

export default Dashboard;
