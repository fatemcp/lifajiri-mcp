#!/usr/bin/env node
const { spawn } = require('child_process');

const SERVER_URL = 'https://mcp.fatemcp.com/lifajiri/mcp';

const child = spawn('npx', ['-y', 'mcp-remote', SERVER_URL], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code);
});
