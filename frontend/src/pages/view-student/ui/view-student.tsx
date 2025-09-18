import { useParams } from "react-router"

export function ViewStudent(){
  const {id} = useParams()

  return <div>viewving : {id} </div>
}
