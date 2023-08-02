import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../posts/Post';
import api from "../../api";

function Share() {
  const [desc, setDesc] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  axios.defaults.withCredentials = true;
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // This will set the image preview URL
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // FormData object to store the image file
    const formData = new FormData();
    const postpic = Date.now() + selectedImage.name;
    formData.append('name', postpic);
    formData.append('image', selectedImage);

    const user = {
      postpic: postpic,
      desc: desc
    };

    try {
      // Upload the image to the server
      await api.put('/upload/', formData);

      // If the image is uploaded successfully, proceed to update the user with the profilePic
      await api.post('/posts/', user).
      then(res =>{
        console.log(res)
      }).catch(err =>{console.log(err)})

      console.log('Image uploaded to server and user updated in the database.');
    } catch (err) {
      console.error('Error uploading image or updating user:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={desc} onChange={handleDescChange} />
        <input type="file" name="image" onChange={handleImageChange} />

        <button type="submit">Share</button>
      </form>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      )}
      
    </div>
  );
}

export default Share;
