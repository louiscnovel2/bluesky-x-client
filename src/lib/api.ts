import { BskyAgent } from '@atproto/api';

// Bluesky APIクライアント
export const agent = new BskyAgent({
  service: 'https://bsky.social',
});

// ログイン関数
export async function login(username: string, password: string) {
  try {
    const response = await agent.login({ identifier: username, password });
    return { success: true, data: response };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error };
  }
}

// タイムライン取得関数
export async function getTimeline(limit: number = 20) {
  try {
    if (!agent.session) {
      return { success: false, error: 'Not logged in' };
    }
    
    const response = await agent.getTimeline({ limit });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Timeline fetch error:', error);
    return { success: false, error };
  }
}

// 投稿関数
export async function createPost(text: string, replyTo?: { uri: string; cid: string }) {
  try {
    if (!agent.session) {
      return { success: false, error: 'Not logged in' };
    }
    
    const response = await agent.post({
      text,
      reply: replyTo ? {
        parent: { uri: replyTo.uri, cid: replyTo.cid },
        root: { uri: replyTo.uri, cid: replyTo.cid }
      } : undefined
    });
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Post creation error:', error);
    return { success: false, error };
  }
}

// いいね関数
export async function likePost(uri: string, cid: string) {
  try {
    if (!agent.session) {
      return { success: false, error: 'Not logged in' };
    }
    
    const response = await agent.like(uri, cid);
    return { success: true, data: response };
  } catch (error) {
    console.error('Like error:', error);
    return { success: false, error };
  }
}

// リポスト関数
export async function repostPost(uri: string, cid: string) {
  try {
    if (!agent.session) {
      return { success: false, error: 'Not logged in' };
    }
    
    const response = await agent.repost(uri, cid);
    return { success: true, data: response };
  } catch (error) {
    console.error('Repost error:', error);
    return { success: false, error };
  }
}

// プロフィール取得関数
export async function getProfile(actor: string) {
  try {
    if (!agent.session) {
      return { success: false, error: 'Not logged in' };
    }
    
    const response = await agent.getProfile({ actor });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Profile fetch error:', error);
    return { success: false, error };
  }
}
