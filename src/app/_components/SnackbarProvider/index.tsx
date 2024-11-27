'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import Snackbar from '../Snackbar';

type SnackbarState = {
  message: string | null;
  show: (message: string, time?: number) => void;
  close: () => void;
};

const SnackbarContext = createContext<SnackbarState>({
  message: null,
  show: () => {},
  close: () => {},
});

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [time, setTime] = useState(3000);

  const show = (text: string, time?: number) => {
    setMessage(text);
    if (time) setTime(time);
  };

  const close = () => setMessage(null);

  return (
    <SnackbarContext.Provider value={{ message, show, close }}>
      {children}
      {message && (
        <Snackbar message={message} show={show} close={close} time={time} />
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

export const useSnackbar = () => useContext(SnackbarContext);
