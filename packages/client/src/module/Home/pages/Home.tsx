import React from "react";
import { trpc } from "../../../lib/trpc";

const Home: React.FC = () => {
  const mutation = trpc.bkash.createBkashPayment.useMutation();

  const pay = () => {
    const amount = "1100";
    const data: any = mutation.mutate({ amount });
    window.location.href = data.bkashURL;
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={pay}>Click to Pay</button>
    </div>
  );
};

export default Home;
