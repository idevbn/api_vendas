import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const upadteAvatar = new UpdateUserAvatarService();

    const user = await upadteAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(user);
  }
}

export { UserAvatarController };
