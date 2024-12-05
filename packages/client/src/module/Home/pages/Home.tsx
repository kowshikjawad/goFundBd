import React from "react";
import { trpc } from "../../../lib/trpc";

const Home: React.FC = () => {
  const mutation = trpc.bkash.createBkashPayment.useMutation();

  const handlePay = async () => {
    const amount = "1100";
    mutation.mutate(
      { amount },
      {
        onSuccess: (response: any) => {
          console.log("Payment successful:", response);
          window.location.href = response?.data?.bkashURL;
        },
        onError: (error) => {
          console.error("Error occurred during payment:", error);
        },
      }
    );
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handlePay}>Click to Pay</button>
    </div>
  );
};

export default Home;
