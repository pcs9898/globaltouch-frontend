module.exports = {
  apps: [
    {
      name: "globaltouch-frontend",
      script: "node_modules/next/dist/bin/next",
      autorestart: true,
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
