import http from 'http';
import app from './app.js';
import {connect} from './config/db.config.js';
const server = http.createServer(app);

await connect();

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log("Captain service running on PORT:", PORT)
});