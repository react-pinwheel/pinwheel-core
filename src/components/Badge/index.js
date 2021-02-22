import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Badge = (props) => {
  const { color = false, size = false } = props;

  return (
    <span
      class={classnames(
        "_p_badge inline-flex items-center font-medium bg-gray-100 text-gray-800",
        {
          "bg-gray-100 text-gray-800": !color,
          [`bg-${color}-100 text-${color}-800`]: color,
          "px-2.5 py-0.5 rounded-full text-xs": !size || size === "md",
          "px-3 py-1 rounded-full text-sm": size === "lg",
          "px-4 py-1.5 rounded-full text-base": size === "xl",
        }
      )}
    >
      {props.children}
    </span>
  );
};
Badge.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(["md", "lg", "xl"]),
};

export default Badge;
