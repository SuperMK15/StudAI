import { useRef, useState, useEffect } from "react"
import { useRegisterMutation } from "../features/auth/authApiSlice"
import { Link } from 'react-router-dom'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [register, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRegisterMutation();

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [firstnameFocus, setFirstnameFocus] = useState(false)

    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false)
    const [lastnameFocus, setLastnameFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatchPassword(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setValidFirstname(firstname.length > 0)
    }, [firstname])

    useEffect(() => {
        setValidLastname(lastname.length > 0)
    }, [lastname])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onMatchPasswordChanged = e => setMatchPassword(e.target.value)
    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)

    const canSave = [validUsername, validPassword, validMatchPassword, validFirstname, validLastname].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await register({
                username: username,
                password: password,
                first_name: firstname,
                last_name: lastname
            })
        }
    }

    let errmsg;
    if (isError) {
        window.scrollTo(0, 0);
        if (error.status === 409) {
            errmsg = <>Username is already taken. Please choose another.</>
        } else {
            errmsg = <>An error occurred. Please try again later.</>
        }
    }
    let content;
    if (isSuccess) {
        content = (
            <section>
                <h1>User {username} successfully created!</h1>
                <br />
                <p>
                    Click <Link to="/login">here</Link> to log in.
                </p>
            </section>
        )
    } else {
        content = (
            <div>
                <header>
                    <Link to="/"><img id="logo-link" src="./images/logo.png" alt="CCYC Logo" width="200" /></Link>
                    <h2 id="title-login">Parent and Teacher Portal</h2>
                </header>
                <div class="whitespace"></div>
                <section class="register">
                    <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{errmsg}</p>
                    <h1 class='register-title'>CCYC Parent Registration</h1>
                    <form onSubmit={onSaveUserClicked} class="login-container">
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={onUsernameChanged}
                            value={username}
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="firstname">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            onChange={onFirstnameChanged}
                            value={firstname}
                            required
                            aria-invalid={validFirstname ? "false" : "true"}
                            aria-describedby="firstnote"
                            onFocus={() => setFirstnameFocus(true)}
                            onBlur={() => setFirstnameFocus(false)}
                        />
                        <p id="firstnote" className={firstnameFocus && !validFirstname ? "instructions" : "offscreen"}>
                            You must enter a first name.
                        </p>

                        <label htmlFor="lastname">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            onChange={onLastnameChanged}
                            value={lastname}
                            required
                            aria-invalid={validLastname ? "false" : "true"}
                            aria-describedby="lastnote"
                            onFocus={() => setLastnameFocus(true)}
                            onBlur={() => setLastnameFocus(false)}
                        />
                        <p id="lastnote" className={lastnameFocus && !validLastname ? "instructions" : "offscreen"}>
                            You must enter a last name.
                        </p>

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={onPasswordChanged}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={onMatchPasswordChanged}
                            value={matchPassword}
                            required
                            aria-invalid={validMatchPassword ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        />
                        <p id="confirmnote" className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>

                        <button disabled={!canSave}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/login">Log In</Link>
                        </span>
                    </p>
                </section>
            </div>
        )
    }

    return (
        <div className="Signup">
            {content}
        </div>
    )
}

export default Register