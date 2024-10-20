import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import GoalForm from "../components/GoalForm"

const Dashbord = () => {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])


  return (
    <>
      <h1>{user && user.name}</h1>
      <p>Goals Dashboard</p>
      <GoalForm />
    </>
  )
}

export default Dashbord