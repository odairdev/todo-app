
import logo from '../../assets/logo.svg'
import { useLogout } from '../../hooks/useLogout'
import styles from './Header.module.css'

export function Header() {
  const { logout, isPending } = useLogout()

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <button onClick={logout}>Sair</button>
        </ul>
      </nav>
      <img src={logo} alt="Logo ToDo" />
    </header>
  )
}