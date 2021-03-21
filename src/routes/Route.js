import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RouteWrapper = ({
  component: Component,
  isPrivate,
  signed,
  ...rest
}) => {
  if (isPrivate && !signed) {
    return <Redirect to='/' />;
  }

  if (!isPrivate && signed) {
    return <Redirect to='/dashboard' />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  signed: PropTypes.bool,
  isPrivate: PropTypes.bool
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

const mapStateToProps = state => ({
	signed: state.app.signed
});

export default connect(mapStateToProps)(RouteWrapper);
