import React,{useContext} from 'react'
import { AuthContext } from '../../context';
import MyButton from '../UI/button/myButton';
import MyInput from '../UI/input/myInput';
const Login = ()=>{
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth','true');
        console.log('is',isAuth);
    }
    return(
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Enter login"/>
                <MyInput type="password" placeholder="Enter password" />
                <MyButton>LogIn</MyButton>
            </form> 
        </div>
    );
};

export default Login;