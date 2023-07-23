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
    const [headline, setheadline] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handlecollegeName = (event) => {
        setcollegeName(event.target.value);
      };
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
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
        setImagePreview(reader.result); // This will set the image preview URL
      };
      if (file) {
        reader.readAsDataURL(file);
      }
      };

      

      const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedImage);
    
        axios.put("https://unifeed-server.onrender.com/api/upload/"+id.id, formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        console.log(formData)
      };
    
    


    const next = () =>{
        setCount(count+1)
        console.log(collegeName,skills)
        
    }
    const submit = async() =>{
      const formData = new FormData();
        formData.append('image', selectedImage);
        const user = {
            collegeName: collegeName,
            skills: skills,
            headline: headline
          };
          
          
          
          try {
            axios.put("https://unifeed-server.onrender.com/api/auth/register/"+id.id, user)
            .then(response => {
                console.log("Response data:", response.data);
                
                navigate("/feed")
            })
            .catch(error => {
                console.log(id.id);
                
            });
            
        
         
    }catch (err) {
        console.log(err);
      }
      handleImageUpload()
}





    const renderContent = () => {
        if (count == 1){
            return(
            <div className="container-otherinfo">
            <h1>College</h1>
            <input type="text" value={collegeName} onChange={handlecollegeName}/>
            <button onClick={next}>Next</button>
        </div>
        )}
        else if(count == 2){
            return(
                <div className="container-otherinfo">
                <h1>Skills</h1>
                <input type="text" value={skills} onChange={handleskills} />
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