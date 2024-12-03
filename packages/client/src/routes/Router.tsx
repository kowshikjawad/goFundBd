import { Routes, Route } from "react-router";

const Router = () => {
  return (
    <Routes>
      <Route index element={<>This is home page</>} />
    </Routes>
  );
};

export default Router;
