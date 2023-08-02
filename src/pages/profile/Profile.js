import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../../components/posts/Post';
import Share from '../../components/Share/Share';
import './profile.css'
import Modal from '../../components/modal/Modal';
import ProfileL from '../../components/profileL/ProfileL';
import api from "../../api";

function Profile() {
    const id  = useParams().id;
    const [data, setData] = useState(null)
    const [datacert, setDatacert] = useState(null)
    const [user, setUser] = useState(null)
    const [update,setupdate] =useState(false)
    const [showModalabout, setShowModalabout] = useState(false);
    const [showModalcert, setShowModalcert] = useState(false);
    const [showModalcertupdate, setShowModalcertupdate] = useState(false);
    const [about, setabout] = useState("");
    const [Skills, setskills] = useState(""); 
    const datat = { data: data};
    const updatet = { update: update };
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [cert, setcert] = useState({
      certname:"", 
      issuedBy:"",
      issuedDate:"",
      certurl:""
  });
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [myid, setmyid] = useState(null)
    const modalRef = useRef(null);
    const updateButtonRef = useRef(null);
    axios.defaults.withCredentials = true;


    useEffect(() => {
      
      getUsers()
    
}, []);

const getUsers = async () => {
  try {
    const res = await api.get("/auth");
    if (res.data) {
      setUser(res.data);
      
    } else {
      // Handle the case when user data is null or empty
      console.error("User data is null or empty.");
    }
  } catch (err) {
    // Handle the error case when the API call fails
    console.error("Failed to fetch user data:", err);
  }
};
console.log(user)
  // Function to handle opening the modal
  const handleOpenModalabout = () => {
    setShowModalabout(true);
  };


  const handleCloseModalabout = () => {
    setShowModalabout(false);
  };


  // Function to handle opening the modal
  const handleOpenModalcert = () => {
    setShowModalcert(true);
  };


  const handleCloseModalcert = () => {
    setShowModalcert(false);
  };
  
  const handleOpenModalcertupdate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModalcertupdate(true);
    setcert({
      ...cert,
      certname: certificate.certname,
      issuedBy: certificate.issuedBy,
      issuedDate: certificate.issuedDate,
      certurl: certificate.certurl,
    });

};


  const handleCloseModalcertupdate = () => {
    setShowModalcertupdate(false);
  };
    
    const handleaboutChange = (event) => {
      setabout(event.target.value);
    };
  
    
   

  //   const removeskill = (index) => {
  //     const values = [...vdetails]
  //     values.splice(index,1)
  //     setvdetails(values)

       
  //  }
  
  const handlechangeinfo = (event) => {
    let name=event.target.name;
    let value=event.target.value;
    setcert({...cert,[name]:value});
    console.log(cert)
}
  
  
      const navigate = useNavigate();
      useEffect(() => {
        const loaddata = async () => {
          try {
            const res = await api.get('/users/'+id);
    
            if (!res.data) {
              navigate('/register');
            } else {
              setData(res.data.data);
              setupdate(res.data.update)
            }
          } catch (err) {
            console.log(err);
          }
        };
        loaddata();
    
        
      }, [])
  

      //about
      const updateaboutus = async() => {
        const user = {
          about:about
        }

        try {
          await api.put("/auth/register/"+id, user)
          .then(response => {
              console.log("Response data:", response.data);
              setData(response.data)
             
              handleCloseModalabout()
         
          })
          .catch(error => {
              console.log(id.id);
              
          });


            }catch (err) {
                console.log(err);
              }
                  };

              console.log(selectedCertificate)
      
      //certificate
      const updatecert = async() => {
        const user = {
          _id:selectedCertificate._id,
          certificates:cert
        }


        try {
          await api.patch("/users/cert/"+id, user)
          .then(response => {
              console.log("Response data:", response.data);
              setData(response.data)
              handleCloseModalcertupdate()
           
              
         
          })
          .catch(error => {
              console.log(id.id);
              
          });


            }catch (err) {
                console.log(err);
              }
                  };


        
      const addcert = async() => {

        const user = {
          certificates:cert
        }


        try {
          await api.post("/users/cert/"+id, user)
          .then(response => {
              console.log("Response data:", response.data);
              setData(response.data)
              handleCloseModalcert()
              
         
          })
          .catch(error => {
              console.log(id.id);
              
          });


            }catch (err) {
                console.log(err);
              }
                  };
        
     
          const deletecert = async () =>{

              const delid = selectedCertificate._id
  
            try {
              await api.delete(`/users/cert/${id}/${delid}`)
              .then(response => {
                  console.log("Response data:", response.data);
                  setData(response.data)
                  handleCloseModalcertupdate()
               
                  
             
              })
              .catch(error => {
                  console.log(id.id);
                  
              });
    
    
                }catch (err) {
                    console.log(err);
                  }
                      };
            
            
          

            
                  

      
    



  return (
    <div>
        <div>
        {data?.fullName}
      </div>
      <div>
        {data?.userName}
      </div>
        <img src={
          data?.profilePic?
          PF+data.profilePic:
          'placeholder.jpg'
        } 
        alt="Profile Picture"
        style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
        <ProfileL data={datat} update={updatet}/>
          {/* About */}
          <div>
          <h2>About</h2>
            {data?.about ? (
              <div>{data.about}</div>
            ) : (
              <div>none</div>
            )}

            {update && (
              <div>
                <button  onClick={handleOpenModalabout}>update</button>
              </div>
            )}
          </div>
          <Modal showModal={showModalabout} handleCloseModal={handleCloseModalabout}>
        <h2>update About</h2>
        <p>This is the content of the modal.</p>
        <input type="text" value={about} onChange={handleaboutChange} />
        <button onClick={updateaboutus}>update</button>
      </Modal>


          {/* Certificates */}
              
          
          <div>
          <h2>Certificates</h2>
          {data && data.certificates.length > 0 ? (
                data.certificates.map((cert, index) => (
                  <div key={index}>
                    <div>{cert.certname}</div>
                    <button onClick={() => handleOpenModalcertupdate(cert)}>update</button>
                  </div>
                ))
              ) : (
                <div>none</div>
              )}

                  {update && (
                    <div>
                      <button  onClick={handleOpenModalcert}>add</button>
                      
                    </div>
                  )}
                </div>


                <Modal showModal={showModalcert} handleCloseModal={handleCloseModalcert}>
                      <h2>Add Certificate</h2>
                      <p>This is the content of the modal.</p>
                      <input type="text" name='certname' value={cert.certname} onChange={handlechangeinfo} />
                      <input type="text" name='certurl' value={cert.certurl} onChange={handlechangeinfo} />
                      <input type="text" name='issuedBy' value={cert.issuedBy} onChange={handlechangeinfo} />
                      <input type="text" name='issuedDate' value={cert.issuedDate} onChange={handlechangeinfo} />
                      <button onClick={addcert}>Add</button>
            </Modal>
            <Modal showModal={showModalcertupdate} handleCloseModal={handleCloseModalcertupdate}>
                      {selectedCertificate && (
                          <div>
                              <h2>Update Certificate</h2>
                              <p>This is the content of the modal.</p>
                              <input name='certname' value={cert.certname} onChange={handlechangeinfo}/>
                              <input name='certurl' value={cert.certurl} onChange={handlechangeinfo}/>
                              <input name='issuedBy' value={cert.issuedBy} onChange={handlechangeinfo}/>
                              <input name='issuedDate' value={cert.issuedDate} onChange={handlechangeinfo}/>
                              <button onClick={updatecert}>Update Certificate</button>
                              <button onClick={deletecert}>delete Certificate</button>
                          </div>
                      )}
                  </Modal>
          



          {/*Skills */}
        <div>
        <h2>Skills</h2>
          {
            data?.skills.map((skill,index) =>(
              <div key={index}>{skill}</div>
            ))
          }
          {update && (
              <div>
                <button  onClick={handleOpenModalabout}>update</button>
              </div>
            )}
        </div>
        
       

        
        <div>
            {update?"update":"no"}
        </div>
       
        <Share/>

       
    </div>
    
  )
}

export default Profile



