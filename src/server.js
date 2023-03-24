import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./route.js"



const server = http.createServer(async(req,res)=>{
    
    const { method, url} = req

    await json(req,res)

    const route = routes.find(route=>{
        return route.method === method && route.path.test(url)
    })


    if(route){

        const routeParams = req.url.match(route.path)

        const params = routeParams.groups

        // console.log(routeParams.groups)
        req.params = params

        route.handler(req,res)
    }

 
    
})

server.listen(3333)