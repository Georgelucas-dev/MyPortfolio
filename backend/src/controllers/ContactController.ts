import { Request, Response, NextFunction } from "express";
import { contactSchema } from "../schemas/contact.schema";
import { EmailService } from "../services/EmailService";

export class ContactController {
  static async send(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = contactSchema.parse(req.body);
      await EmailService.send(parsed);

      res
        .status(200)
        .json({ success: true, message: "Mensagem enviada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}
