const port = process.env.PORT ||3000;
const server = require("../app");


server.listen(port, ()=>{
    console.log("Listen on port " + port);
})