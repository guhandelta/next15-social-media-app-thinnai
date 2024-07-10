"use client";
import { switchLike } from '@/lib/actions';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { useOptimistic, useState } from 'react';

type PostInteractionProps = {
    postId: number;
    likes: string[];
    commentsCount: number;
};

const PostInteraction = ({ postId, likes, commentsCount }: PostInteractionProps) => {

    const { isLoaded, userId } = useAuth();
    const [likeState, setLikeState] = useState({
        likesCount: likes && likes.length || 0,
        // Check the likes array to see if the current user has liked the post already, or false
        isLiked: userId && likes ? likes.includes(userId) : false
    });

    const [optimisticLike, switchOptimisticLike] = useOptimistic(
        likeState, 
        (state, value) => {
            return{
                //  Check if the user has already liked the post(by getting the previous state), decrement the likesCount, else increment it
                likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
                isLiked: !state.isLiked
            }
        }
    );

    const likeAction = async () => {
        switchOptimisticLike("");
        try {
            switchLike(postId);
            setLikeState(state=>({
                likesCount: state.isLiked ? state.likesCount - 1 : state.likesCount + 1,
                isLiked: !state.isLiked
            }));
        } catch (error) {
            console.log(`error: ${error}`);
            
        }
    }

    return (
        <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <form action={likeAction}>
                            <button>
                                <Image  
                                    src="/like.png" 
                                    alt={optimisticLike.isLiked ?'/liked.png' : '/like.png'} 
                                    width={16} 
                                    height={16} 
                                    className="cursor-pointer" 
                                />
                            </button>
                        </form>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{optimisticLike.likesCount} &nbsp;
                            <span className="hidden md:inline">
                                Likes
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/comment.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{commentsCount}&nbsp;
                            <span className="hidden md:inline">
                                Comments
                            </span>
                        </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image src="/share.png" alt='like' width={16} height={16} className="cursor-pointer"></Image>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">24 &nbsp;
                            <span className="hidden md:inline">
                                Shares
                            </span>
                        </span>
                    </div>
                    
                </div>
            </div>
    )
}

export default PostInteraction