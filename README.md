# Getting Started with MeetCode App

This is the repository containing the code for the Front End part of the project.

## Steps to Run the Project.

To run the MeetCode app, follow these steps:

### 1. Download the code from both the front end and back end repositories.

Download the code from this repository and [the backend repository](https://github.com/krishsingla06/meetcode-backend).

### 2. Changes in the `env` file of both the folders.

Search the env files in both the front end and back end code folders. Search for `REACT_APP_API_URL` and `REACT_APP_YJS_WS_URL` in the env file of front end code, and `FRONTEND_URL` in the env file of back end code.

Replace `10.61.21.64` with your IP address.

To get your IP address, 

On Windows: Go to the Command Prompt and run the command `ipconfig`. Look for IPv4 Address under your network adapter (usually something like `192.168.x.x`).

On macOS: Open the terminal and type `ipconfig getifaddr en0`.

### 3. Run these commands in the terminal.

Open the front end and back end code in the editor. Run the following commands in both the terminals.

`npm i --legacy-peer-deps`

`npm start`

This will open the `localhost` link in your web browser.

Instead of the localhost, run the link `https://{IP_Add}:3000` in the browser. (Replace `IP_Add` with the IP Address of your device.)
