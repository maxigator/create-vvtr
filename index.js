#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createProject(projectName, includeRouter) {
  console.log(`Creating a new Vue 3 + Vite + TailwindCSS project named ${projectName}...`);
  execSync(`npm create vite@latest ${projectName} -- --template vue`, { stdio: 'inherit' });

  process.chdir(projectName);
  console.log('Installing Tailwind CSS...');
  execSync('npm install -D tailwindcss@latest postcss@latest autoprefixer@latest && npx tailwindcss init -p', { stdio: 'inherit' });

  if (includeRouter.toLowerCase() === 'yes') {
    console.log('Installing Vue Router...');
    execSync('npm install vue-router@4', { stdio: 'inherit' });
  }

  console.log('Project setup complete!');
  console.log(`Navigate into your new project with 'cd ${projectName}' and run 'npm run dev' to start.`);
}

rl.question('Project name: ', (projectName) => {
  rl.question('Do you want to include Vue Router? (yes/no): ', (includeRouter) => {
    createProject(projectName, includeRouter);
    rl.close();
  });
});
