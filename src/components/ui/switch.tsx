
import { InputHTMLAttributes } from 'react'

export function Switch(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" role="switch" aria-checked={props.checked} {...props} />
}
