import React, {useState} from "react";
import AddCommentForm from "./AddCommentForm";
import {useHistory} from "react-router-dom";
import {SpecificPostProps} from "../types/props-types";

const SpecificPost: React.FC<SpecificPostProps> = ({post, editPost, addComment, deletePost}) => {
  const history = useHistory()
  const commentsAvailable = post && post.comments && post.comments.length !== 0
  const [editMode, setEditMode] = useState(false)
  const [body, setNewBody] = useState(post.body)
  const [title, setNewTitle] = useState(post.title)

  const saveHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    editPost({...post, title, body})
    setEditMode(false)
  }

  const editModeToggle = (e: React.MouseEvent) => {
    setEditMode(!editMode)
  }

  const deleteHandler = () =>{
    deletePost(post.id)
    history.push('/')
  }

  return (
    <>
      {editMode &&
      <form>
        <div className="form-group">
          <h4>Edit post</h4>
          <input type="text" className="form-control" placeholder="Title" value={title} onChange={ (e => setNewTitle(e.target.value))}/>
        </div>

        <div className="form-group">
          <textarea className="form-control" rows={3} placeholder={'Post body'} value={body} onChange={(e => setNewBody(e.target.value))}/>
        </div>
        <button className={'btn btn-success'} onClick={saveHandler}>Save</button>
        <button className={'btn'} onClick={editModeToggle}>Cancel</button>
      </form>
      }

      { !editMode &&
      <div className="card mt-2">
        <div className="card-body">
          <div className={'row'}>
            <div className={'col-8'}>
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              {commentsAvailable && post.comments.map(comment => <p key={comment.postId + comment.body} className={'text-muted'}>{comment.body}</p>)}
            </div>
            <div className={'col-4'}>
              <button className={'btn'} onClick={editModeToggle}>Edit</button>
              <button className={'btn btn-danger'} onClick={deleteHandler}>Delete</button>
            </div>
          </div>

          <AddCommentForm addComment={addComment} postId={post.id}/>
        </div>
      </div>
      }
    </>
  )
}
export default SpecificPost