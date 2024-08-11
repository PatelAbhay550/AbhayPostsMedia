// pages/api/auth/callback.js

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db"; // Adjust import based on your setup

export const GET = handleAuth(async (req, res) => {
  try {
    const user = req.user; // Assumed from Kinde Auth
    console.log("Authenticated user:", user);

    if (user) {
      // Check if user exists in database
      const existingUser = await prisma.user.findUnique({
        where: { username: user.username },
      });

      if (!existingUser) {
        // Create new user if they don't exist
        const newUser = await prisma.user.create({
          data: {
            username: user.username,
            isAuthenticated: true,
          },
        });
        console.log("New user created:", newUser);
      } else {
        // Optionally update user details
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            isAuthenticated: true,
          },
        });
        console.log("User updated:", updatedUser);
      }
    } else {
      console.error("No user data found");
    }

    // Proceed with Kinde Auth handling
    return handleAuth(req, res);
  } catch (error) {
    console.error("Error handling auth callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
