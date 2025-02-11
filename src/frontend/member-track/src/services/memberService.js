const API_URL = 'https://localhost:5001/api/member';

export const createMember = async (member) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(member),
  });
  if (!response.ok) {
    throw new Error('Failed to create member');
  }
  return response.json();
};


export const fetchMembers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch members');
  }
  return response.json();
};