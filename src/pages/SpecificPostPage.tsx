import React, {useEffect} from "react";
import SpecificPost from "../components/SpecificPost";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {addComment, deletePost, editPost, getPost} from "../redux/posts-reducer";
import {AppStateType} from "../redux/store";
import {CommentType, PostType} from "../types/types";

const SpecificPostsPage: React.FC = () => {
  const history = useHistory()

  type ParamsType = {
    postId: string
  }
  const params = useParams<ParamsType>();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost(+params.postId))
  }, [dispatch, params.postId])

  const {currentPost} = useSelector((state: AppStateType) => ({
    currentPost: state.posts.currentPost
  }))

  const editPostProp = (post: PostType) => {
    dispatch(editPost(post))
  }

  const deletePostProp = (postId: number) => {
    dispatch(deletePost(postId))
  }

  const addCommentProp = (comment: CommentType) => {
    dispatch(addComment(comment))
  }

  const postAvailable = currentPost && !!currentPost.title
  return (
    <div className={'container'}>
      {!postAvailable && <div>
        <h3>There is no such post</h3>
        <button className={'btn btn-light'}
                onClick={() => history.push('/posts')}>
          All posts
        </button>
      </div>}
      {postAvailable &&
      <SpecificPost post={currentPost}
                    editPost={editPostProp}
                    addComment={addCommentProp}
                    deletePost={deletePostProp}
      />}
    </div>
  )
}

export default SpecificPostsPage