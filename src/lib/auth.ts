import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [process.env.APP_URL!],

  plugins: [
    admin()
  ],

  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email/?token=${token}`
        const info = await transporter.sendMail({
          from: '"Skill Bridge" <skillbridge@ph.com>',
          to: user.email,
          subject: "Please verify your email!",
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:8px;overflow:hidden;
                 box-shadow:0 4px 10px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb;color:#ffffff;padding:20px;text-align:center;">
              <h1 style="margin:0;font-size:24px;">Prisma Blog</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px;color:#333333;">
              <h2>Verify your email address</h2>

              <p style="font-size:16px;line-height:1.6;">
               Hello ${user.name} <br /> <br />
                Thanks for signing up! Please confirm your email address.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${verificationUrl}"
                  style="background:#2563eb;color:#ffffff;
                         text-decoration:none;padding:14px 28px;
                         border-radius:6px;font-size:16px;
                         font-weight:bold;display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px;color:#555;">
                Or copy and paste this link:
              </p>

              <p style="word-break:break-all;font-size:14px;">
                <a href="${verificationUrl}" style="color:#2563eb;">
                  ${url}
                </a>
              </p>

              <p style="font-size:14px;color:#777;">
                If you didn’t create this account, ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f6f8;padding:15px;
                       text-align:center;font-size:12px;color:#777;">
              © ${new Date().getFullYear()} Prisma Blog
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`
        });

        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error(err)
        throw err;
      }

    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});