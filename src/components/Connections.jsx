import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections)
  const fetchConnections = async() =>{
    try{
        const res= await axios.get(BASE_URL+"/user/connections", {withCredentials:true})
        //console.log(res.data.data);   
        dispatch(addConnections(res.data.data));
    }
    catch(err){
        console.log(err);    
    }
  }

  useEffect(()=>{
    fetchConnections();
  },[])

  if(!connections) return;

  if(connections.length === 0) return (
    <div className="flex justify-center my-10">
        <h1 className="text-4xl">NO CONNECTIONS FOUND</h1>
    </div>
  )

  return (
    <>
    <div className="flex justify-center my-10">
        <h1 className="text-4xl">CONNECTIONS</h1>
    </div>
    <div className="flex justify-center">
        {connections.map((connection)=>{
            const {_id, firstName, lastName, age, gender, photoUrl, about } = connection;
            return (
                <div key={_id} className="m-4 p-4 border rounded-lg bg-base-300 w-80">
                    <div className="flex justify-center my-1">
                        <img className="w-30 h-30 rounded-full" src={photoUrl} alt="image"/>
                    </div>
                    <div className="text-center p-2">
                        <h2 className="text-2xl">{firstName+ " " + lastName}</h2>
                        <h4>{age + " years, " + gender}</h4>
                        <h6>{about}</h6>
                    </div>
                </div>
            )
        })}
        
    </div>
    </>
  )
}

export default Connections