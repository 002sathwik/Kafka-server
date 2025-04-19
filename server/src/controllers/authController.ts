import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
type LoginPayloadType = {
  name: string;
  email: string;
  password?: string;
  provider: string;
  oauth_id: string;
  image?: string;
};

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;

      if (!body.email || !body.name || !body.provider || !body.oauth_id) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password || "", 
            provider: body.provider,
            oauth_id: body.oauth_id,
            image: body.image || "",
          },
        });
      }

      const JWTPayload = {
        name: findUser.name,
        email: findUser.email,
        image: findUser.image,
        provider: findUser.provider,
        oauth_id: findUser.oauth_id,
        id: findUser.id,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "365d",
      });

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: findUser.id,
          email: findUser.email,
          name: findUser.name,
          image: findUser.image,
          provider: findUser.provider,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Login Error:", error); 
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
