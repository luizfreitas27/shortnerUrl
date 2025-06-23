import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
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
    const response = await this.userService.loginUser(res.locals.decodedToken);

    return res.status(200).json(response);
  };

  public getUserProfile = async (req: Request, res: Response) => {
    const response = await this.userService.getUserProfile(
      res.locals.decodedToken.id
    );

    return res.status(200).json(response);
  };

  public getProfiles = async (req: Request, res: Response) => {
    const response = await this.userService.getProfiles();

    return res.status(200).json(response);
  };
}
