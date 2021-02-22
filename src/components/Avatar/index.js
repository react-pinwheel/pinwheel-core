import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Avatar = (props) => {
  const {
    layout = "image",
    src = "",
    text = "",
    size = false,
    circle = false,
    rounded = false,
    notification = false,
    colorNotification = false,
    sizeNotification = false,
    positonNotification = "top-right",
  } = props;
  const decorateImg = () => {
    return {
      [`w-10 h-10`]: !size,
      [`w-${size} h-${size}`]: size,
      "rounded-lg": rounded,
      "rounded-full": circle,
    };
  };
  const decorateNotification = () => {
    return {
      [`bg-gray-300`]: !colorNotification,
      [`w-2.5 h-2.5`]: !sizeNotification,
      [`bg-${colorNotification}-300`]: colorNotification,
      [`w-${sizeNotification} h-${sizeNotification}`]: sizeNotification,
      "top-0 right-0": positonNotification === "top-right",
      "bottom-0 right-0": positonNotification === "bottom-right",
      "bottom-0 left-0": positonNotification === "bottom-left",
      "top-0 left-0": positonNotification === "top-left",
    };
  };
  return (
    <div className="relative _p_avatar">
      {layout === "image" && (
        <img
          className={classnames(
            decorateImg(),
            "_p_avatar_img",
            `${props.className ?? ""}`
          )}
          src={src}
          alt=""
        />
      )}
      {layout === "text" && (
        <span
          className={classnames(
            decorateImg(),
            "_p_avatar_text inline-flex items-center justify-center bg-gray-500",
            `${props.className ?? ""}`
          )}
        >
          <span className="text-sm font-medium leading-none text-white">
            {text}
          </span>
        </span>
      )}
      {notification && (
        <span
          className={classnames(
            decorateNotification(),
            "_p_avatar_notification absolute block ring-2 rounded-full ring-white",
            `${props.classNameNotification ?? ""}`
          )}
        ></span>
      )}
    </div>
  );
};
Avatar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  classNameNotification: PropTypes.string,
  notification: PropTypes.bool,
  layout: PropTypes.oneOf(["image", "text"]),
  colorNotification: PropTypes.string,
  positonNotification: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  sizeNotification: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
