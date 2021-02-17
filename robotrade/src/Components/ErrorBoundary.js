import React, { useState, useEffect } from "react";
import { ErrorBoundary as ErrorBound } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  return <ErrorBound FallbackComponent={ErrorFallback}>{children}</ErrorBound>;
};

export default ErrorBoundary;
