import { Router } from "express";
import { container } from "tsyringe";
import { ShortnerUrlController } from "../controllers/shortnerUrl.controllers";
import { IsvalidToken } from "../middlewares/IsValidToken.middlewares";
import { IsValidUrl } from "../middlewares/IsValidUrl.middlewares";

const shortnerUrlRouter = Router();
export const shortnerUrlController = container.resolve(ShortnerUrlController);

shortnerUrlRouter.post(
  "/",
  IsValidUrl.execute,
  IsvalidToken.execute,
  shortnerUrlController.create
);

shortnerUrlRouter.get("/:code", shortnerUrlController.get);

export { shortnerUrlRouter };
