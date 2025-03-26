const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;

export async function fetchFromGAS() {
  try {
    const response = await fetch(GAS_URL || '', {
      method: 'GET',
      mode: 'cors',
    });
    if (!response.ok) throw new Error('データの取得に失敗しました');
    return await response.json();
  } catch (error) {
    console.error('Error fetching from GAS:', error);
    throw error;
  }
}

export async function postToGAS(data: { id: string; name: string }) {
  try {
    const response = await fetch(GAS_URL || '', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('データの送信に失敗しました');
    return await response.json();
  } catch (error) {
    console.error('Error posting to GAS:', error);
    throw error;
  }
} 