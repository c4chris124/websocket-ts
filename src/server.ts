import express, { Express } from "express";
import cors from "cors"
import morgan from "morgan"
import { createServer, Server as HttpServer} from 'http'
import { Server as SocketIOServer } from "socket.io";
import { socketController } from "./controllers/socket/socket.controller";


class Server {
  private app: Express;
  private port: string | number;
  private httpServer: HttpServer
  private io: SocketIOServer;
  public paths: {
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.httpServer = createServer(this.app)
    this.io = new SocketIOServer(this.httpServer, {})
    // Routes paths
    this.paths = {
    };
    //  connection db
    this.connectDB();
    // Middleware
    this.middleware();
    // App routes
    this.routes();

    // Sockets
    this.sockets()
  }

  // DB connections
  private async connectDB() {
  }

  private middleware() {
    // CORS
    this.app.use(cors());
    // Read and parse body
    this.app.use(express.json());
    // Public dir
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes() {

  }

  sockets() {
    this.io('connection', socketController)
  }



  public listen() {
    this.httpServer.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }
}

export default Server;
