import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
function Register () {

    const [userInfo , setUserInfo] = useState({
        name:"",phone:"",password:"",confirm_password:""
    })


    const [status , setStatus] = useState(false);

    const navigate = useNavigate();
    const [error , setError] = useState("");
    

    function handleChange(e){
        
        setUserInfo({...userInfo , [e.target.name] : e.target.value})
    }

    async function handleSubmit(e){
        
        try{
            e.preventDefault();
            let url = 'https://voosh-backend-jriu.onrender.com/api/v1/add-user';
            let user = await axios.post(url,userInfo);
            
            navigate('/login-user');
            
        }
        catch(err){
            console.log("Error while POST req ",err);
            if(
                err.response && 
                err.response.status >=400 && 
                err.response.status<=500
                ){
                    setError(err.response.data.message);
                }
        }
    }

    return (
        <>
            {
                status && <h1 style={{textAlign:'center',color:'blueviolet'}}>Loading......</h1>
            }
        <Form className="Form h-100 px-5 py-3 mx-auto" onSubmit={handleSubmit}>
            <h1 style={{textAlign:'center'}}> User Registration </h1>

            {error && <span  className="text-danger">{error}</span>}
            <FormGroup className="my-3">
                <FormLabel >Name</FormLabel>
                <FormControl type="text" required={true} onChange={handleChange} name="name" value={userInfo.name}  placeholder="Enter Your Name"></FormControl>
            </FormGroup>

            <FormGroup className="my-3">
                <FormLabel >Phone</FormLabel>
                <FormControl type="text" required={true} onChange={handleChange} name="phone" value={userInfo.phone}  placeholder="Must Be 10 digit" ></FormControl>
            </FormGroup>

            <FormGroup className="my-3">
                <FormLabel >Password</FormLabel>
                <FormControl type="password" required={true} onChange={handleChange} name="password" value={userInfo.password}  placeholder="Enter Strong Password"></FormControl>
            </FormGroup>

            <FormGroup className="my-3">
                <FormLabel >Confirm Password</FormLabel>
                <FormControl type="password" required={true} onChange={handleChange} name="confirm_password" value={userInfo.confirm_password}  placeholder="Confirm Your Password" ></FormControl>
            </FormGroup>

            <Button onClick={()=>setStatus(true)}  style={{backgroundColor:'#09382c',fontWeight:'bolder'}} className="w-100 mb-2" type="submit" >Register</Button>
            
        </Form>
        </>
    )
}

export default Register;