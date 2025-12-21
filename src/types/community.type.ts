export interface User {
  name: string;
  id: string;
  badge?: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

export interface Post {
  id: number;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
}

export interface TrendingTopic {
  tag: string;
  posts: string;
  icon: string;
}

export interface NewPostData {
  content: string;
  image?: string;
}
