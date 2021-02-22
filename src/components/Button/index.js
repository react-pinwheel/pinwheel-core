import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const Button = ({
  size = false,
  color = false,
  layout = false,
  shadow = false,
  light = true,
  dark = false,
  rounded = false,
  ...props
}) => {
  const decorateButton = () => {
    switch (layout) {
      case "text": {
        return {
          [`hover:text-gray-500`]: !color,
          [`hover:text-${color}-500`]: color,
          "text-sm font-medium": !size || size === "md",
          "text-xs font-medium": size === "sm" || size === "xs",
          "text-base font-medium": size === "lg" || size === "xl",
          _p_button_text: true,
        };
      }
      case "bordered": {
        return {
          "border-solid border": true,
          [`border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-200`]: !color,
          [`border-${color}-500 text-${color}-700 hover:bg-${color}-100 active:bg-${color}-200`]: color,
          "shadow-md hover:shadow-md": shadow,
          "rounded-lg": rounded,

          "text-sm font-medium px-4 py-2": !size || size === "md",
          "text-xs font-medium px-3 py-2": size === "sm",
          "text-xs font-medium px-2.5 py-1.5": size === "xs",
          "text-base font-medium px-4 py-2": size === "lg",
          "text-base font-medium px-6 py-3": size === "xl",
          _p_button_bordered: true,
        };
      }
      case "contained": {
        return {
          [`bg-gray-500 hover:bg-gray-600`]: !color,
          [`bg-${color}-500 hover:bg-${color}-600`]: color,
          "text-white": light && !dark,
          "text-black": dark,

          "shadow-lg hover:shadow-md": shadow,
          "rounded-lg": rounded,

          "text-sm font-medium px-4 py-2": !size || size === "md",
          "text-xs font-medium px-3 py-2": size === "sm",
          "text-xs font-medium px-2.5 py-1.5": size === "xs",
          "text-base font-medium px-4 py-2": size === "lg",
          "text-base font-medium px-6 py-3": size === "xl",
          _p_button_contained: true,
          "border border-transparent": true,
        };
      }
      default:
        return {
          [`bg-gray-500 hover:bg-gray-600`]: !color,
          [`bg-${color}-500 hover:bg-${color}-600`]: color,
          "text-white": light && !dark,
          "text-black": dark,

          "shadow-lg hover:shadow-md": shadow,
          "rounded-lg": rounded,

          "text-sm font-medium px-4 py-2": !size || size === "md",
          "text-xs font-medium px-3 py-2": size === "sm",
          "text-xs font-medium px-2.5 py-1.5": size === "xs",
          "text-base font-medium px-4 py-2": size === "lg",
          "text-base font-medium px-6 py-3": size === "xl",
          _p_button_contained: true,
          "border border-transparent": true,
        };
    }
  };

  return (
    <button
      onClick={() =>
        typeof props.onClick === "function" ? props.onClick() : null
      }
      style={{ ...props.style }}
      className={classnames(
        decorateButton(),
        "_p_button inline-flex justify-center items-center outline-none focus:outline-none transition duration-150 ease-in-out",
        `${props.className ?? ""}`
      )}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  color: PropTypes.string,
  layout: PropTypes.oneOf(["text", "bordered", "contained"]),
  className: PropTypes.string,
  rounded: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  shadow: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
};

export default Button;
