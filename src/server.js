import { randomUUID } from "node:crypto"
import http from "node:http"
import { json } from "./middlewares/json.js"

const tasks = []


const server = http.createServer(async(req,res)=>{
    
    const { method, url, body} = req

    await json(req,res)

    if(method === 'GET' && url === '/tasks'){
        return res
        .setHeader('Content-Type','application/json')
        .end(JSON.stringify(tasks))
    } 

    if(method === 'POST' && url === '/tasks'){
        const {body} = req

        const date = new Date()

        const formatedDate = date.toISOString().split('T')[0] //2023-03-23

        const completTasksInfos = {
            "id": randomUUID(),
            ...body,
            "created_at": formatedDate,
            "completed_at": null,
            "updated_at": null
        }
        tasks.push(completTasksInfos)
        res.writeHead(201)
    }
    
    
    return res.end().writeHead(404)
})

server.listen(3333)