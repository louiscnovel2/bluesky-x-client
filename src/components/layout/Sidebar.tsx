'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSearch, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaEllipsisH } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showThemeToggle, setShowThemeToggle] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setShowThemeToggle(false);
  };

  const navItems = [
    { name: 'ホーム', icon: <FaHome />, path: '/home' },
    { name: '検索', icon: <FaSearch />, path: '/search' },
    { name: '通知', icon: <FaBell />, path: '/notifications' },
    { name: 'メッセージ', icon: <FaEnvelope />, path: '/messages' },
    { name: 'ブックマーク', icon: <FaBookmark />, path: '/bookmarks' },
    { name: 'リスト', icon: <FaList />, path: '/lists' },
    { name: 'プロフィール', icon: <FaUser />, path: '/profile' },
  ];

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between p-4">
      <div>
        <div className="text-blue-500 text-3xl mb-6 pl-2">
          <Link href="/home">
            <span className="font-bold">Bluesky</span>
          </Link>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center p-3 rounded-full hover:bg-gray-800 transition-colors ${
                pathname === item.path ? 'font-bold' : ''
              }`}
            >
              <span className="text-xl mr-4">{item.icon}</span>
              <span className="text-xl">{item.name}</span>
            </Link>
          ))}
          
          <button
            onClick={() => setShowThemeToggle(!showThemeToggle)}
            className="flex items-center p-3 rounded-full hover:bg-gray-800 transition-colors w-full text-left"
          >
            <span className="text-xl mr-4"><FaEllipsisH /></span>
            <span className="text-xl">その他</span>
          </button>
          
          {showThemeToggle && (
            <div className="ml-4 p-2 bg-gray-800 rounded-lg">
              <button
                onClick={toggleTheme}
                className="w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                {theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
              </button>
            </div>
          )}
        </nav>
        
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full w-full transition-colors">
          投稿する
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center p-3 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
          <div className="mr-3">
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
          </div>
          <div>
            <div className="font-bold">ユーザー名</div>
            <div className="text-gray-500">@handle</div>
          </div>
        </div>
      </div>
    </div>
  );
}
