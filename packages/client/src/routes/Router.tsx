import { Routes, Route } from "react-router";
import { ErrorPage, Home, Success } from "../module";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default Router;
