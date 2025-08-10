
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const outDir = join(process.cwd(), 'public')
mkdirSync(outDir, { recursive: true })

const now = new Date()
const events = []
for (let i=0;i<500;i++) {
  const start = new Date(now.getFullYear(), now.getMonth(), (i%28)+1, (i%10)+8, 0, 0)
  const end = new Date(start.getTime() + (60 + (i%4)*30)*60000)
  events.push({
    id: `seed-${i}`,
    calendarId: i%2===0? 'c1':'c2',
    title: `Mock Event ${i+1}`,
    start: start.toISOString(),
    end: end.toISOString(),
    status: (['backlog','planned','done'] as const)[i%3],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

writeFileSync(join(outDir, 'seed-events.json'), JSON.stringify(events, null, 2))
console.log('Seeded public/seed-events.json with', events.length, 'events')
