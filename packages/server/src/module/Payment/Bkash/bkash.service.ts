import { v4 as UUID4 } from "uuid";

import axios from "axios";
import prisma from "../../../config/database";

//   async createPayment(amount) {
//     const { data } = await axios.post(
//       process.env.bkash_create_payment_url,
//       {
//         mode: "0011",
//         payerReference: " ",
//         callbackURL: "http://localhost:5000/api/bkash/payment/callback",
//         amount: amount,
//         currency: "BDT",
//         intent: "sale",
//         merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
//       },
//       { headers: await this.getBkashHeaders() }
//     );
//     return data;
//   }

//   async executePayment(paymentID) {
//     const { data } = await axios.post(
//       process.env.bkash_execute_payment_url,
//       { paymentID },
//       { headers: await this.getBkashHeaders() }
//     );
//     return data;
//   }

//   async savePayment(userId, paymentID, trxID, date, amount) {
//     return paymentModel.create({
//       userId,
//       paymentID,
//       trxID,
//       date,
//       amount: parseInt(amount),
//     });
//   }

//   async findPaymentByTrxID(trxID) {
//     return paymentModel.findOne({ trxID });
//   }

//   async refundTransaction(payment, trxID) {
//     const { data } = await axios.post(
//       process.env.bkash_refund_transaction_url,
//       {
//         paymentID: payment.paymentID,
//         amount: payment.amount,
//         trxID,
//         sku: "payment",
//         reason: "cashback",
//       },
//       { headers: await this.getBkashHeaders() }
//     );
//     return data;
//   }
// }

export const getBkashHeaders = async (id_token: string) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: id_token,
    "x-app-key": process.env.bkash_api_key,
  };
};

export const createBkashPaymentService = async (
  amount: string,
  bkashToken: string
) => {
  const { data } = await axios.post(
    process.env.bkash_create_payment_url!,
    {
      mode: "0011",
      payerReference: " ",
      callbackURL: process.env.BKashCallback_URL,
      amount: amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "Inv" + UUID4().substring(0, 5),
    },
    { headers: await getBkashHeaders(bkashToken) }
  );

  return data;
};

export const executeBkashPaymentService = async (
  paymentID: string,
  bkashToken: string
) => {
  const { data } = await axios.post(
    process.env.bkash_execute_payment_url!,
    { paymentID },
    { headers: await getBkashHeaders(bkashToken) }
  );
  console.log(data);
};

export const getBkashPaymentService = async () => {
  const result = await prisma.bkash.findMany();
  return result;
};

const bkashPaymentService = {
  createBkashPaymentService,
  getBkashPaymentService,
  executeBkashPaymentService,
};

export default bkashPaymentService;

// {
//   paymentID: 'TR001129RKQft1733595647501',
//   trxID: 'BL810L3JAX',
//   transactionStatus: 'Completed',
//   amount: '1100',
//   currency: 'BDT',
//   intent: 'sale',
//   paymentExecuteTime: '2024-12-08T00:22:02:285 GMT+0600',
//   merchantInvoiceNumber: 'Inv043c2',
//   payerType: 'Customer',
//   payerReference: ' ',
//   customerMsisdn: '01619777282',
//   payerAccount: '01619777282',
//   statusCode: '0000',
//   statusMessage: 'Successful'
// }
