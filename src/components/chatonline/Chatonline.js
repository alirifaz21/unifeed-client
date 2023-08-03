import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";
import api from "../../api";

export default function Chatonline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await api.get("/users/friendList/" + currentId);
        const temp = await res.data
        setFriends(temp)

      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);


  const handleClick = async (user) => {
    try {
      const res = await api.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };  

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriends" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePic
                  ? PF + o.profilePic
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.userName}</span>
        </div>
      ))}
    </div>
  );
}
