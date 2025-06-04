For setting Cookie in the browser

In backend - you need to whitelist the domain name 

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));

In Frontend - In axios, you have to give another object

const res = await axios.post("http://localhost:7777/login", {emailId, password}, {withCredentials: true} )