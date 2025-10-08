import { Router } from "express";
import routesTodo from "../modules/todo/todo.routes";

const globalRouter = Router();

globalRouter.use("/todo", routesTodo);
export default globalRouter;
