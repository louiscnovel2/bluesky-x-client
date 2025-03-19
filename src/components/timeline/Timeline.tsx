'use client';

import { useState, useEffect } from 'react';
import { getTimeline } from '@/lib/api';
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark, FaRegShareSquare } from 'react-icons/fa';

type Post = {
  uri: string;
  cid: string;
  author: {
    handle: string;
    displayName: string;
    avatar: string;
  };
  record: {
    text: string;
    createdAt: string;
  };
  likeCount: number;
  repostCount: number;
  replyCount: number;
};

export default function Timeline() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const result = await getTimeline(50);
        if (result.success && result.data) {
          const formattedPosts = result.data.feed.map((item: any) => {
            const post = item.post;
            return {
              uri: post.uri,
              cid: post.cid,
              author: {
                handle: post.author.handle,
                displayName: post.author.displayName || post.author.handle,
                avatar: post.author.avatar || '/default-avatar.png',
              },
              record: {
                text: post.record.text,
                createdAt: post.record.createdAt,
              },
              likeCount: post.likeCount || 0,
              repostCount: post.repostCount || 0,
              replyCount: post.replyCount || 0,
            };
          });
          setPosts(formattedPosts);
        } else {
          setError('タイムラインの取得に失敗しました');
        }
      } catch (err) {
        console.error('Timeline fetch error:', err);
        setError('エラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    fetchTimeline();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          再読み込み
        </button>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-800">
      {posts.map((post) => (
        <div key={post.cid} className="p-4 hover:bg-gray-900/50 transition-colors">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img 
                src={post.author.avatar} 
                alt={post.author.displayName} 
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <p className="font-bold text-white">{post.author.displayName}</p>
                <p className="ml-2 text-gray-500">@{post.author.handle}</p>
                <span className="mx-1 text-gray-500">·</span>
                <p className="text-gray-500">{formatDate(post.record.createdAt)}</p>
              </div>
              <p className="mt-1 text-white whitespace-pre-wrap">{post.record.text}</p>
              <div className="mt-3 flex justify-between max-w-md">
                <button className="flex items-center text-gray-500 hover:text-blue-500">
                  <FaRegComment className="mr-1" />
                  <span>{post.replyCount}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-green-500">
                  <FaRetweet className="mr-1" />
                  <span>{post.repostCount}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-red-500">
                  <FaRegHeart className="mr-1" />
                  <span>{post.likeCount}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-500">
                  <FaRegBookmark />
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-500">
                  <FaRegShareSquare />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
