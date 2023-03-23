import http from "node:http"
import { json } from "./middlewares/json.js"

const tasks = []


const server = http.createServer(async(req,res)=>{
    
    const { method, url, body} = req

    await json(req,res)

    console.log(method,url)

    if(method === 'GET' && url === '/tasks'){
        return res
        .setHeader('Content-Type','application/json')
        .end(JSON.stringify(tasks))
    } 

    if(method === 'POST' && url === '/tasks'){
        const {body} = req
        tasks.push(body)
        // return res.writeHead(204)
    }
    
    
    return res.end().writeHead(404)
})

server.listen(3333)