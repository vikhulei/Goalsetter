import { Outlet } from 'react-router-dom'
import './App.css'

const Layout = () => {
    return (
    <div  style={{"marginTop": "6rem"}}>
        <Outlet />
    </div>
    )
}

export default Layout