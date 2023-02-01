import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar} from 'react-bootstrap'

import './NavBar.css';
function NavvBar(props) {

    const navigate = useNavigate();

    let user = props.user;
    let setUser = props.handleUser;
    let url ='';
    if(user){
        url = `/get-order/${user.data.data.id}`;
    }

    return(
        <>
            <Navbar bg="light" variant="light">
                <Container className="cont">
                    <Navbar.Brand >V-UI</Navbar.Brand>
                        {
                            (user) ? 
                            <Nav>
                                <NavLink className="m-1" to=''>{user.data.data.name}</NavLink>
                                <NavLink className="m-1" to='/add-order'>Add Order</NavLink>
                                <NavLink className="m-1" to= {url} >All Orders</NavLink>
                                <NavLink className="m-1" onClick={()=>{
                                    localStorage.removeItem("access");
                                    localStorage.removeItem("id");
                                    setUser("");
                                    navigate('/login-user');
                                    
                                }}>Logout</NavLink>
                            </Nav>
                                    :
                            <Nav className="ml-auto">
                                <NavLink className="m-1" to=''>Home</NavLink>
                                <NavLink className="m-1" to='/login-user'>LogIn</NavLink>
                                <NavLink className="m-1" to='/add-user'>Register</NavLink>    
                            </Nav>
                        }
                </Container>
            </Navbar>
        </>
    )
}

export default NavvBar;