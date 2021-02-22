import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Transition } from "@headlessui/react";

const Modal = (props) => {
  const {
    open = false,
    onClose = () => {},
    clickOutToClose = true,
    size = false,
  } = props;
  const myRef = useRef(null);

  useEffect(() => {
    const eventClick = (e) => {
      let targetElement = e.target;
      do {
        if (targetElement === myRef.current) {
          // click inside
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      // click outside
      onClose();
    };

    if (open) {
      clickOutToClose && window.addEventListener("click", eventClick);
    } else {
      window.removeEventListener("click", eventClick);
    }
    // cleanup
    return () => {
      window.removeEventListener("click", eventClick);
    };
  }, [open]);

  return (
    <>
      <Transition
        show={open}
        enter="ease-out duration-300"
        enterFrom="opacity-0 z-0"
        enterTo="opacity-100 z-50"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 z-50"
        leaveTo="opacity-0 z-0"
      >
        <div className={`fixed h-screen inset-0 overflow-y-auto`}>
          <div className="flex items-end justify-center h-full sm:items-center">
            <div className="fixed inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 _p_modal_overlay"></div>
            </div>

            <div
              ref={myRef}
              className={classnames(
                "relative text-left bg-white shadow-xl w-screenp-4 focus-within:overflow-hidden _p_modal sm:w-full p-6",
                {
                  "sm:max-w-md": size === "xs",
                  "sm:max-w-xl": size === "sm",
                  "sm:max-w-2xl": !size || size === "md",
                  "sm:max-w-4xl": size === "lg",
                  "sm:max-w-6xl": size === "xl",
                  "w-screen h-screen": size === "full",
                }
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="_p_modal_body">{props.children}</div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
Modal.propTypes = {
  children: PropTypes.any,
  classNameName: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  clickOutToClose: PropTypes.bool,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

export default Modal;
