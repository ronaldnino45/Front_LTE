import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import APIInvoke from  '../../configuracion/APIInvoke';
import swal from 'sweetalert';


const Login = () => {

  const navigate = useNavigate();

    // 

    const[usuario, setUsuario] = useState({
    email:'',
    password:'',

   });

const { email,password}= usuario;

const onChange = (e) => {
setUsuario({

    ...usuario,
    [e.target.name]: e.target.value
})

}

useEffect(() => {
    document.getElementById("email").focus();

},[])

const IniciarSesion = async ()=>{
    if(password.length < 8) {
        const msg = "la contraseña debe tener al menos 8 caracteres";
        
        swal({
            title: 'Error',
            text: msg,
            icon:'error',
            buttons: {
                confirm:{
                    text: 'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true

                }
            }

        });
    
    
    
    } else{
        const data = {
            email: usuario.email,
            password: usuario.password
        } 
        const response = await APIInvoke.invokePOST('/api/auth',data);
        const mensaje = response.msg;
        
        if(mensaje ==='usario no esta registrado' || mensaje === 'la contraseña es incorrecta') {
            const msg = "no fue posible iniciar sesion revise datos inicio";
            
            swal({
                title: 'Error',
                text: msg,
                icon:'error',
                buttons: {
                    confirm:{
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
    
                    }
                }
    
            });
    }else{
        // aca obteneos token
        const jwt = response.token;

        // se va a guardar el token en localstorage
        localStorage.setItem('token', jwt)
        // despues de logueados entramosal home de la pagin
        navigate("/home");

    }

}
}
    
    const onSubmit = (e) => {
        e.preventDefault();
        IniciarSesion();
    }

    return (
        <div className=' "hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Iniciar</b>Sesion</Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Puede Loguarse</p>
                        
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Email" 
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className='social-auth-links textcenter mb-3'>
                            <button type="submit" className='btn btn-block btn-primary'>Ingresar</button>
                            <Link to={"/Registro"} className='btn btn-block btn-danger' >Registro</Link>
                            </div>
            
            </form>



                    </div>
                </div>
            </div>
        </div >

    )
}

export default Login