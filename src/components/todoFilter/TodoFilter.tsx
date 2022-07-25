
import styles from './TodoFilter.module.css'

export function TodoFilter() {
  return (
    <div className={styles.todoFilter}>
      <span>Recentes</span>
      <span>Antigos</span>
      <span>
        Prioridade <div className={styles.priority}>

        </div>
      </span>
    </div>
  )
}