
import { useState } from 'react'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useEventStore } from '../../features/events/store'

export function EventEditorDrawer() {
  const editing = useEventStore(s=>s.editing)
  const save = useEventStore(s=>s.save)
  const [draft, setDraft] = useState(editing || null)

  if (!editing) return null
  if (!draft) setDraft(editing)

  return (
    <Dialog open={!!editing} onClose={()=>useEventStore.setState({ editing: null })}>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Edit event</h3>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" defaultValue={editing?.title} onChange={(e)=>setDraft({ ...(draft as any), title: e.target.value })} />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={()=>useEventStore.setState({ editing: null })} className="bg-slate-200 text-slate-900">Cancel</Button>
          <Button onClick={()=>draft && save(draft)}>Save</Button>
        </div>
      </div>
    </Dialog>
  )
}
