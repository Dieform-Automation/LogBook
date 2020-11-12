import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, content }) =>
  isShowing
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
            <div className="relative bg-white max-w-4xl rounded p-4 center">
              <div className="flex justify-end">
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
              {content}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
