// src/services/routes.ts
import express from "express";
import emailService from "./email/email_service";

const routes = express.Router();

routes.post("/api/sendmail", emailService.sendEmailHandler);

export default routes;
