import React from "react";
import { TOGGLE_MODAL } from "../../actions/actionType";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const closeModal = (store) => {
  store.dispatch({ type: TOGGLE_MODAL, payload: {} });
};

const ModalClearIcon = (props) => {
  return (
    <img
      alt="clear-icon"
      src="/assets/images/clear.png"
      onClick={() => closeModal(props)}
    />
  );
};

ModalClearIcon.propTypes = {
  modal: PropTypes.arrayOf(PropTypes.any),
};

ModalClearIcon.defaultProps = {
  modal: [],
};

export default connect()(ModalClearIcon);
