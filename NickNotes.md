# Nick's notes

### Running the app
- Server
    - After cloning the project into a directory of your choice, navigate to the `finmid-challenge`
    - Run the command `pnpm install`
    - Once the node modules have finished installing, run the command `pnpm create-data`
        - This will create mock data to use for the project
    - Now run the command `pnpm run backend`
    - Now the server will be running at `http://localhost:3000`
- Frontend
    - Open a new terminal window
    - Run `pnpm run start`
    - This will open a tab in your browser at `http://localhost:3300`
    - You can now login using one of these accounts:
        ```
        Users and passwords:
        gandalf.the.grey@test.com / 123code
        frodo.baggins@test.com / 123code
        gollum@test.com / 123code
        ```
    - To run tests, run the command `npx jest`

    - Up at the top you will see your user's name and profile picture, the SME they belong to, and a button to logout. There is a switch to change the application into dark mode, if that's what you prefer.
    - You can navigate the transactions and click on one to see more details. You are also able to filter the transactions by their status, except for the 'REVERSED' status.
    - Your login will expire after 1 day, and your browser will save your login status across multiple tabs, as well as save your dark mode preference. This means that if you open a new tab and go to `http://localhost:3300/dashboard`, if you have logged in on another page you can access this, however if you are not logged in you will be redirected to `http://localhost:3300/login`


### Common practices if this application was bigger
- There should be an `.env` file to save the API urls  
- Restrict CORS origins to trusted domains in production and avoid using wildcard * for credentials
- Use environment variables to switch CORS settings between development and production
- Add more tests and separate them into specific folders
- Paginate the transactions
- Use a state management library like Redux
- Add a Docker file
- Automate tests to run when code is pushed
- Add tracking events to monitor errors, user behavior, etc.
- Create a more complex theming library
- Separate frontend components into being reusable

### Potential API security issue
- The JWT payload contains user data, which could include sensitive information if not filtered properly

