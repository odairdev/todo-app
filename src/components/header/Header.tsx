import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";
import styles from "./Header.module.css";

export function Header() {
  const { logout, isPending } = useLogout();
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <span>Bem vindo, {user.displayName}</span>
              </li>
              <button onClick={logout}>Sair</button>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <img src={logo} alt="Logo ToDo" />
    </header>
  );
}
