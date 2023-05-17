import fs from 'node:fs/promises'

const databasePath = new URL('../db.json',import.meta.url)

export class Database {
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf-8').then(data=>{
        this.#database = JSON.parse(data)
    })
    .catch(()=>{
        this.#persist()
    })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, id){
    let data = this.#database[table] ?? []

    if(id){
      data = data.filter((task)=>{
        return task.id == id
      })
    }


    return data 
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    }else{
      this.#database[table] = [data]
    }

    this.#persist()
    return data;
  }

  delete(table, id){
    const tasks = this.#database[table]

    const atualizatedTasks = tasks.filter((data)=>{
      return data.id != id
    })

    // console.log(atualizatedTasks)

    this.#database[table] = [...atualizatedTasks]

    this.#persist()
  }


  update(table, id, data) {
    const index = this.#database[table].findIndex(row => row.id === id)


    if(index>= -1){
      const row = this.#database[table][index]

      this.#database[table][index] = {id, ...row, ...data}

      
      if(!data.completed_at ){
        const date = new Date() 

        const formatedDate = date.toISOString().split('T')[0] //2023-03-23

        const updated_at = formatedDate
        this.#database[table][index].updated_at = updated_at
      }

      this.#persist()
    }
  }

}