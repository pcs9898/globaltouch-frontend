module.exports = {
  apps: [
    {
      name: "globaltouch-frontend",
      script: "node_modules/next/dist/bin/next",
      exec_mode: "cluster",
      instances: 0,
      autorestart: true,
    },
  ],
};
