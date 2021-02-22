import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Transition } from "@headlessui/react";

const Dropdown = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(props.hover);
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
      setOpen(false);
    };

    const eventHover = (e) => {
      let targetElement = e.target;
      do {
        if (targetElement === myRef.current) {
          setOpen(true);
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      // hover outside
      setOpen(false);
    };
    if (hover) window.addEventListener("mouseover", eventHover);

    if (open) {
      window.addEventListener("click", eventClick);
    } else {
      window.removeEventListener("click", eventClick);
    }
    // cleanup
    return () => {
      window.removeEventListener("click", eventClick);
      window.removeEventListener("mouseover", eventHover);
    };
  }, [open, hover]);

  return (
    <div className="relative" ref={myRef}>
      <button
        className={classnames(
          "_p_dropdown outline-none focus:outline-none transition duration-150 ease-in-out text-center",
          `${props.btnClass ?? ""}`
        )}
        onClick={() => setOpen(!open)}
      >
        {props.trigger}
      </button>

      <Transition
        show={open}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          className={classnames(
            "_p_dropdown_drop absolute shadow-lg mt-0 z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 min-w-max flex flex-col",
            `${props.dropClass ?? ""}`
          )}
        >
          {props.dropItems}
        </div>
      </Transition>
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  btnClass: PropTypes.string,
  dropClass: PropTypes.string,
  style: PropTypes.any,
  trigger: PropTypes.any,
  dropItems: PropTypes.any,
  hover: PropTypes.bool,
};

Dropdown.defaultProps = {};

export default Dropdown;
