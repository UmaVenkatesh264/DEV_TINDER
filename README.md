For setting Cookie in the browser

In backend - you need to whitelist the domain name 

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));

In Frontend - In axios, you have to give another object

const res = await axios.post("http://localhost:7777/login", {emailId, password}, {withCredentials: true} )

-----------------------------------------------------------------------------------------------------------------

create an account on AWS - hectic process but mandatory
search EC2 instance
click launch an instance
select OS
create key - one file will download
launch the instance - success
click on the instance ID and wait for success status 
after success click on ID and click connect
select SSH client

open gitbash and go to downloads folder - because the file downloaded is in this folder
use the commands that are in SSH client

Now we have to download the node in VM, for that use "nvm" commands - open nodejs downloads page 
better to use the version same as in the local to avoid conflicts

From GitHub, clone both UI and backend projects

For UI:

after cloning, run npm install -> to install dependencies
after that run -> npm run build -? we can see a dist folder created by the command "ls"
sudo apt update -> to updates the system
sudo apt install nginx 
sudo systemctl start nginx
sudo systemctl enable nginx

copy code from dist(build files) to var/www/html ->  sudo scp -r dist/* /var/www/html


Go to AWS
in our instance page, go to security tab
In that click on the security group, edit the inbound rules -  add rule - port range (80 due to nginx) and select 0.0.0.0/0 from dropdown
save the rules

open the public IP address that visible on instance page - if our UI appears on screen then success :)


For Backend:

got to backend project, run npm install
to see the git logs -> git log command 
after cloning when you make any changes in code and then push the code to GitHub , then we have to pull it in the terminal also -> git pull
npm run start -> to start the backend app

Go to AWS
in our instance page, go to security tab
In that click on the security group, edit the inbound rules -  add rule - port range (7777) and select 0.0.0.0/0 from dropdown
save the rules

open the public IP address (IP:7777/feed)  - if you get response on screen then success :)

we can't keep the terminal always running npm start right, so that we need PM2 -> PM2 is a daemon process manager that will help you manage and keep your application online 24/7
npm install pm2 -g

then we need to run -> pm2 start npm --start

to check the logs -> pm2 logs
to clear the logs -> pm2 flush <name>
for all the list of pm2 instances -> pm2 list
for stopping -> pm2 stop <name>
for deleting -> pm2 delete <name>

for renaming ->  pm2 start npm --name "<new name>" -- start

now frontend deployed and it works , backend deployed and it works -> but the integration is not completed


    Frontend = http://43.204.96.49/
    Backend = http://43.204.96.49:7777/

    Domain name = devtinder.com => 43.204.96.49

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api


for this we need to edit the nginx config, the open it -> sudo nano /etc/nginx/sites-available/default

    nginx config : 

    server_name 43.204.96.49;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

now restart nginx

sudo systemctl restart nginx

now go to /api instead of :7777 -> it will work 

Modify the BASE_URL in react code from localhost:7777 to /api and merge it

go to frontend project -> now git pull the latest 

npm run build 

sudo scp -r dist/* /var/www/html
