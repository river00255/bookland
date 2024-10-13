'use client';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="error">
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
