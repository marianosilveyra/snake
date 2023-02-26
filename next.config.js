const nextConfig = {
    experimental: {
        appDir: true,
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack", "react-svg-loader"],
        })

        return config
    },
}

module.exports = nextConfig
