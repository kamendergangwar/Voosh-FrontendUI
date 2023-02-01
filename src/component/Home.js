import NavBar from './NavBar';

// This component known as a CONTROLLED COMPONENT
function Home (props){
   

    return (
        <>
          {/* <NavBar user = {props.user}  handleUser = {props.handleUser}/> */}
          {props.user && <h1 style={{color:'darkgrey',fontFamily:'sans-serif',margin:'20px'}}>Welcome , {props.user.data.data.name}</h1>}
        </>
    );
}

export default Home;