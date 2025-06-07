import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">NO REQUESTS FOUND</h1>
      </div>
    );

  return (
    <>
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">REQUESTS</h1>
      </div>
      <div className="flex justify-center">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;
          return (
            <div>
              <div
                key={_id}
                className="m-4 p-4 border rounded-lg bg-base-300 w-80"
              >
                <div className="flex justify-center my-1">
                  <img
                    className="w-30 h-30 rounded-full"
                    src={photoUrl}
                    alt="image"
                  />
                </div>
                <div className="text-center p-2">
                  <h2 className="text-2xl">{firstName + " " + lastName}</h2>
                  {age && gender && <h4>{age + " years, " + gender}</h4>}
                  <h6>{about}</h6>
                </div>
                <div className="flex justify-around m-1">
                <button className="btn btn-error">Reject</button>
                <button className="btn btn-primary">Accept</button>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
