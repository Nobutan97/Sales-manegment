const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;

export async function fetchFromGAS() {
  const response = await fetch(GAS_URL || '');
  if (!response.ok) throw new Error('データの取得に失敗しました');
  return await response.json();
}

export async function postToGAS(data: any) {
  const response = await fetch(GAS_URL || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('データの送信に失敗しました');
  return await response.json();
} 