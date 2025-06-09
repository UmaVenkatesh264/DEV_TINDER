import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {

   if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center my-3 gap-10 bg-base-100">
  {/* First Card (Edit Profile Form) */}
  <div className="card bg-base-300 w-72 shadow-xl">
    <div className="card-body">
      <h2 className="card-title justify-center">Edit Profile</h2>
      <div>
        <label className="form-control w-full max-w-xs my-0.5">
          <div className="label my-0.5">
            <span className="label-text">First Name:</span>
          </div>
          <input
            type="text"
            value={firstName}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs my-0.5">
          <div className="label my-0.5">
            <span className="label-text">Last Name:</span>
          </div>
          <input
            type="text"
            value={lastName}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs my-0.5">
          <div className="label my-0.5">
            <span className="label-text">Photo URL:</span>
          </div>
          <input
            type="text"
            value={photoUrl}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs my-0.5">
          <div className="label my-0.5">
            <span className="label-text">Age:</span>
          </div>
          <input
            type="text"
            value={age}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs my-0.5">
          <div className="label my-0.5">
            <span className="label-text">Gender:</span>
          </div>
          <select
            value={gender}
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="form-control w-full max-w-xs my-0.5">
          <div className="label my-0.5">
            <span className="label-text">About:</span>
          </div>
          <textarea
            value={about}
            className="textarea textarea-bordered w-full max-w-xs"
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
          />
        </label>
      </div>

      <p className="text-red-500">{error}</p>

      <div className="card-actions justify-center mt-2">
        <button className="btn btn-primary" onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  </div>

  {/* Second Card (Live Preview) */}
  <div className="card w-80 bg-base-300 shadow-sm rounded-xl">
    <figure className="w-70 m-auto h-48 overflow-hidden mt-5 rounded-xl">
      <img
        src={photoUrl}
        alt={firstName}
        className="w-full h-full object-cover"
      />
    </figure>

    <div className="card-body px-4 py-3">
      <h2 className="text-center text-2xl font-semibold">
        {firstName + " " + lastName}
      </h2>

      {age && gender && (
        <p className="text-center text-sm text-gray-400">
          {age +  " Years," + gender}
        </p>
      )}

      <p className="text-center text-sm mt-2 text-gray-300">{about}</p>
    </div>
  </div>
</div>


      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
