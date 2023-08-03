import React, { useEffect, useState } from 'react'
import { debounce, set } from 'lodash';
import api from "../../api";
import { Link } from 'react-router-dom';
function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [users, setUsers] = useState([]);

    const handleSearch = async () => {
        try {
        if(searchTerm != ''){
          const response = await api.get(`/users/search/users?search=${searchTerm}`);
          const data = await response.data;
          setUsers(data);
          console.log(data)
        }else{
            setUsers([])
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const handlechange = (event) => {
        setSearchTerm(event.target.value);
      };

      const debouncedSearch = debounce(handleSearch, 500);

      useEffect(() => {

        debouncedSearch();

        return () => debouncedSearch.cancel();
      }, [searchTerm]);
    
      const openprofile = () => {
        
      }
  
  return (
    <div>
      <h1>User Search</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handlechange}
      />
      <div className="user-list" >
        {users.map((user) => (
          <div key={user._id} >
            <Link to={`/profile/${user._id}`}>{user.userName}</Link>
       
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search