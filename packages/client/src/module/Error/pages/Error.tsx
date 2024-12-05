import React from "react";

const ErrorPage: React.FC = () => {
  const searchData = new URLSearchParams(window.location.search);
  const message = searchData.get("message");
  return <div>payment {message}</div>;
};

export default ErrorPage;
