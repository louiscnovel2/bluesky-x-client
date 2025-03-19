'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/layout/Sidebar';
import { FaSearch } from 'react-icons/fa';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 min-h-screen">
            {/* サイドバー */}
            <div className="md:col-span-1 lg:col-span-1 hidden md:block border-r border-gray-800">
              <Sidebar />
            </div>
            
            {/* メインコンテンツ */}
            <div className="md:col-span-2 lg:col-span-3 border-r border-gray-800">
              {children}
            </div>
            
            {/* 右サイドバー */}
            <div className="md:col-span-1 lg:col-span-2 hidden lg:block p-4">
              <div className="sticky top-4">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="検索"
                    className="w-full bg-gray-800 rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4 mb-6">
                  <h2 className="font-bold text-xl mb-4">トレンド</h2>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="cursor-pointer hover:bg-gray-700 p-2 rounded">
                        <div className="text-gray-500 text-sm">トレンド {i}</div>
                        <div className="font-bold">#トレンドトピック{i}</div>
                        <div className="text-gray-500 text-sm">{i}K 投稿</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-4">
                  <h2 className="font-bold text-xl mb-4">おすすめユーザー</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                          <div>
                            <div className="font-bold">ユーザー{i}</div>
                            <div className="text-gray-500">@user{i}</div>
                          </div>
                        </div>
                        <button className="bg-white text-black px-4 py-1 rounded-full font-bold hover:bg-gray-200 transition-colors">
                          フォロー
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* モバイルナビゲーション */}
            <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2 flex justify-around md:hidden">
              <button className="p-3 text-xl"><FaSearch /></button>
              <button className="p-3 text-xl"><FaSearch /></button>
              <button className="p-3 text-xl"><FaSearch /></button>
              <button className="p-3 text-xl"><FaSearch /></button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
