import express, {Request, Response, NextFunction} from "express";
import nunjucks from "nunjucks";
import 'express-async-errors';
import "./DAO/ConnectionFactory";
import routes from "./routes";

const app = express();

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: app
});

app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Global error handling
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  // if (err instanceof AppError) {
  //   return response.status(err.statusCode).json({
  //     message: err.message
  //   })
  // }

  console.error(err)

  response.render('error-500.html');
})

app.listen(8080, () => console.log("Server started"));