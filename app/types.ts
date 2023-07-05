import { z } from 'zod'

export const Article = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})
export type Article = z.infer<typeof Article>

export const Author = z.object({
    name: z.string(),
    avatarUrl: z.string(),
});
export type Author = z.infer<typeof Author>

export const Comment = z.object({
    id: z.number(),
    body: z.string(),
    articleId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    author: Author,
});
export type Comment = z.infer<typeof Comment>