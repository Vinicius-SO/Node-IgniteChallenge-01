// import { buildRoutePath } from "./build-route-path";
import { randomUUID } from "node:crypto"


const tasks = []


export const routes = [
    {
        method:'GET',
        path: '/tasks',
        handler:(req, res)=>{
            return res
                .setHeader('Content-Type','application/json')
                .end(JSON.stringify(tasks))
        }
    },
    {
        method:'POST',
        path: '/tasks',
        handler:(req, res)=>{
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
            return res.writeHead(201).end()
        }
    },
]