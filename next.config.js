/** @type {import('next').NextConfig} */
//https://youtu.be/PjYWpd7xkaM?t=7872
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

module.exports = nextConfig
