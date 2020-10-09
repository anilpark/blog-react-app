import React, {useEffect, useState} from "react";
import {CommentType} from "../types/types";

type AddCommentProps = {
  addComment: (comment: CommentType) => void,
  postId: number
}
const AddCommentForm: React.FC<AddCommentProps> = ({addComment, postId}) => {
  const [body, setBody] = useState('')
  //to prevent adding comment unless validations are provided
  const [isNewCommentEmpty, setIsNewCommentEmpty] = useState(true)

  const addPostHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    addComment({postId, body})
    setBody('')
  }

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value
    setIsNewCommentEmpty(!value)
    setBody(value)
  }

  const initialClasses = ['btn', 'btn-success']
  const [btnClasses, setBtnClasses] = useState([...initialClasses, 'disabled'])

  useEffect(() => {
    setBtnClasses([...initialClasses, (isNewCommentEmpty ? 'disabled' : '')])
  }, [isNewCommentEmpty])

  return (
    <form>
      <div className="form-group mt-2">
        <textarea className="form-control"
                  rows={1}
                  placeholder={'Enter your comment'}
                  onChange={changeInputHandler}
                  value={body}
        />
      </div>
      <button className={btnClasses.join(' ')}
              onClick={addPostHandler}
              disabled={isNewCommentEmpty}>
        Add comment
      </button>
    </form>
  )
}

export default AddCommentForm