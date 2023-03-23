import http from "node:http"

const tasks = []


const server = http.createServer((req,res)=>{
    
    const { method, url} = req

    if(method=== 'GET' && url === '/tasks'){
        return res
        .setHeader('content-type','application/json')
        .end(JSON.stringify(tasks))
    } 
    
    
    return res.end().writeHead(404)
})

server.listen(3333)