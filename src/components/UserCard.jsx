import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (props) => {
  const { user } = props;
  //console.log(user);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="w-80 bg-base-300 shadow-sm rounded-xl ">
      <figure className="w-70 m-auto h-48 overflow-hidden mt-5 rounded-xl">
        <img
          src={user.photoUrl}
          alt={user.firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body px-4 py-3">
        <h2 className="text-center text-2xl font-semibold">
          {user.firstName + " " + user.lastName}
        </h2>

        {user.age && user.gender && (
          <p className="text-center text-sm text-gray-400">
            {user.age} Years, {user.gender}
          </p>
        )}

        <p className="text-center text-sm mt-2 text-gray-300">{user.about}</p>

        <div className="card-actions flex justify-between m-4">
          <button className="btn btn-error" onClick={()=>handleSendRequest("ignored", user._id)}>Ignore</button>
          <button className="btn btn-primary" onClick={()=>handleSendRequest("interested", user._id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
