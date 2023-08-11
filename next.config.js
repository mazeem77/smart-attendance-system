/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TIMEOUT_DURATION: process.env.JWT_TIMEOUT_DURATION,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
  }
}

module.exports = nextConfig
