import { createConnection } from "typeorm";

createConnection().then(() => console.log("Sucessfully database connect"));