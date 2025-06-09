import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">NO CONNECTIONS FOUND</h1>
      </div>
    );

  return (
    <>
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">CONNECTIONS</h1>
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
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            connection;
          return (
            <div
              key={_id}
              className="p-4 border rounded-lg bg-base-300 w-full shadow-md"
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
                <p className="text-sm text-gray-400">
                  {age} years, {gender}
                </p>
                <p className="text-sm text-gray-300">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Connections;
