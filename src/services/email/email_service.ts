import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const sendEmail = async (to: string, program_name: string, subject: string, strHtml: string): Promise<void> => {
    const smtpConfig = {
        host: process.env.smtp_host,
        port: Number(process.env.smtp_port),
        secure: false,
        auth: {
            user: program_name,
            pass: "",
        },
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    try {
        await transporter.sendMail({
            from: program_name,
            to: to,
            subject: subject,
            html: strHtml,
        });
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error; 
    }
};
const sendEmailHandler = async (req: Request, res: Response) => {
    const { strUseremail, strProgramname, strSubject, strHtml }: { 
        strUseremail: string; 
        strProgramname: string; 
        strSubject: string; 
        strHtml: string; 
    } = req.body;

    try {
        await sendEmail(strUseremail, strProgramname, strSubject, strHtml);
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ success: false, error: "Unexpected error occurred." });
    }
};

export default { sendEmailHandler };
