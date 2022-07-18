import { FormEvent, useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";

import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    console.log(name, email, password)
  }

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
      </label>

      <button type="submit">Login</button>
      <span>
        <a href={'/signup'}>
          Criar Conta
        </a>
      </span>
    </form>
  );
}
