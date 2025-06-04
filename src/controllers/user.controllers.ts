import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
  // private userService = new UserService();
  constructor(@inject(UserService) private userService: UserService) {}

  public registerUser = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.registerUser(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  public loginUser = async (req: Request, res: Response) => {
    const response = await this.userService.loginUser(
      res.locals.userLoginResult
    );

    return res.status(200).json(response);
  };
}
