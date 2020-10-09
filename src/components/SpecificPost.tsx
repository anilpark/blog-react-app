import React, {useState} from "react";
import AddCommentForm from "./AddCommentForm";
import {useHistory} from "react-router-dom";
import {SpecificPostProps} from "../types/types";
import EditPostForm from "./EditPostForm";

const SpecificPost: React.FC<SpecificPostProps> = ({post, editPost, addComment, deletePost}) => {
  const history = useHistory()
  const commentsAvailable = post && post.comments && post.comments.length !== 0
  const [editMode, setEditMode] = useState(false)

  const editPostHandler = (title: string, body: string) => {
    editPost({...post, title, body})
    setEditMode(false)
  }

  const editModeToggle = () => {
    setEditMode(!editMode)
  }

  const deletePostHandler = () => {
    deletePost(post.id)
    history.push('/')
  }

  return (
    <>
      {editMode && <EditPostForm oldTitle={post.title} oldBody={post.body}
                                 updatePost={editPostHandler}
                                 closeEditMode={editModeToggle}/>
      }

      {!editMode &&
      <div className={'row mt-2'}>
        <div className={'col-10 col-md-6'}>
          <div className="card mt-2">
            <div className="card-body">
              <div className={'row'}>
                <div className={'col-8'}>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>

                  {commentsAvailable && post.comments.map(comment =>
                    <p key={comment.postId + comment.body} className={'text-muted'}>{comment.body}</p>
                  )}
                </div>

                <div className={'col-4'}>
                  <button className={'btn'} onClick={editModeToggle}>Edit</button>
                  <button className={'btn btn-danger'} onClick={deletePostHandler}>Delete</button>
                </div>
              </div>

              <AddCommentForm addComment={addComment} postId={post.id}/>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default SpecificPost