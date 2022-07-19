import { FormEvent, useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";

import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isPending, error, signup} = useSignup()

  const handleSignup = (e: FormEvent) => {
    e.preventDefault()

    signup(name, email, password)
  }

  return (
    <form className={styles["signup-form"]} onSubmit={handleSignup}>
      <h2>Cadastre-se</h2>

      <label>
        <span>Nome</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

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

      {!isPending && <button type="submit">Cadastrar</button>}
      {isPending && <button type="submit" disabled>Carregando...</button>}

      {error && <span>{error}</span>}

      <span>
        <a href="/login">
          Já tem uma conta?
        </a>
      </span>
    </form>
  );
}
