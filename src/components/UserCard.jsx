const UserCard = (props) => {
  const { user } = props;
  //console.log(user);

  return (
    <div className="flex justify-center my-14">
      <div className="card bg-base-300 w-72 shadow-sm">
        <figure>
          <img src={user.photoUrl} alt={user.firstName} />
        </figure>
        <div className="card-body">
            <h2 className="card-title">
              {user.firstName + " " + user.lastName}
            </h2>
            {user.age && <p>{user.age} Years</p>}
            {user.gender && <p>SEX: {user.gender}</p>}
            {user.about && <p>{user.about}</p>}
          <div className="card-actions flex justify-between my-4">
            <button className="btn btn-error">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
