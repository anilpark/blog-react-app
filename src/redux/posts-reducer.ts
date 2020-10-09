import {CommentType, NewPostType, PostType} from "../types/types";
import {commentsAPI, postsAPI} from "../api/posts-api";
import {BaseThunkType, InferActionsTypes} from "./store";
import {Dispatch} from "react";

const initialState = {
  posts: [] as PostType[],
  currentPost: {} as PostType
}

const postsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'BLOG/POSTS/SET-POSTS':
      return {...state, posts: [...action.payload]}
    case 'BLOG/POSTS/SET_CURRENT_POST':
      return {...state, currentPost: {...action.payload}}
    default:
      return state
  }
}

const actions = {
  setPosts: (payload: PostType[]) => ({type: 'BLOG/POSTS/SET-POSTS', payload} as const),
  setCurrentPost: (payload: PostType) => ({type: 'BLOG/POSTS/SET_CURRENT_POST', payload} as const)
}

export const getPost = (postId: number) => async (dispatch: Dispatch<ActionsType>) => {
  const post = await postsAPI.getPost(postId)
  dispatch(actions.setCurrentPost(post))
}

export const getPosts = () => async (dispatch: Dispatch<ActionsType>) => {
  const posts = await postsAPI.getPosts()
  dispatch(actions.setPosts(posts.reverse()))
}

export const addPost = (post: NewPostType) => async (dispatch: Dispatch<ThunkType>) => {
  await postsAPI.createPost(post)
  dispatch(getPosts())
}

export const deletePost = (postId: number): ThunkType => async (dispatch: Dispatch<ThunkType>) => {
  await postsAPI.deletePost(postId)
  dispatch(getPosts())
}

export const addComment = (comment: CommentType): ThunkType => async (dispatch: Dispatch<ThunkType>) => {
  await commentsAPI.addComment(comment)
  dispatch(getPost(comment.postId))
}

export const editPost = (post: PostType): ThunkType => async (dispatch: Dispatch<ThunkType>) => {
  await postsAPI.editPost(post)
  dispatch(getPost(post.id))
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export type InitialStateType = typeof initialState
export default postsReducer