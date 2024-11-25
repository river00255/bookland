// const magicLinkSignin = async (email: string) => {
//   const response = await fetch('/api/auth/signin/email', {
//     method: 'POST',
//     body: JSON.stringify({ email }),
//     headers: { 'Content-Type': 'application/json' },
//   });
//   console.log(response);
//   return response;
// };

const sendMagicLink = async (email: string) => {
  const response = await fetch(`/api/sendmail`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

const verifyEmail = async (token: string) => {
  const response = await fetch(`/api/sendmail/verify?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

export { sendMagicLink, verifyEmail };
