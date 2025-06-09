import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log("Removing request with id:", _id);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log("Review request error:", err);
    }
  };

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
        <div className="flex justify-center p-4 pb-24">
        <div
          className="grid gap-16"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            justifyContent: "center",
            maxWidth: "1024px",
          }}
        >
          {requests.map((request) => {
            const { _id, firstName, lastName, age, gender, photoUrl, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="p-4 border rounded-lg bg-base-300 w-full max-w-xs shadow-md"
              >
                <div className="flex justify-center my-2">
                  <img
                    className="w-24 h-24 rounded-full object-cover"
                    src={photoUrl}
                    alt="Profile"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-semibold">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-400">
                      {age} years, {gender}
                    </p>
                  )}
                  <p className="text-sm text-gray-300">{about}</p>
                </div>
                <div className="flex justify-around mt-4">
                  <button
                    className="btn btn-error"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;
