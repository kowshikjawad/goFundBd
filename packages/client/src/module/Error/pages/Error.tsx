import React from "react";

const ErrorPage: React.FC = () => {
  const searchData = new URLSearchParams(window.location.search);
  const message = searchData.get("message");
  return <div>Error {message}</div>;
};

export default ErrorPage;
