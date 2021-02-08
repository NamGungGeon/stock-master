import React from "react";
import PropTypes from "prop-types";

const EmptySafeZone = ({ data, render, children, renderWhenEmpty }) => {
  if (data) {
    if (Array.isArray(data)) {
      if (data.length) return children ?? render();
    } else {
      return children ?? render();
    }
  }
  return renderWhenEmpty();
};

EmptySafeZone.propTypes = {
  data: PropTypes.any,
  render: PropTypes.oneOfType([PropTypes.func, PropTypes.object, null]),
  renderWhenEmpty: PropTypes.oneOfType([PropTypes.func, PropTypes.object, null])
};
EmptySafeZone.defaultProps = {
  render: () => <div />,
  renderWhenEmpty: () => (
    <p className={"align center explain"}>데이터가 없습니다</p>
  )
};

export default EmptySafeZone;
