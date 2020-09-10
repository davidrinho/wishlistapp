import React, {useState} from 'react';
import Firebase from '../base';
import '../css/login.css';



const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const signIn = async () => {
        try {
            await Firebase.signIn(email, password);
            props.history.push('/dashboard');
        } catch(error) {
            alert(error.message);
        }    
    }

    const register = async () => {
        try {
            await Firebase.registerUser(email, password);
            props.history.push('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="containerDiv">
            <div className="loginDiv">
                <label>Email:</label>
                <input onChange={e => setEmail(e.target.value)} />
                <label>Password:</label>
                <input type="password" onChange={e => setPassword(e.target.value)} />
                <button onClick={() => signIn()}>Sign in</button>
                <button style={{display: 'none'}} onClick={() => register()}>Register</button>
            </div>
        </div>
        )
}


export default Login;