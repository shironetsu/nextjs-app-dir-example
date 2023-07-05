import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Article, Comment } from "../../types";
import Comments from './Comments'

const getArticle = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/articles/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    // notFound 関数を呼び出すと not-fount.tsx を表示する
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }

  const data = await res.json();
  return Article.parse(data)
};

const getComments = async (slug: string) => {
  const res = await fetch(
    `http://localhost:3000/api/articles/${slug}/comments`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await res.json();
  return Comment.array().parse(data)
};

export default async function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  const articlePromise = getArticle(params.slug);
  const commentPromise = getComments(params.slug);

  const article = await articlePromise;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <h2>Comments</h2>
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments commentPromise={commentPromise} />
      </Suspense>
    </div>
  );
}

