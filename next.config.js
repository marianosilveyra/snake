const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "react-svg-loader"],
    })

    return config
  },
  experimental: {
    allowMiddlewareResponseBody: true,
  },
}

module.exports = nextConfig
