// import { buildRoutePath } from "./build-route-path";
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"


const tasks = []


export const routes = [
    {
        method:'GET',
        path: buildRoutePath('/tasks'),
        handler:(req, res)=>{
            return res
                .setHeader('Content-Type','application/json')
                .end(JSON.stringify(tasks))
        }
    },
    {
        method:'POST',
        path: buildRoutePath('/tasks'),
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
    {
        method:'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler:(req, res)=>{
            const { id } = req.params

            const task = tasks.filter((task)=>{
                return task.id === id
            })
            
            console.log(task[0])

            return res.end('')
        }
    },
]