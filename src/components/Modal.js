import React from 'react';
import ReactDOM from 'react-dom';
import Proptypes from 'prop-types';

const Modal = ({ isShowing, hide, title, children }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50" />
          <div
            className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto outline-none"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="relative bg-white max-w-3xl rounded-md p-4 center">
              <div className="flex justify-between items-center px-4">
                <h2 className="font-bold text-2xl tracking-tight">{title}</h2>
                <button
                  type="button"
                  className="text-2xl text-black"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  isShowing: Proptypes.bool,
  hide: Proptypes.func,
  title: Proptypes.string,
  children: Proptypes.node,
};

export default Modal;
