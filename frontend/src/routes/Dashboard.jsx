import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { getFeedPosts } from "../utils/ApiRoutes";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getPostsStart, getPostsSuccess } from "../store/slices/postSlice";
import BeatLoader from "react-spinners/BeatLoader";
function Dashboard() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    const getPosts = async () => {
      dispatch(getPostsStart());
      const { data } = await axios.get(getFeedPosts, { withCredentials: true });
      // console.log(data);
      dispatch(getPostsSuccess(data.message));
      // console.log(posts);
    };
    getPosts();
  }, []);

  // console.log(posts);
  return (
    <div className="ml-64">
      {status == "loading" ? (
        <center>
          <BeatLoader color="white" />
        </center>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Dashboard;
