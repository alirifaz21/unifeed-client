import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function Post() {
  const [posts, setPosts] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // Function to fetch user posts from the backend
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/posts/64c411596400a9bf32b1830d');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    // Call the fetchUserPosts function
    fetchUserPosts();
  }, []);

  function loadMoreData() {
    // Your code to load more data or perform any action when reaching the end of the page
    console.log("Reached the end of the page!");
}

window.addEventListener("scroll", function() {
  // Calculate the total height of the page
  const totalPageHeight = document.body.scrollHeight;

  // Calculate the height of the viewport
  const viewportHeight = window.innerHeight;

  // Calculate the current scroll position
  const scrollPosition = window.scrollY;

  // Check if the user has reached the end of the page
  if (scrollPosition + viewportHeight >= totalPageHeight) {
      // Call the function to load more data or perform any action
      loadMoreData();
  }
});

 

  return (
    <div>
      <h2>User Posts</h2>
      <h2>User Posts</h2>
      <h2>User Posts</h2>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <img
                src={post?.postpic ? PF + post.postpic : 'placeholder.jpg'}
                alt="Profile Picture"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <p>{post?.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Post;








 // const postRefs = useRef([]);

  // const handleIntersection = (entries) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       // Element is in view, trigger your action here
  //       console.log('Element is in view!');
  //     }
  //   });
  // };

  // useEffect(() => {
  //   const options = {
  //     root: null, // Use the viewport as the root
  //     rootMargin: '0px', // Margin around the root. '0px' means no margin.
  //     threshold: 0.5, // Percentage of the target element that must be visible to trigger the callback.
  //   };

  //   const observer = new IntersectionObserver(handleIntersection, options);

  //   // Observe each post's ref individually
  //   postRefs.current.forEach((ref) => {
  //     if (ref.current) {
  //       observer.observe(ref.current);
  //     }
  //   });

  //   return () => {
  //     // Unobserve each post's ref when the component unmounts
  //     postRefs.current.forEach((ref) => {
  //       if (ref.current) {
  //         observer.unobserve(ref.current);
  //       }
  //     });
  //   };
  // }, [postRefs]);

   

//   return (
//     <div>
//       <h2>User Posts</h2>
//       <h2>User Posts</h2>
//       <h2>User Posts</h2>

//       {posts.length > 0 ? (
//         <div>
//           {posts.map((post) => (
//             <div key={post._id} ref={postRefs.current[post._id]}>
//               <img
//                 src={post?.postpic ? PF + post.postpic : 'placeholder.jpg'}
//                 alt="Profile Picture"
//                 style={{ width: '200px', height: '200px', objectFit: 'cover' }}
//               />
//               <p>{post?.desc}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No posts found.</p>
//       )}
//     </div>
//   );
// }

// export default Post;
