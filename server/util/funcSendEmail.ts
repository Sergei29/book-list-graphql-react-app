import nodemailer, { SendMailOptions } from "nodemailer";
import { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD } from "../constants";
import { EmailContentType } from "../types";

/**
 * @description The credentials for the email account you want to send mail from.
 */
const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_EMAIL_PASSWORD,
  },
};

/**
 * @description Getting Nodemailer all setup with the credentials for when the function is called.'sendEmail()'
 */
const transporter = nodemailer.createTransport(credentials);

/**
 * @description util function to send email from server
 * @param {String} strEmailTo destination email
 * @param {Object} objContent email content
 * @returns {Promise<void>} promise that resolves to undefined on success
 */
export const funcSendEmail = async (
  strEmailTo: string,
  objContent: EmailContentType
) => {
  const objContacts = {
    from: ADMIN_EMAIL,
    to: strEmailTo,
  };

  const objEmail: SendMailOptions = { ...objContacts, ...objContent };

  try {
    const mixedSentMessageInfo = await transporter.sendMail(objEmail);
    console.log(`mixedSentMessageInfo: `, mixedSentMessageInfo);
  } catch (error) {
    console.log("Error sending email: ", error.messsage);
  }
};
