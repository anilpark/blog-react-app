import React from "react";
import {PostProps} from "../types/props-types";
import {useHistory} from "react-router-dom";

export const Post: React.FC<PostProps> = ({post}) => {
  const history = useHistory()

  return (
    <>
      <div className="card mt-2">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <button className={'btn btn-outline-info'}
                    onClick={ () => history.push('/posts/' + post.id) }>Open</button>
          </div>
      </div>
    </>
  )
}