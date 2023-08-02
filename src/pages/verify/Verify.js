import axios from 'axios';
import React from 'react'
import api from "../../api";
import { useParams } from 'react-router-dom';
function Verify() {
    const id  = useParams();
    const verify = async () => {
       
        try {
          await api.put("/auth/verify/"+id.id)
          .then(response => {
            console.log("Response data:", response.data);
            
        })
        .catch(error => {
            console.log("Error:", error);
            
        });
         
        } catch (err) {
          console.log(err);
        }
      }

      const back =()=>{

      }

  return (
    <div>
        <button onClick={verify}>
            Verify
        </button>
        <button onClick={back}>
            GO back to UNIfeed
        </button>
    </div>
  )
}

export default Verify