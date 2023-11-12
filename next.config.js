/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // 去掉 `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  // output: 'standalone',
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    //这里的配置既可以服务端获取到，也可以在浏览器端获取到
    NODE_ENV_API: process.env.NODE_ENV_API || 'prod',
  },
};

module.exports = nextConfig;
