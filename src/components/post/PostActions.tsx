'use client';

import { useState } from 'react';
import { likePost, repostPost } from '@/lib/api';
import { FaRegComment, FaRetweet, FaRegHeart, FaHeart, FaRegBookmark, FaRegShareSquare } from 'react-icons/fa';

type PostActionProps = {
  uri: string;
  cid: string;
  likeCount: number;
  repostCount: number;
  replyCount: number;
  isLiked?: boolean;
  isReposted?: boolean;
};

export default function PostActions({
  uri,
  cid,
  likeCount: initialLikeCount,
  repostCount: initialRepostCount,
  replyCount,
  isLiked: initialIsLiked = false,
  isReposted: initialIsReposted = false
}: PostActionProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [repostCount, setRepostCount] = useState(initialRepostCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isReposted, setIsReposted] = useState(initialIsReposted);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isRepostLoading, setIsRepostLoading] = useState(false);

  const handleLike = async () => {
    if (isLikeLoading) return;
    
    setIsLikeLoading(true);
    try {
      const result = await likePost(uri, cid);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Like action error:', error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleRepost = async () => {
    if (isRepostLoading) return;
    
    setIsRepostLoading(true);
    try {
      const result = await repostPost(uri, cid);
      if (result.success) {
        setIsReposted(!isReposted);
        setRepostCount(prev => isReposted ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Repost action error:', error);
    } finally {
      setIsRepostLoading(false);
    }
  };

  return (
    <div className="mt-3 flex justify-between max-w-md">
      <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
        <FaRegComment className="mr-1" />
        <span>{replyCount}</span>
      </button>
      
      <button 
        onClick={handleRepost}
        disabled={isRepostLoading}
        className={`flex items-center ${isReposted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'} transition-colors`}
      >
        <FaRetweet className={`mr-1 ${isRepostLoading ? 'animate-spin' : ''}`} />
        <span>{repostCount}</span>
      </button>
      
      <button 
        onClick={handleLike}
        disabled={isLikeLoading}
        className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
      >
        {isLiked ? (
          <FaHeart className={`mr-1 ${isLikeLoading ? 'animate-ping' : ''}`} />
        ) : (
          <FaRegHeart className={`mr-1 ${isLikeLoading ? 'animate-ping' : ''}`} />
        )}
        <span>{likeCount}</span>
      </button>
      
      <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
        <FaRegBookmark />
      </button>
      
      <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
        <FaRegShareSquare />
      </button>
    </div>
  );
}
