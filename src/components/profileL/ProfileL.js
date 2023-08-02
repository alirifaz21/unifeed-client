import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      const res = await axios.get("http://localhost:8800/api/users");
      setFollowed(res.data.followings.includes(data?.data?._id));
    } catch (err) {
      console.log(err);
    }
  };

console.log(update)

  const handleClick = async () => {
    try {
      if (!followed) {
        setFollowed(true);
        try{
        const res = await axios.put("http://localhost:8800/api/users/follow", {
          id: pdata._id,
        });
    }catch (err) {
        setFollowed(false);
      }
      } else {
        setFollowed(false);
        try{
        await axios.put("http://localhost:8800/api/users/unfollow", {
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
