import { FormEvent, useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { validation } from "../../utils/validation";

import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, error, signup } = useSignup();
  const [validationErrors, setValidationErrors] = useState({name: '', email: '', password: ''})
  let navigate = useNavigate();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    const checkErrors = validation({ name, email, password, signup: true });

    if (checkErrors) {
      setValidationErrors(checkErrors)
      return;
    }

    try {
      signup(name, email, password);

      navigate("/");
    } catch (err: any) {
      console.log(err);
      alert(err.message)
    }
  };

  console.log(validationErrors);

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
        {validationErrors.name  && <p className="error">{validationErrors.name}</p>}
      </label>

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

      {!isPending && <button type="submit">Cadastrar</button>}
      {isPending && (
        <button type="submit" disabled>
          Carregando...
        </button>
      )}
      {error && <p className="error">{error}</p>}

      <span>
        <Link to="/login">Já tem uma conta?</Link>
      </span>
    </form>
  );
}
