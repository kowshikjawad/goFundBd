import React from "react";
import { trpc } from "../../../lib/trpc";

const Home: React.FC = () => {
  const mutation = trpc.bkash.createBkashPayment.useMutation();
  const { data: users } = trpc.user.getUser.useQuery();
  const { data, refetch } = trpc.bkash.callBack.useQuery();

  // console.log(users.data);
  // console.log(bkashCallBack.data);

  // const handleQuery = () => {
  //   const { data: result } = trpc.user.getUser.useQuery();
  //   console.log(result);
  // };

  console.log(data, users);

  const handlePay = async () => {
    const amount = "1100";
    const donation_id = "1";
    mutation.mutate(
      { amount, donation_id },
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
