import type { Article } from "./types";
import { Heading } from "./common/components";
import ArticleList from "./ArticleList";

async function getArticles() {
  const res = await fetch("http://localhost:3000/api/articles", {
    cache: "no-store",
  });

  // 意図的にエラーを発生させると error.tsx の内容が表示される。
  //throw new Error("💣");

  // エラーハンドリングを行うことが推奨されている
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return data.articles as Article[];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <Heading as="h1" mb={4}>
        新着記事
      </Heading>
      <ArticleList articles={articles} />
    </div>
  );
}
