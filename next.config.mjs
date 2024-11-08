/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images:{
        domains:['cdn-icons-png.flaticon.com', 'https://res.cloudinary.com'],
        unoptimized:true
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
