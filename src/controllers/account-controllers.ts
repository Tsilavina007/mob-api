import { RequestHandler } from "express";
import { v4 } from "uuid";

import { AccountServices } from "@/services";
import { errorWrapper } from "@/utilities";
import { AccountValidator } from "@/validator";

export class AccountController {
  static readonly signIn: RequestHandler = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      AccountValidator.create({ username, password });
      const data = await AccountServices.signIn(username, password);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
  static readonly signUp: RequestHandler = async (req, res, next) => {
    try {
      const account = req.body;
      AccountValidator.create(account);
      const createdUser = await AccountServices.singUp(v4(), account);
      res.json(createdUser);
    } catch (err) {
      next(err);
    }
  };
}
