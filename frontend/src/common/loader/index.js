import React from "react";
import PropTypes from "prop-types";
import Lottie from "react-lottie";
import * as animationData from "./loader.json";
import { spawn } from "child_process";

// set display name for component
const displayName = "CommonLoader";

// validate component properties
const propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

const defaultProps = {
  isLoading: true
};

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };
    return (
      <span />
      // <Lottie options={defaultOptions} height={400} width={400}/>
    );
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

LoadingComponent.displayName = displayName;
LoadingComponent.propTypes = propTypes;
LoadingComponent.defaultProps = defaultProps;

export default LoadingComponent;
