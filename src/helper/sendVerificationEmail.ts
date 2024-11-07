import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mystry Message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification mail send successfully" };
  } catch (emailError) {
    console.log("Error sending verification mail", emailError);
    return { success: false, message: "Failed to send verification mail" };
  }
}
