import fs from 'fs';
import path from 'path';

// Function to parse CSV and extract dub.sh slugs
function getDubRedirects() {
  try {
    const csvPath = path.join(process.cwd(), 'src/data/dub.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header
    
    const redirects = [];
    
    for (const line of lines) {
      if (line.trim()) {
        const [link] = line.split(',');
        if (link && link.includes('dub.sh/')) {
          // Extract slug from dub.sh URL
          const slug = link.replace('https://dub.sh/', '').trim();
          if (slug) {
            redirects.push({
              source: `/${slug}`,
              destination: `https://dub.sh/${slug}`,
              permanent: true,
            });
          }
        }
      }
    }
    
    return redirects;
  } catch (error) {
    console.error('Error reading dub.csv:', error);
    return [];
  }
}

// Function to get custom redirects from JSON
function getCustomRedirects() {
  try {
    const jsonPath = path.join(process.cwd(), 'src/data/custom.json');
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const customMappings = JSON.parse(jsonContent);
    
    const redirects = [];
    
    for (const [slug, dubSlug] of Object.entries(customMappings)) {
      // Remove 'dub.sh/' prefix if present and add https://
      const cleanDubSlug = dubSlug.replace(/^dub\.sh\//, '');
      redirects.push({
        source: `/${slug}`,
        destination: `https://dub.sh/${cleanDubSlug}`,
        permanent: true,
      });
    }
    
    return redirects;
  } catch (error) {
    console.error('Error reading custom.json:', error);
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alice.aryankeluskar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Note: redirects() doesn't work with static export
  // Redirects will need to be handled via Cloudflare Pages redirects or client-side
  // async redirects() {
  //   const dubRedirects = getDubRedirects();
  //   const customRedirects = getCustomRedirects();
  //   
  //   // Combine both types of redirects
  //   return [...dubRedirects, ...customRedirects];
  // },
};

export default nextConfig;
