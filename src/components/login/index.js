import React from 'react'
import { connect } from 'react-redux'
import { onChangeEmail, onChangePassword, handleLogin } from '../../store'
import styles from './login.module.css'

const Login = (props) => {

const handleLogin = async () =>{
  const response = await props.handleLogin(props.email, props.password)
  console.log(response)
  /*sin el async no te reconoce el await porque no es asincrona*/
if(response.type === 'LOGIN_SUCCESS'){
  props.history.push('/home')
  /*history propiedad solo de react*/
}

}
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.loginText}>Iniciar sesión</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={styles.input}
          onChange={props.onChangeEmail}
          defaultValue={props.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className={styles.input}
          onChange={props.onChangePassword}
          value={props.password}
        />
        <button onClick={handleLogin} className={styles.button}>
          Login
          </button>
        {props.message && (
          <p
            className={styles.message}
            style={{ color: props.logged ? '#17fd00' : '#ad2c2c' }}
          >
            {props.message}
          </p>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
    logged: state.logged,
    message: state.message,
  }
}

const mapDispatchToProps = {
  onChangeEmail,
  onChangePassword,
  handleLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
