import { z } from "zod";
import { CommentSchema, FollowedSchema, FollowerSchema, LikeSchema, PostSchema, UserDetailSchema, UserSchema } from "../schemas";

export type Post = z.infer<typeof PostSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserDetails = z.infer<typeof UserDetailSchema>;
export type Followed = z.infer<typeof FollowedSchema>;
export type Follower = z.infer<typeof FollowerSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type Comment = z.infer<typeof CommentSchema>;

export type NewAccountFormData = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
    description: string;
}

export type AccountFormData = Omit<NewAccountFormData, "email"|"password"|"confirm_password">;

export type LoginFormData = {
    email: string;
    password: string;
}

export type EditPassFormData = Pick<NewAccountFormData, "email"|"password"|"confirm_password">
export type PostFormData = Pick<Post, "title"|"publishedDate"|"category"|"excerpt"|"content">;
export type CommentFormData = Pick<Comment, "content"> & {"post": number};

export type DeletePostFormData = {
    postID: Post["id"],
    password: string
};

export type SearchFormData = {
    title?: Post["title"],
    author?: User["lastname"],
    category?: Post["category"]
}

export type RespuestaAPI = {
    success: boolean;
    message?: string;
    errors?: any;
    data?: any;
}