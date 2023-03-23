export async function json(req, res){
    
    const buffer = []

    for await (const chunck of req){
        buffer.push(chunck)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffer).toString())
    }
    catch{
        req.body = null
    }

    // res.setHeader('Content-Type', 'application/json')

}