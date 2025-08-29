import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      {children}
    </div>
  );
};

export default Modal;
