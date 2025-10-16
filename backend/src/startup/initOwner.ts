import bcrypt from "bcrypt";
import { User } from "../models/users";
import { config } from "../constants/config";

export const initOwner = async () => {
  const ownerExists = await User.exists({ role: "owner" });

  if (!ownerExists) {
    const password = await bcrypt.hash(config.OWNER_PASSWORD, 12);
    await User.create({
      name: "System Owner",
      email: config.OWNER_MAIL,
      password,
      role: "owner",
    });

    console.log("Default owner created:", config.OWNER_MAIL);
  }
};
