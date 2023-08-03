import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../../api";

function ProfileL({ data, update }) {
  const [followed, setFollowed] = useState();
  const [pdata, setPdata] = useState();
  const [pupdate, setPupdate] = useState();

  useEffect(() => {
    setPdata(data.data)
    setPupdate(update.update)
    getUsers();
  }, [data,update]);

  const getUsers = async () => {
    try {
      const res = await api.get("/users");
      setFollowed(res.data.followings.includes(data?.data?._id));
    } catch (err) {
      console.log(err);
    }
  };



  const handleClick = async () => {
    try {
      if (!followed) {
        setFollowed(true);
        try{
        const res = await api.put("/users/follow", {
          id: pdata._id,
        });
    }catch (err) {
        setFollowed(false);
      }
      } else {
        setFollowed(false);
        try{
        await api.put("/users/unfollow", {
          id: pdata._id,
        });
    }catch (err) {
        setFollowed(true);
      }
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
    {!pupdate?
    (followed ?
        (<button onClick={handleClick}>Unfollow</button>):
        (<button onClick={handleClick}>Follow</button>)
    ):<div></div>
    }
    </div>
  );
}

export default ProfileL;
