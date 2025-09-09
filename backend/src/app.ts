import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { router as auth } from "./routes/authRoute";
import { router as user } from "./routes/userRoute";
import { router as student } from "./routes/studentRoute";
import { router as group } from "./routes/groupRoute";
import { router as lesson } from "./routes/lessonRoute"; 
import CustomError from "./services/CustomError";
import { NOT_FOUND, TOO_MANY_REQUESTS } from "./constants/httpCodes";
import { TOOMANYREQUEST } from "./constants/errors";
import { catchError } from "./controllers/errorController";

// CorsOptions
const cortOptions: CorsOptions = {
  origin: ["https://localhost:5173", "frotendfromdb"],
  credentials: true,
};

// Limit for api call from one api
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // for each IP
  message: {
    status: TOO_MANY_REQUESTS,
    error: TOOMANYREQUEST,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Initializing app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(cortOptions));
app.use(helmet());
app.use(limit);
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Hello from Middleware👋");
  next();
});

// Routes
app.use("/v1/auth", auth);
app.use("/v1/users", user);
app.use("/v1/students", student);
app.use("/v1/groups", group);
app.use("/v1/lessons", lesson);
// Global 404 handler
app.use("*splat", (req: Request, _res: Response, next: NextFunction) => {
  next(
    new CustomError(`Can't reach ${req.originalUrl} on this server`, NOT_FOUND)
  );
});


//check github branch
// ErrorCatcher
app.use(catchError);

export { app };
