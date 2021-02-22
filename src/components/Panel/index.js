import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const Panel = ({ layout = false, ...props }) => {
  return (
    <div
      className={classnames(
        `_p_panel relative`,
        {
          "bg-white border border-gray-200 divide-gray-200 p-4 _p_panel_default":
            !layout || layout === "default",
          "bg-red-100 border-red-400 text-red-600 divide-red-200 p-4 _p_panel_error":
            layout === "error",
          "bg-yellow-100 border-yellow-400 text-yellow-600 divide-yellow-200 p-4 _p_panel_warning":
            layout === "warning",
          "bg-green-100 border-green-400 text-green-600 divide-green-200 p-4 _p_panel_success":
            layout === "success",
          "bg-white divide-gray-200 shadow-md p-4 border border-gray-200 _p_panel_paper":
            layout === "paper",
          "bg-gray-100 border-4 border-gray-200 border-dashed p-4 _p_panel_dashed":
            layout === "dashed",
        },
        `${props.className ?? ""}`
      )}
      onClick={() =>
        typeof props.onClick === "function" ? props.onClick() : null
      }
    >
      {props.children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  layout: PropTypes.oneOf([
    "error",
    "success",
    "warning",
    "default",
    "paper",
    "dashed",
  ]),
  onClick: PropTypes.func,
  style: PropTypes.any,
};

export default Panel;
