import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Level = (props) => {
  const { spacing = false, reverse = false } = props;
  return (
    <div
      onClick={() =>
        typeof props.onClick === "function" ? props.onClick() : null
      }
      className={classnames(
        "sm:flex flex-row",
        {
          _p_level: props.layout !== "button",
          _p_level_button: props.layout === "button",
          [`space-x-3`]: !spacing,
          [`space-y-3 sm:space-y-0`]: !spacing,
          [`space-x-${spacing}`]: spacing,
          [`space-y-${spacing} sm:space-y-0`]: spacing,
          "space-x-reverse flex-row-reverse": reverse,
          "hover:bg-gray-50 cursor-pointer": props.layout === "button",
        },
        `${props.className ?? ""}`
      )}
    >
      {props.children}
    </div>
  );
};
Level.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  spacing: PropTypes.string,
  layout: PropTypes.string,
  onClick: PropTypes.func,
};

export default Level;
