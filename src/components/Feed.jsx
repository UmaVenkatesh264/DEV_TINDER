import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed(); // always fetch on mount
  }, []);

  if (loading)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">Loading...</h1>
      </div>
    );

  if (!feed || feed.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-4xl">NO NEW USERS FOUND</h1>
      </div>
    );

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
