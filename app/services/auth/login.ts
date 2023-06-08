import axios from 'axios';

export const login = async (email: string, password: string) => {
  const tokens: { access: string; refresh: string } = await axios
    .post(
      '/api/auth/login/stock',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(res => res.data);
  return tokens;
};
