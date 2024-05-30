import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    distDir: './dist',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  }
 
export default withNextIntl(nextConfig)