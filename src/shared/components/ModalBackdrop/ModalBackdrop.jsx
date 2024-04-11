import { useCallback, useEffect, useState } from 'react';
import s from './ModalBackdrop.module.scss';
import clsx from 'clsx';

const ModalBackdrop = ({ children, onClose }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setActive(true), 300);
  }, []);

  const dinamicStyle = clsx(s.backdrop, active && s.active);

  const handleCloseModal = useCallback(
    (e) => {
      if (e.target === e.currentTarget || e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
      document.body.removeAttribute('style');
    };
  }, [handleCloseModal]);
  let h1, h2, h3;

  h1 = window.innerHeight;
  h2 = document.body.clientHeight;
  h3 = screen.height;
  return (
    <div className={dinamicStyle} onClick={handleCloseModal}>
      <div style={{ color: 'red' }}>
        h1 {h1}
        h2 {h2}
        h3 {h3}
      </div>
      {children}
    </div>
  );
};

export default ModalBackdrop;
