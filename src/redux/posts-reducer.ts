import {CommentType, NewPostType, PostType} from "../types/props-types";
import {postsAPI} from "../api/posts-api";

const initialState = {
  posts: [] as PostType[],
  currentPost: {} as PostType
}

const postsReducer = (state:any = initialState, action:any) => {
  switch (action.type) {
    case 'SET-POSTS':
      return {...state, posts: [...action.payload]}
    case 'SET-CURRENT-POST':
      return {...state, currentPost: {...action.payload}}
    default:
      return state
  }
}

const setPosts = (payload: PostType[]) => ({type: 'SET-POSTS', payload})
const setCurrentPost = (payload: PostType) => ({type: 'SET-CURRENT-POST', payload})

export const getPost = (postId: number) => async (dispatch: any) => {
  try{
    const post = await postsAPI.getPost(postId)
    dispatch(setCurrentPost(post))
  }catch (e) {
    console.log('sth went wrong')
  }
}

export const getPosts = () => async (dispatch: any) => {
  const posts = await postsAPI.getPosts()
  dispatch(setPosts(posts.reverse()))
}

export const addPost = (post: NewPostType) => async (dispatch: any) => {
  await postsAPI.createPost(post)
  dispatch(getPosts())
}

export const deletePost = (postId:number) => async (dispatch: any) => {
  await postsAPI.deletePost(postId)
  dispatch(getPosts())
}

export const addComment = (comment: CommentType) => async (dispatch: any) => {
  await postsAPI.addComment(comment)
  dispatch(getPost(comment.postId))

}

export const editPost = (post: PostType) => async (dispatch: any) => {
  console.log(post);
  await postsAPI.editPost(post)
  dispatch(getPost(post.id))
}

export default postsReducer