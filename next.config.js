module.exports = {
  images: {
    domains: ['localhost', 'longwintershadows.com', 'api.longwintershadows.com'],
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      },
      {
        test: /react-spring/,
        sideEffects: true,
      },
    )

    return config
  },
}
