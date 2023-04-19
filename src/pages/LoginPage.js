import LoginForm from "../components/LoginForm";
import { json, redirect } from "react-router-dom";
const LoginPage=() =>{
    return (
        <LoginForm />
    )
}
export default LoginPage;


export async function loginAction ({request}){

    const data= await request.formData();
    console.log(data);
    //const name= data.get('name');
    //console.log(name);
    const userData={
        name: data.get('name'),
        password: data.get('password')
    }
    console.log(userData)
    const response=await fetch('https://to-do-list-82286-default-rtdb.firebaseio.com/userdata.json')

    if(!response.ok){
        throw json({message:'could not register'})
    }
    const resData= await response.json();
    
    console.log(resData);
    return redirect('/dashboard');
    

    
}