'use client';

import { useState } from 'react';
import { createPost } from '@/lib/api';
import { FaImage, FaSmile, FaPoll, FaCalendarAlt } from 'react-icons/fa';

export default function PostComposer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const maxLength = 300; // Blueskyの最大文字数
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const result = await createPost(text);
      if (result.success) {
        setText('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('投稿に失敗しました。もう一度お試しください。');
      }
    } catch (err) {
      console.error('Post error:', err);
      setError('エラーが発生しました。後でもう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="border-b border-gray-800 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="mr-4">
            <div className="w-12 h-12 rounded-full bg-gray-700"></div>
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="いまどうしてる？"
              className="w-full bg-transparent text-white text-xl border-none focus:outline-none resize-none"
              rows={3}
              maxLength={maxLength}
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4 text-blue-500">
                <button type="button" className="hover:bg-blue-500/10 p-2 rounded-full">
                  <FaImage />
                </button>
                <button type="button" className="hover:bg-blue-500/10 p-2 rounded-full">
                  <FaSmile />
                </button>
                <button type="button" className="hover:bg-blue-500/10 p-2 rounded-full">
                  <FaPoll />
                </button>
                <button type="button" className="hover:bg-blue-500/10 p-2 rounded-full">
                  <FaCalendarAlt />
                </button>
              </div>
              
              <div className="flex items-center">
                {text.length > 0 && (
                  <div className={`mr-3 ${text.length > maxLength * 0.8 ? 'text-yellow-500' : 'text-gray-500'}`}>
                    {text.length}/{maxLength}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || !text.trim() || text.length > maxLength}
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? '投稿中...' : '投稿する'}
                </button>
              </div>
            </div>
            
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
            {success && <div className="mt-2 text-green-500 text-sm">投稿しました！</div>}
          </div>
        </div>
      </form>
    </div>
  );
}
