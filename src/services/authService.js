
const API_URL = 'https://herspace-qpl9.onrender.com/api/auth';

async function sendRequest(endpoint, payload) {
  let response;

  try {
    response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      'Unable to connect to HerSpace. Please try again.'
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong.');
  }

  return data.user;
}

export async function registerUser({ fullName, email, password }) {
  return sendRequest('register', { fullName, email, password });
}

export async function loginUser({ email, password }) {
  return sendRequest('login', { email, password });
}

export function logoutUser() {
  // Backend token/session support will be added separately.
}

export function getSession() {
  // Do not restore a fake localStorage login session.
  return null;
}
