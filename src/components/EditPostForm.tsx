import React, {useState} from "react";

type editPostFormProps = {
  oldTitle: string,
  oldBody: string,
  updatePost: (title: string, body: string) => void
  closeEditMode: () => void
}

const EditPostForm: React.FC<editPostFormProps> = ({oldTitle, oldBody, updatePost, closeEditMode}) => {
  const [title, setNewTitle] = useState(oldTitle)
  const [body, setNewBody] = useState(oldBody)

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.target.value)
  }

  const updateBody = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewBody(e.target.value)
  }

  return (
    <div className={'row mt-2'}>
      <div className={'col-10 col-md-6'}>
        <form>
          <div className="form-group">
            <h4>Edit post</h4>
            <input type="text" className="form-control" placeholder="Title" value={title} onChange={updateTitle}/>
          </div>

          <div className="form-group">
            <textarea className="form-control" rows={3} placeholder={'Post body'} value={body} onChange={updateBody}/>
          </div>

          <button className={'btn btn-success'} onClick={() => updatePost(title, body)}>Save</button>
          <button className={'btn'} onClick={closeEditMode}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default EditPostForm