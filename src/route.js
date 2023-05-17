// import { buildRoutePath } from "./build-route-path";
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"

import { Database } from './database.js'


const database = new Database ()

export const routes = [
    {
        method:'GET',
        path: buildRoutePath('/tasks'),
        handler:(req, res)=>{

            const tasks = database.select('tasks')

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
            database.insert('tasks',completTasksInfos)

            return res.writeHead(201).end()
        }
    },
    {
        method:'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler:(req, res)=>{
            const { id } = req.params

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method:'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler:(req, res)=>{
            const { id } = req.params

            const { title, description} = req.body

            const date = new Date()

            const formatedDate = date.toISOString().split('T')[0] //2023-03-23

            const data = {
                title,
                description,
                date: formatedDate
            }

            const [tasks] = database.select('tasks', id)

            if(!tasks){
                return res.writeHead(404).end()
            }

            database.update('tasks', id, data )


            return res.writeHead(204).end()
        }
    },
    {
        method:'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler:(req, res)=>{
            const { id } = req.params

           const taskExist = database.select('tasks', id)
   
           if(!taskExist){
            return res.writeHead(404).end
           }

           const date = new Date() 

           const formatedDate = date.toISOString().split('T')[0] //2023-03-23

           const isTaskCompleted = !! taskExist.completed_at
           const completed_at = isTaskCompleted ? null : formatedDate

           database.update('tasks', id, { completed_at })

            return res.writeHead(204).end()
        }
    }
]
