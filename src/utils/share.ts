import { Schedule } from '../types/schedule';

const API_URL = '/.netlify/functions/schedules';

export async function generateShareableUrl(schedules: Schedule[]): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(schedules),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('共有URLの生成に失敗しました');
    }

    const data = await response.json();
    if (!data.shareId) {
      throw new Error('共有IDが取得できませんでした');
    }

    return `${window.location.origin}/s/${data.shareId}`;
  } catch (error) {
    console.error('Failed to generate shareable URL:', error);
    throw error;
  }
}

export async function getSharedData(shareId: string): Promise<Schedule[]> {
  try {
    const response = await fetch(`${API_URL}?id=${shareId}`);
    
    if (!response.ok) {
      throw new Error('共有データの取得に失敗しました');
    }

    const data = await response.json();
    if (!data.schedules) {
      throw new Error('スケジュールデータが見つかりません');
    }

    return data.schedules;
  } catch (error) {
    console.error('Failed to get shared data:', error);
    throw error;
  }
}