import {CommentType, NewPostType, PostType} from "../types/props-types";
import axios from 'axios'

const posts = axios.create({
  baseURL: 'https://bloggy-api.herokuapp.com/posts',
  headers:     {
    "Content-Type": 'application/json'
  }
});

const comments = axios.create({
  baseURL: 'https://bloggy-api.herokuapp.com/comments',
  headers:     {
    "Content-Type": 'application/json'
  }
});


export const postsAPI = {
  getPosts() {
    return posts.get('/').then(res=>res.data as PostType[])
  },
  getPost(postId: number){
    return posts.get('/' + postId, {
      params: {
        '_embed': 'comments'
      }
    })
      .then(res=>res.data as PostType)
  },
  editPost(post: PostType){
    return posts.put('/' + post.id, {
      title: post.title,
      body: post.body
    }).then(res=> 'ok')
  },
  createPost(post: NewPostType){
    return posts.post('/', post).then(res=>'Added')
  },
  deletePost(postId:number){
    return posts.delete('/' + postId).then(res=> 'ok')
  },
  addComment(comment: CommentType){
    return comments.post('', comment).then(res=> 'ok')
  }
}
