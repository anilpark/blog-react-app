import React, {useEffect} from "react";
import {Post} from "./Post";
import {AppStateType} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {PostType} from "../types/props-types";
import {addPost, getPosts} from "../redux/posts-reducer";
import CreatePostForm from "./CreatePostForm";

const Posts: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {dispatch(getPosts())}, [])

  const {posts} = useSelector((state: AppStateType)=> ({
    posts: state.posts.posts
  }))

  return (
    <>
      <CreatePostForm addPost={(post) => {dispatch(addPost(post))}}/>
        {posts.map( (post:PostType) => <Post key={post.id + post.title} post={post}/>
      )}
    </>
  )
}

export default Posts

