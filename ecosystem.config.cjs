// PM2: pm2 start ecosystem.config.cjs && pm2 save
module.exports = {
  apps: [
    {
      name: "xuala-landing",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1, // giữ 1 tiến trình: giới hạn gửi form đang lưu trong bộ nhớ
      exec_mode: "fork",
      env: { NODE_ENV: "production", PORT: 3000 },
      max_memory_restart: "400M",
    },
  ],
};
