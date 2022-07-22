import { FormEvent, useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { validation } from "../../utils/validation";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();
  const [validationErrors, setValidationErrors] = useState({name: '', email: '', password: ''})

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const checkErrors = validation({name: null, email, password, signup: false})

    if(checkErrors) {
      setValidationErrors(checkErrors)
      return
    }

    try {
      login(email, password);
    } catch(err: any) {
      console.log('login error: ' + err)
      alert(err.msg)
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleLogin}>
      <h2>Login</h2>

      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {validationErrors.email  && <p className="error">{validationErrors.email}</p>}
      </label>

      <label>
        <span>Senha</span>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {validationErrors.password  && <p className="error">{validationErrors.password}</p>}
      </label>

      {!isPending && <button type="submit">Login</button>}
      {isPending && (
        <button type="submit" disabled>
          Loading...
        </button>
      )}
      {error && <p className="error">{error}</p>}
      <span>
        <Link to={"/signup"}>Criar Conta</Link>
      </span>
    </form>
  );
}
