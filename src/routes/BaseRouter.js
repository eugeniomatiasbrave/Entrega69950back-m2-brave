import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.js";
import { executePolicies } from "../middlewares/policies.js";
import handlerSend from "../middlewares/handler.send.js";

export default class BaseRouter {

    constructor(){
        this.router = Router();
        this.init()
    }

    init(){}//Servirá para la inicialización de los hijos

    getRouter(){
        return this.router;
    }

    get(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.get(path, handlerSend ,passportCall('current'),executePolicies(policies), this.applyCallbacks(callbacks));
    }
    post(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.post(path, handlerSend ,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }
    put(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.put(path, handlerSend ,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }
    delete(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.delete(path, handlerSend ,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    };
   
    applyCallbacks(callbacks){
        return callbacks.map((callback)=>async(...params)=>{
            if (typeof callback !== 'function') {
                throw new TypeError(`Callback is not a function: ${callback}`);
            }
            try{
                await callback.apply(this,params);
            }catch(error){
                console.log(error);
                params[1].status(500).send({status:"error",error:`${error.name} ${error.message}`});
            }
        })
    }
};