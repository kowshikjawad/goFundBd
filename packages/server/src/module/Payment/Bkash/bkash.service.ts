import { v4 as UUID4 } from "uuid";

import axios from "axios";
import prisma from "../../../config/database";

let donationId: string = "";

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
  bkashToken: string,
  donation_id: string
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

  donationId = donation_id;
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
  if (data.statusCode === "0000") {
    const result = await prisma.payment.create({
      data: {
        donation_id: donationId,
        payment_method: "Bkash",
        payment_status: "Completed",
        transaction_amount: Number(data.amount),
        transaction_date: new Date(),
        BkashPayment: {
          create: {
            bkashPaymentID: data.paymentID,
            trxID: data.trxID,
            transactionStatus: data.transactionStatus,
            amount: data.amount,
            paymentExecuteTime: data.paymentExecuteTime,
            merchantInvoiceNumber: data.merchantInvoiceNumber,
            payerReference: data.payerReference,
            customerMsisdn: data.customerMsisdn,
            payerAccount: data.payerAccount,
            statusCode: data.statusCode,
            statusMessage: data.statusMessage,
          },
        },
      },
    });
    donationId = "";
    return result;
  }
};

const bkashPaymentService = {
  createBkashPaymentService,
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

// model Payment {
//   payment_id         String        @id @default(uuid())
//   donation_id        String
//   payment_method     PaymentMethod
//   payment_status     PaymentStatus
//   transaction_date   DateTime      @default(now())
//   transaction_amount Float
//   donation           Donation      @relation(fields: [donation_id], references: [donation_id])
//   BkashPayment       BkashPayment?
// }
