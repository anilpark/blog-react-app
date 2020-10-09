import React, {useEffect} from "react";
import {Post} from "./Post";
import {AppStateType} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {PostType} from "../types/types";
import {addPost, getPosts} from "../redux/posts-reducer";
import CreatePostForm from "./CreatePostForm";

const Posts: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const {posts} = useSelector((state: AppStateType) => ({
    posts: state.posts.posts // too simple selector to create selector func
  }))

  return (
    <div className={'row'}>
      <div className={'col-10 col-md-6'}>
        <CreatePostForm addPost={(post) => {
          dispatch(addPost(post))
        }}/>
        <hr/>
        {posts.map((post: PostType) => <Post key={post.id + post.title} post={post}/>)}
      </div>
    </div>
  )
}

export default Posts