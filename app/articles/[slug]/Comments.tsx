import type { Comment } from "../../types";
 
export default async function Comments({
    commentPromise,
  }: {
    commentPromise: Promise<Comment[]>
  }) {
    const comments = await commentPromise;
    return (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    );
  }
  