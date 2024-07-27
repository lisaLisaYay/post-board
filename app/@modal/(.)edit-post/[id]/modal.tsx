'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal =({ children }: { children: React.ReactNode })=> {
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal">
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Modal