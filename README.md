# CURSO DE NODEJS Y TYPESCRIPT PARA BACKEND

iniciamos creando el package.json con el siguiente comando por consola

    - npm init

Luego instalamos las siguientes dependencias por consola

    - npm install class-validator cors dotenv express morgan mysql typeorm typeorm-naming-strategies typescript

**class-validator:** genera valdadores atravez de decoradores. <br>
**cors:** origen de datos.<br>
**dotenv:** valores de entorno, se crea una para manejar los tipos de entornos.<br>
**express:** genera controladores de rutas api.<br>
**morgan:** muestra por consola los estados y lo que se esta realizando.<br>
**typeorm:** espara trabajar con la coneccion a mysql.<br>

### DEPENDENCIAS DE DESARROLLO

En este caso iniciamos instalando las siguiente dependencias de desarrollo con los siguientes comandos por consola

    - npm install -D @types/cors @types/express @types/morgan concurrently nodemon

despues de este proceso creamos una carpeta llamada src y dentro creamos el archivo server.ts

luego procedemos a crear el archivo de configuracion de typescript con el siguiente comando 

    - tsc init

en este archivo de configuracion ingresamos y vamos a habilitar las siguientes opciones

    - "strict": true,  
    - "strictPropertyInitialization": true, 
    - "experimentalDecorators": true, 
    - "emitDecoratorMetadata": true,
    - "outDir": "./dist", 

**Nota: el directorio que se encuentra en outDir es donde se almacenara el proyecto al construir**

luego crearemos en el archivo server.ts el servidor.

    import express from "express";
    import morgan from "morgan";
    import cors from "cors";

    class ServerBootstrap{
        public app:express.Application=express();
        private port:number=8000

        constructor(){
            this.app.use(express.json());
            this.app.use(express.urlencoded({extended:true}));
            this.app.use(morgan("dev"));
            this.app.use(cors());
            this.listen()
        }

        public listen(){
            this.app.listen(this.port,()=>{
                console.log("server listening on port => "+ this.port);
            });
        }
    }
    
    new ServerBootstrap();


En el package.json nos dirigimos al script y creamos el siguiente 

    - "start":"tsc && node dist/server.js"

## CREACION DE RUTAS

generaremos una ruta provisional para ensayos primitivos, vamos al archivo server.ts y en el constructor 
agregaremos el siguiente comando

    this.app.get("/api/hola",(req,res)=>{
        res.status(200).json({
            message:"Hola mundo!"
        });
    });

Para estar actualizando el servidor vamos al package.json y escribimos el siguiente script

    - "dev":"tsc && concurrently \"tsc -w\" \"nodemon dist/server.js\""

creamos dentro de la carpeta src la carpeta controller y dentro el archivo user.controller.ts y en el agregamos lo siguiente 

    import { Request, Response } from "express";

    export class UserController{
        getUsers(req:Request, res: Response){
            res.status(200).json({
                user: "Elias salazar"
            });
        }
    }

ahora crearemos dentro de la carpeta src la carpeta router y dentro de ella creamos el archivo  router.ts

en este momento ya podemos eliminar la ruta provisional que agregamos en el archivo server.ts y la reemplazamos por la siguiente 

    this.app.use("/api", this.routers());

y fuera del constructor creamos la funcion routers

     routers(): Array<express.Router>{ 
        return [];
    }

en el archivo router.ts agregamos lo siguiente

    import { Router } from "express";

    export class BaseRouter<T> {

        public router: Router;
        public controller:T;

        constructor(TController:{new():T}){
            this.router=Router();
            this.controller= new TController();
            this.routes();
        }

        routes(){}
    }

ahora crearemos el archivo user.router.ts en la carpeta router y agregamos lo siguiente

    import { UserController } from "../controller/user.controler";
    import { BaseRouter } from "./router";

    export class UserRouter extends BaseRouter<UserController>{
        constructor(){
            super(UserController);
        }
        routes(): void {
        this.router.get("/user",(req,res)=>this.controller.getUsers(req,res));
        }
    }

ahora vamos al archivo server.ts y nos dirigimos a el arrive de retorno de la funcion routers y agregamos 

    return [new UserRouter().router];



