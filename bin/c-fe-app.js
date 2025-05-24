#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import process from "process";

function isValidProjectName(name) {
  // Valid: lowercase letters, numbers, hyphens only, no spaces
  return /^[a-z0-9\-]+$/.test(name);
}

async function askProjectName() {
  while (true) {
    const { appName } = await inquirer.prompt([
      {
        type: "input",
        name: "appName",
        message: "Enter a project name:",
        validate: (input) => {
          if (!input) {
            return "Project name cannot be empty";
          }
          if (!isValidProjectName(input)) {
            return "Project name must be lowercase letters, numbers or dashes only, no spaces";
          }
          return true;
        },
      },
    ]);

    if (isValidProjectName(appName)) {
      return appName;
    }
  }
}

async function main() {
  let appName = process.argv[2];

  if (!appName || !isValidProjectName(appName)) {
    console.log("Project name missing or invalid.");
    appName = await askProjectName();
  }

  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Which frontend framework would you like to use?",
      choices: [
        "React (CRA)",
        "Next.js",
        "Vite",
        "Gatsby",
        "Docusaurus",
        "Remix",
        "Preact",
        "Svelte",
        "Vue",
        "Nuxt",
        "Astro",
        "Reactstrap",
        "Exit",
      ],
    },
  ]);

  if (framework === "Exit") {
    console.log("Exited.");
    process.exit(0);
  }

  let command;

  switch (framework) {
    case "React (CRA)":
      command = `npx create-react-app@latest ${appName}`;
      break;
    case "Next.js":
      command = `npx create-next-app@latest ${appName}`;
      break;
    case "Vite":
      command = `npm create vite@latest ${appName}`;
      break;
    case "Gatsby":
      command = `npx gatsby@latest new ${appName}`;
      break;
    case "Docusaurus":
      command = `npx create-docusaurus@latest ${appName} classic`;
      break;
    case "Remix":
      command = `npx create-remix@latest --yes --project-name ${appName}`;
      break;
    case "Preact":
      command = `npx preact-cli@latest create default ${appName}`;
      break;
    case "Svelte":
      command = `npm create svelte@latest ${appName}`;
      break;
    case "Vue":
      command = `npm init vue@latest ${appName}`;
      break;
    case "Nuxt":
      command = `npx nuxi@latest init ${appName}`;
      break;
    case "Astro":
      command = `npm create astro@latest ${appName}`;
      break;
    case "Reactstrap":
      command = `npx create-react-app@latest ${appName} && cd ${appName} && npm install reactstrap bootstrap`;
      break;
    default:
      console.log("Unsupported framework.");
      process.exit(1);
  }

  console.log(`\nCreating ${framework} app...\n`);
  execSync(command, { stdio: "inherit", shell: true });
}

main();
