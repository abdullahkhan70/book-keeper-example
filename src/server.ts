import express, { Request, Response, NextFunction } from 'express';
import Mongoose from 'mongoose';
import http from 'http';
import { config } from './config/config';
import Logging from './library/Logging';
const app = express();
import authorRoutes from './routes/AuthorRoutes';
import bookRoutes from './routes/BookRoutes';

Mongoose.connect(config.mongo.url)
    .then(() => {
        Logging.info(`The Database is connected at PORT: ${config.server.port}`)
        startServer();
    })
    .catch((error) => { Logging.error(`Unable to connect: ${error}`) })

const startServer = () => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        // Log the Request
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

        // Log the Response
        res.on("finish", () => {
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
        })

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules for our APIs */

    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json();
        }
        next();

        /** Routes */
        app.use('/authors', authorRoutes);
        app.use('/books', bookRoutes);

        /** Check whether everything is working or not!*/
        app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ message: "Ping is successfully" });
        })

        /** Error Handling */
        app.use((req: Request, res: Response, next: NextFunction) => {
            const error = new Error('The route is not found!');
            Logging.error(error.message);
            res.status(404).json({ message: error.message });
            next();
        });

    });
    http.createServer(app).listen(config.server.port, () => Logging.info(`The server is running on Port ${config.server.port}`))
}