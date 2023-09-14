import { UserController } from "../controller/user.controler";
import { BaseRouter } from "./router";

export class UserRouter extends BaseRouter<UserController>{
    constructor(){
        super(UserController);
    }
    routes():void{
        this.router.get('/user',(req, res)=>this.controller.getUsers(req, res));
    }
}