import http from 'http';
import app from './app.js';
import { connect } from '../ride/config/db.config.js';

const server = http.createServer(app);

await connect();

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log("Ride server running on PORT:", PORT);
})