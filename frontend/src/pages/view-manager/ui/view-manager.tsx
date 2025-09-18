import { useParams } from "react-router"

export function ViewManager(){

  const {id} = useParams()

  return <div>${id}</div>
}
