export type PostType = {
  id: number
  title: string,
  body: string,
  comments: CommentType[]
}

export type CommentType = {
  postId: number,
  body: string
}

export type NewPostType = {
  title: string
  body: string
}

export type SpecificPostProps = {
  post: PostType,
  deletePost: (postId: number) => void,
  addComment: (comment: CommentType) => void,
  editPost: (post: PostType) => void
}

export type PostProps = {
  post: PostType,
}