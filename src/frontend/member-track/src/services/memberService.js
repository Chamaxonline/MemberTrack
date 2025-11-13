const API_URL = 'https://localhost:7210/api/member';

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

export const fetchRegNumber = async () => {
  const response = await fetch(`${API_URL}/RegNumber`);
  if (!response.ok) {
    throw new Error('Failed to fetch registration number');
  }
  return response.json();
};