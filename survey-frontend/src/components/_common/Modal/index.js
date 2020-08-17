import React, { useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import './Modal.scss';

ReactModal.setAppElement('#voomsway');

const Modal = ({ isOpen = false, children }) => {
  const targetElement = useRef(null);
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }
    return clearAllBodyScrollLocks;
  },[isOpen]);
  return (
    <div ref={targetElement}>
      <ReactModal
        isOpen={isOpen}
        overlayClassName="v-way-overlay container-fluid"
        className="v-way-modal"
      >
        {children}
      </ReactModal>
    </div>
  );
};
export default Modal;
