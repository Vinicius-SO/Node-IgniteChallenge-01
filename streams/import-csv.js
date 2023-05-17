import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 // skip the header line
});


export async function getCsvInfos(){
  const lines = stream.pipe(csvParse)

for await (const line of lines){
  const [title, description] = line

  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  
  fetch('http://localhost:3333/tasks',{
    method:'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title,
      description
    })
  })
}
}
