const UserCard = (props) => {
  const { user } = props;
  //console.log(user);

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt={user.firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        {user.age && user.gender && <p>{user.age + ", " + user.gender}</p>}
        <p>{user.about}</p>
        <div className="card-actions flex justify-between my-4">
          <button className="btn btn-error">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
