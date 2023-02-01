import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios';
function AddOrder (){

    const [order , setOrder] = useState({
        sub_total :"", phone : ""
    })

    const [status , setStatus] = useState(false);
    const [error , setError] = useState("");

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        
        setOrder({...order , [name]:value})
    }

    async function handleSubmit(e){
        try{

            e.preventDefault();
            let url = 'https://voosh-backend-jriu.onrender.com/api/v1/add-order';
            const token = localStorage.getItem('access');
            //set JWT token in Headers
            let headers = {'authentication' :token}
            
            let orders = await axios.post(url,order,{headers});
            
            setStatus(false);
            setOrder({
                sub_total :"", phone : ""
            })
            
        }
        catch(err){
            console.log("Error while adding order ",err);
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
            <Form className="Form p-5 mx-auto" onSubmit={handleSubmit}>
                <h3 style={{textAlign:'center'}}>New Order</h3>
                {error && <span  className="text-danger">{error}</span>}
                <FormGroup className="my-3">
                    <FormLabel >Sub_Total</FormLabel>
                    <FormControl required={true} name="sub_total" onChange={handleChange} value={order.sub_total} placeholder="Enter Sub Total"></FormControl>
                </FormGroup>

                <FormGroup className="my-3">
                    <FormLabel >Phone</FormLabel>
                    <FormControl required={true} name="phone" onChange={handleChange} value={order.phone} placeholder="Your phone number"></FormControl>
                </FormGroup>
                
                <Button className="w-100 bg-dark" type="submit" onClick={()=>{setError("");setStatus(true)}}>Add Order</Button>
            </Form>
        </>
    )
}

export default AddOrder;