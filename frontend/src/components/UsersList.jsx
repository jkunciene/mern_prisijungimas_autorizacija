import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, reset } from "../features/usersSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, getUsers, reset]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : users.length > 0 ? (
        users.map((user) => {
          const { _id: id, name, email, goals } = user;
          return (
            <div key={id}>
              <p>
                {name} ({email})
              </p>
              {goals && goals.length ? (
                <ul>
                  {goals.map(({ _id: id, text }) => (
                    <li key={id}>{text}</li>
                  ))}
                </ul>
              ) : (
                <p>User doesn&apos;t have any goals yet!</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No users!</p>
      )}
    </>
  );
};

export default UsersList;
