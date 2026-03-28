"use server";

export async function checkAdminCredentials(user: string, pass: string) {
  // Check against Environment Variables
  // Make sure to add ADMIN_USER and ADMIN_PASS to your .env.local
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    return { success: true };
  }
  return { success: false, error: "Invalid credentials" };
}
