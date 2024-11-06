export type Annotation = [x: number, y: number, width: number, height: number];

export interface CommentPub {
  id?: string;

  name: string;

  picture: string;

  message: string;
}
