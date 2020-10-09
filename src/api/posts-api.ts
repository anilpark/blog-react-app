import {CommentType, NewPostType, PostType} from "../types/types";
import axios from 'axios'

const baseAxiosInstanceSetup = {
  baseURL: 'https://bloggy-api.herokuapp.com/',
  headers: {
    "Content-Type": 'application/json'
  }
}

const posts = axios.create({
  ...baseAxiosInstanceSetup, baseURL: baseAxiosInstanceSetup.baseURL + 'posts'
});

const comments = axios.create({
  ...baseAxiosInstanceSetup, baseURL: baseAxiosInstanceSetup.baseURL + 'comments'
});

export const postsAPI = {
  getPosts() {
    return posts.get<PostType[]>('/').then(res => res.data)
  },
  getPost(postId: number) {
    return posts.get<PostType>('/' + postId, {
      params: {
        '_embed': 'comments'
      }
    })
      .then(res => res.data)
  },
  editPost(post: PostType) {
    return posts.put('/' + post.id, {
      title: post.title,
      body: post.body
    }).then(res => 'ok')
  },
  createPost(post: NewPostType) {
    return posts.post('/', post).then(res => 'Added')
  },
  deletePost(postId: number) {
    return posts.delete('/' + postId).then(res => 'ok')
  }
}

export const commentsAPI = {
  addComment(comment: CommentType) {
    return comments.post('', comment).then(res => 'ok')
  }
}