import React from 'react'
import "./messenger.css";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatonline/Chatonline";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import api from "../../api";

const socket = io("http://localhost:8900", {
  // Additional socket configurations if needed
});


function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState({});
  const scrollRef = useRef();
  const usert = { user: user};
    axios.defaults.withCredentials = true;

    useEffect(() => {
      fetchUserAndData();
    }, []);
  
    const fetchUserAndData = async () => {
      try {
        const userData = await api.get("/users");
        if (userData.data) {
          setUser(userData.data);
        } else {
          console.error("User data is null or empty.");
        }
        
        event(userData.data)
        getConversations(userData.data)
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
  


    
        // Event listener to receive new messages
const event = (userf) => {
        socket.on("getMessage", (data) => {
          setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      
        socket.on("getUsers", (users) => {
   
      
          const on = userf.followings.filter((f) => users.some((u) => u.userId === f))
          if(on){setOnlineUsers(on)
            console.log(onlineUsers)}
          
          
        });
        return () => {
          socket.off("getMessage");
          socket.off("getUsers");
        };
      
      }

      useEffect(() => {
        // Emit "addUser" event when the component mounts
        socket.emit("addUser", user._id);
      }, [user]);
    
    
      useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);
    


        const getConversations = async (user) => {
          try {
            const res = await api.get("/conversations/" + user._id);
            setConversations(res.data);
  
          } catch (err) {
            console.log(err);
          }
        };

    
      useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await api.get("/messages/" + currentChat?._id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        socket.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
    
        try {
          const res = await api.post("/messages", message);
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
      
    
     
    //     const setnewconv = async (e) => {
    
    
    //       const newconv = {
    //         senderId: user._id,
    //         receiverId: friendId
    //       }
      
    //         try{
    //         const res = await api.post("/conversations",newconv)
      
    //         }catch{}
       
    //         window.location.reload();
    //     }
    
    //     const getId = async (e) =>{
    //       e.preventDefault();
    //       try{
    //         const res = await api.get("/users/"+ newUser)
    //           setfriendId(res.data[0]._id);
    //           console.log(res.data[0]._id);
    //         }catch{}
    //         setsomthing(`start a chat with ${newUser}`)
    //     }
    
    
    //   console.log(onlineUsers)

      
  
    const conv = async() => {
      const body = {
        senderId:"64c411596400a9bf32b1830d",
        receiverId:"64c7ca25c8ac15df5654ee49"
      }
      try {
        const res = await api.post("/Conversations/",body);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }



  
  return (
    <div><div className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
      <div className="sameline">
        <input  placeholder="Search for friends" className="chatMenuInput" 
          value={newUser}
          onChange = {(e) => setNewUser(e.target.value)}
          
        />
        {/* <Pageview fontSize="large" className="searchbtn" onClick={getId}>search</Pageview> */}
       </div>
       {/* <div className="setconv" onClick={setnewconv}>{somthing} </div> */}
        {conversations.map((c) => (
          <div className="shadow" onClick={() => setCurrentChat(c)}>
            <Conversation conversation={c} currentUser={user} />
          </div>
        ))}
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="noConversationText">
            Open a conversation to start a chat.
          </span>
        )}
      </div>
    </div>
  
    <div className="chatOnline">
      <div className="chatOnlineWrapper">
    
        {/* <ChatOnline
          onlineUsers={onlineUsers}
          currentId={user._id}
          setCurrentChat={setCurrentChat}
        /> */}
      </div>
    </div>
  </div>
  <button onClick={conv}>add</button>
  </div>
  )
}

export default Messenger