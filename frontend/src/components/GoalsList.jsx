import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, reset } from "../features/goalSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const GoalsList = () => {
  const dispatch = useDispatch();
  const { goals, isLoading, error } = useSelector((state) => state.goals);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, getGoals, reset]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : goals.length > 0 ? (
        <ul>
          {goals.map(({ _id: id, text }) => (
            <li key={id}>{text}</li>
          ))}
        </ul>
      ) : (
        <p>You don&apos;t have any goals yet!</p>
      )}
    </>
  );
};

export default GoalsList;
