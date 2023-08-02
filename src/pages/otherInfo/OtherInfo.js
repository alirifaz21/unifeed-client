import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./otherInfo.css"

function OtherInfo() {
  const id  = useParams();
  const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [collegeName, setcollegeName] = useState("");
    const [skills, setskills] = useState("");
    const [allSkills, setallSkills] = useState([])
    const [headline, setheadline] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleskills = (event) => {
        setskills([event.target.value]);
      };
    const handleheadline = (event) => {
        setheadline(event.target.value);
      };
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        console.log(selectedImage)


        const reader = new FileReader();
        reader.onloadend = () => {
        setImagePreview(reader.result); // This will set the image preview URL
      };
      if (file) {
        reader.readAsDataURL(file);
      }
      };

      const add = () => {
        setallSkills([...allSkills, skills]);
        setskills(" ")

      }
      const deleteX = (index) => {

        const updatedSkills = [...allSkills];
        updatedSkills.splice(index, 1);
        setallSkills(updatedSkills);
      };
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          add();
        }}
      

      const handleImageUpload = async () => {
        const formData = new FormData();
        const profilePic = Date.now() + selectedImage.name;
        formData.append('name', profilePic);
        formData.append('image', selectedImage);
        
        const user = {
          profilePic:profilePic
        };

        try {
          await axios.put("http://localhost:8800/api/upload/", formData)
            .then(response => {
              console.log("image uploaded to server");
              // If the image is uploaded successfully, proceed to update the user with the profilePic
              axios.put("http://localhost:8800/api/auth/register/"+id.id, user)
                .then(response => {
                  console.log("image uploaded to database");
                  navigate("/feed")
                })
                .catch(error => {
                  console.error("image not uploaded to database");
                });
            })
            .catch(error => {
              console.error("image not uploaded to server");
            });
        } catch (err) {
          console.error(err);
        }

    };
    
    
    


    const next = () =>{
        setCount(count+1)
        console.log(collegeName,skills)
        
    }
    const submit = async() =>{

        const user = {
            collegeName: collegeName,
            skills: allSkills,
            headline: headline
          };
          
          
          
          try {
            await axios.put("http://localhost:8800/api/auth/register/"+id.id, user)
            .then(response => {
                console.log("Response data:", response.data);
                
           
            })
            .catch(error => {
                console.log(id.id);
                
            });
            
        
         
    }catch (err) {
        console.log(err);
      }
      handleImageUpload()
}


    const verify = async () => {
        try {
          await axios.post("http://localhost:8800/api/auth/verify/"+id.id)
          .then(response => {
            console.log("Response data:");
            setCount(count+1)
           
            
        })
        .catch(error => {
            console.log("Error:", error);
            
        });
        
        } catch (err) {
          console.log(err);
        }
      }


    const renderContent = () => {
        if (count == 1){
            return(
            <div className="container-otherinfo">
            <h1>verify Email</h1>
            <button onClick={verify}>Next</button>
        </div>
        )}
        else if(count == 2){
            return(
                <div className="container-otherinfo">
                <h1>Skills</h1>
                <input type="text" value={skills} onChange={handleskills} onKeyPress={handleKeyPress} />
                <button onClick={add}>Add</button>
                <div>
                  {allSkills.map((element, index) => (
                    <div key={index}>{element}<span onClick={deleteX}> X</span></div>
                    
                  ))}
                </div>
                <button onClick={next}>Next</button>
                </div>
        )}
        else if(count == 3){
            return(
                <div className="container-otherinfo">
                <h1>College Id</h1>
                <input type="text" value={headline} onChange={handleheadline}/>
                <button onClick={next}>Next</button>
                </div>
        )}
        else if(count == 4){
            return(
                <div className="container-otherinfo">
                <h1>profile Picture</h1>
                {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        )}
                <input type="file" onChange={handleImageChange} />
                <button onClick={submit}>Upload</button>
                
                </div>
        )}
    }
  return (
    <div>
    <h1>step {count}</h1>
    {renderContent()}
        
    
    </div>
  )
}

export default OtherInfo