import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (props) => {
  const { user } = props;
  //console.log(user);
  const dispatch = useDispatch();

  const handleSendRequest = async(status, userId) =>{
    try{
      const res = await axios.post(BASE_URL+ "/request/send/" + status + "/" + userId, {}, {withCredentials:true} )
      dispatch(removeUserFromFeed(userId))
    }
    catch(err){
      console.log(err);  
    }
  }

  return (
    <div className="card bg-base-300 w-72 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt={user.firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        {user.age && user.gender && <p>{user.age + ", " + user.gender}</p>}
        <p>{user.about}</p>
        <div className="card-actions flex justify-between my-4">
          <button className="btn btn-error" onClick={()=>handleSendRequest("ignored", user._id)}>Ignore</button>
          <button className="btn btn-primary" onClick={()=>handleSendRequest("interested", user._id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
