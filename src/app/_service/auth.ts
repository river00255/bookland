const sendMagicLink = async (email: string) => {
  const response = await fetch(`/api/account/magiclink`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

const sendEmail = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  const response = await fetch(`/api/account/sendmail`, {
    method: 'POST',
    body: JSON.stringify({ email, username }),
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

const registerAccount = async (token: string) => {
  const response = await fetch(
    `/api/account/sendmail/register?token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return await response.json();
};

const verifyEmail = async (token: string) => {
  const response = await fetch(`/api/account/magiclink/verify?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

export { sendMagicLink, sendEmail, verifyEmail, registerAccount };
