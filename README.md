# Akorda - Developer - Contract Assembly
### Reference Implementation

This project provides a simple *Express* (Node.js) server reference implementation for developers learning about integrating Akorda's Contract Assembly feature into third-party environments.

#### Getting Started
First, clone this repository to your local file system.

Second, run either `yarn install` or `npm install` to add the necessary dependencies (including the `@akordacorp/assembly` package) to your project.

Third, create a file at the root of the project named `.env` and add the following content to define your environment variables:

```
PORT=3000
AKORDA_APP_URL=
AKORDA_CLIENT_ID=
AKORDA_CLIENT_SECRET=
USE_PROXY=true
```

Ask your Akorda representative for the values specific to your account, specifically:

* AKORDA_APP_URL
* AKORDA_CLIENT_ID
* AKORDA_CLIENT_SECRET

The proper values must be added before taking the next step.

Finally, run `yarn start` or `npm run start`. This will start the web server on the port specified in your environment variables (defaults to 3000).

Open a browser and go to `http://localhost:3000` (substituting a different port as needed)

#### Note
* This project has been tested on MacOS. If you are running Windows, we should make some adjustments. Ask your Akorda representative for assistance.