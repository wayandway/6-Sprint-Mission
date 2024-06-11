export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}

export interface CommentListResponse {
  list: Comment[];
  nextCursor: number;
}
