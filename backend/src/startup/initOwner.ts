import bcrypt from "bcrypt";
import { User } from "../models/users";
import { config } from "../constants/config";
import { permission } from "../types/schemas";

export const initOwner = async () => {
  const ownerExists = await User.exists({ role: "owner" });

  const permission: permission = {
    access: true,
    create: true,
    update: true,
    delete: true,
  };

  if (!ownerExists) {
    await User.updateOne(
      { role: "owner" },
      {
        $setOnInsert: {
          name: "System Owner",
          email: config.OWNER_MAIL,
          password: await bcrypt.hash(config.OWNER_PASSWORD, 12),
          role: "owner",
          groups: [],
          lastLogin: Date.now(),
          permissions: {
            students: permission,
            users: permission,
            dashboard: permission,
            expences: permission,
            income: permission,
            groups: permission,
            history: permission,
          },
        },
      },
      { upsert: true }
    );

    console.log("Default owner created:", config.OWNER_MAIL, `"${config.OWNER_PASSWORD}"`);
  }
};
