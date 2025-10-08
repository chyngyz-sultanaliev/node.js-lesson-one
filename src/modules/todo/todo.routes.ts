import { Router } from "express";
import todoControllers from "./todo.controllers";

const routes = Router();

routes.get("/get-all", todoControllers.getAllData); 
routes.post("/add", todoControllers.addNewData);
routes.put("/update/:id", todoControllers.updateData);
routes.patch("/update/:id", todoControllers.updateData);
routes.delete("/delete/:id", todoControllers.deleteData);
export default routes;
