const { name } = require("./package.json");
const path = require("path");

module.exports = {
  apps: [
    {
      name,
      script: path.resolve(
        __dirname,
        "./dist/werewolf-backend/src/index.js"
      ),
      instances: 1,
      autorestart: false,
      watch: true,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
