
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useLogout } from '../../hooks/useLogout'
import styles from './Header.module.css'

export function Header() {
  const { logout, isPending } = useLogout()

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <button onClick={logout}>Sair</button>
        </ul>
      </nav>
      <img src={logo} alt="Logo ToDo" />
    </header>
  )
}