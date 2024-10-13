import { useState } from 'react';

const useModal = () => {
  const [popup, setPopup] = useState(false);

  const openModal = () => setPopup(true);

  const closeModal = () => setPopup(false);

  return { popup, openModal, closeModal };
};

export default useModal;
