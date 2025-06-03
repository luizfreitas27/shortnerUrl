import { Request, Response } from "express";
import { UserService } from "../services/user.services";

export class UserController {
  private userService = new UserService();

  public registerUser = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.registerUser(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
}
