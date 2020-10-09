import React, {useState} from "react";
import {NewPostType} from "../types/types";

type FormProps = {
  addPost(post: NewPostType): void
}
const CreatePostForm: React.FC<FormProps> = ({addPost}) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addPostHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    addPost({title, body})
    setTitle('')
    setBody('')
  }

  return (
    <form>
      <div className="form-group mt-2">
        <h4>New post</h4>
        <input type="text"
               className="form-control"
               placeholder="Title"
               value={title}
               onChange={(e => setTitle(e.target.value))}
        />
      </div>

      <div className="form-group">
        <textarea className="form-control"
                  rows={3}
                  placeholder={'Post body'}
                  value={body}
                  onChange={(e => setBody(e.target.value))}
        />
      </div>
      <button className={'btn btn-success'}
              onClick={addPostHandler}>
        Add
      </button>
    </form>
  )
}

export default CreatePostForm