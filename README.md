# Frontend

- Create a Vite + React Applications
- Remove all necessary code from Vite Applications
- Install the tailwindcss and daisyUI depandancies
- Create a Navbar.js
- Install the react-router-dom
- Create BrowserRouter > Routes > Route=/Body > RouteChildren
- Create an Outlet in Body component.
- Create a Footer component inside the Body.js
- To create a Login Components
- Install the axios
- CORS - Install in backend => add middleware to with configurations: origin, credentionals: true,
- Whenever you are making an API call so pass => {withCredentials: true}
- Install the react-redux and redux-toolkit
- Create a configureStore => Provider => createSlice => add reducer to store
- Login and see if your data is coming properly in the store
- Update the Navbar while login the user
- Refector our code to add constants file + create a components folder
- It shouldn't be access other routes without login
- If token is not present, redirect user to login page
- Logout  Feature
- Get the feed and add the feed in the store
- build the UserCard on feed
- Edit profile feature
- Show Toast Message on save of profile
- New page - See all my connections
- New page - See all my connection requestions
- Features - Accept/Reject connection request
- Features - send/ignore the user card from the feed.



    # Deployement

    - SignUp on AWS
    - Launch Instance
    - chmod 400 <secret>.pem
    - ssh -i "DevTinder-Secret.pem" ubuntu@ec2-65-0-169-225.ap-south-1.compute.amazonaws.com
    - Install the exact version of node.js
    - git clone 
        - Frontend
            - npm install -> Depandancies
            - npm run build
            - sudo apt update
            - sudo apt install nginx
            - sudo systemctl start nginx
            - sudo systemctl enable nginx
            - copy code from dist(build files) to /var/www/html
            - sudo scp -r dist/* /var/www/html
            - enable PORT :80 of your instance

