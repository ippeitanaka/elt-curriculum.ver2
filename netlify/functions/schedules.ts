import { Handler } from '@netlify/functions';
import { Client, query as q } from 'faunadb';

const client = new Client({
  secret: process.env.FAUNA_SECRET_KEY || ''
});

export const handler: Handler = async (event) => {
  // CORSヘッダーを設定
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // 共有IDによるデータ取得
    if (event.httpMethod === 'GET' && event.queryStringParameters?.id) {
      const id = event.queryStringParameters.id;
      const result = await client.query(
        q.Get(q.Match(q.Index('schedules_by_share_id'), id))
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.data)
      };
    }

    // 新しい共有データの作成
    if (event.httpMethod === 'POST' && event.body) {
      const schedules = JSON.parse(event.body);
      const shareId = `${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
      
      const result = await client.query(
        q.Create(q.Collection('schedules'), {
          data: {
            schedules,
            shareId,
            createdAt: Date.now()
          }
        })
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ 
          shareId,
          message: '共有URLを生成しました'
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};