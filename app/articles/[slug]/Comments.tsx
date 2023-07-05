import type { Comment } from "../../types";
 
export default async function Comments({
    commentsPromise,
  }: {
    commentsPromise: Promise<Comment[]>;
  }) {
    const comments = await commentsPromise;
    return (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    );
  }
  