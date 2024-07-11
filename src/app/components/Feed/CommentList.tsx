"use client";
import Image from "next/image"
import { Comment, User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { addComment } from "@/lib/actions";

type CommentWithUser = Comment & { user: User};

const CommentList = ({ comments, postId }: { comments: CommentWithUser[], postId: number }) => {

    const { user } = useUser();
    const [ comment, setComment] = useState(comments);
    const [desc, setDesc] = useState("");
    
        const addNewComment = async () => {
            if(!user || !desc) return;
            
            addOptimisticComment({
                id: Math.random(),
                desc,
                postId: postId,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                userId: user.id,
                user:{
                    id: user.id,
                    avatar: user.imageUrl || "/noAvatar.png",
                    username: "Sending, please wait....",
                    cover: "",
                    description: "",
                    name: "",
                    surname: "",
                    city: "",
                    school: "",
                    work: "",
                    website: "",
                    createdAt: new Date(Date.now()),
                }
            });
            try {
                const createdComment = await addComment(postId, desc);
                setComment(prev => [createdComment, ...prev]);
            } catch (error) {
                console.log(`something went wrong:\n ${error}`);

            }
        };

    const [optimisticComment, addOptimisticComment] = useOptimistic(
        comment,
        // Add a new to the list with previous comments
        (state, value:CommentWithUser) => [value, ...state]
    );

    return (
        <>
            {user && (
                <div className="flex items-center gap-4">
                    <Image
                        src={user.imageUrl || "noAvatar.png"}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                    />
                    <form
                        action={addNewComment}
                        className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
                    >
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="bg-transparent outline-none flex-1"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <Image
                            src="/emoji.png"
                            alt=""
                            width={16}
                            height={16}
                            className="cursor-pointer"
                        />
                    </form>
                </div>
            )}
            <div className="">
                {/* COMMENT */}
                {optimisticComment.map((comment) => (
                <div className="flex gap-4 justify-between mt-6" key={comment.id}>
                    {/* AVATAR */}
                    <Image
                        src={comment.user.avatar || "noAvatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                    {/* DESC */}
                    <div className="flex flex-col gap-2 flex-1">
                    <span className="font-medium">
                        {comment.user.name && comment.user.surname
                        ? comment.user.name + " " + comment.user.surname
                        : comment.user.username}
                    </span>
                    <p>{comment.desc}</p>
                    <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                        <div className="flex items-center gap-4">
                        <Image
                            src="/like.png"
                            alt=""
                            width={12}
                            height={12}
                            className="cursor-pointer w-4 h-4"
                        />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">0 Likes</span>
                        </div>
                        <div className="">Reply</div>
                    </div>
                    </div>
                    {/* ICON */}
                    <Image
                        src="/more.png"
                        alt=""
                        width={16}
                        height={16}
                        className="cursor-pointer w-4 h-4"
                    />
                </div>
                ))}
            </div>
        </>
    )
}

export default CommentList