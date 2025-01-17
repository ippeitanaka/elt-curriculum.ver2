import { Schedule } from '../types/schedule';

const API_URL = '/.netlify/functions/schedules';

export async function fetchSchedules(): Promise<Schedule[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch schedules');
  }
  return response.json();
}

export async function saveSchedules(schedules: Schedule[]): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(schedules),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to save schedules');
  }
}