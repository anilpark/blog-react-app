import React, {useState} from "react";
import {CommentType} from "../types/props-types";

type AddCommentProps = {
  addComment: (comment: CommentType) => void,
  postId: number
}

const AddCommentForm: React.FC<AddCommentProps> = ({addComment, postId}) => {
  const [body, setBody] = useState('')

  const addPostHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    addComment({postId, body})
    setBody('')
  }

  return (
    <>
      <form>
        <div className="form-group">
          <textarea className="form-control" rows={1} placeholder={'Enter your comment'} value={body} onChange={(e => setBody(e.target.value))}/>
        </div>
        <button className={'btn btn-success'} onClick={addPostHandler}>Add comment</button>
      </form>
    </>
  )
}

export default AddCommentForm