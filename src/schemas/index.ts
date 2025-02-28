import { z } from "zod";

export const UserDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    email: z.string()
});

export const FollowedSchema = z.object({
    id: z.number(),
    followed: UserDetailSchema
});

export const FollowerSchema = z.object({
    id: z.number(),
    follower: UserDetailSchema
});

export const LikeSchema = z.object({
    id: z.number(),
    user: UserDetailSchema
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    description: z.string(),
    following: z.array( FollowedSchema ),
    followers: z.array( FollowerSchema )
});
export const UsersSchema = z.array( UserSchema );

export const CommentSchema = z.object({
    id: z.number(),
    user: UserDetailSchema,
    content: z.string()
});

export const LikesSchema = z.object({
    id: z.number(),
    user: UserDetailSchema
});

export const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    author: UserDetailSchema,
    publishedDate: z.string(),
    category: z.string(),
    excerpt: z.string(),
    content: z.string(),
    comments: z.array(CommentSchema),
    likes: z.array(LikesSchema),
    views: z.number()
});
export const PostsSchema = z.array( PostSchema );