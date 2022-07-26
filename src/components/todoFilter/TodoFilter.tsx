import { useTodo } from "../../hooks/useTodo";
import { priorityColors } from "../../utils/filter";

import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  filters: {
    new: boolean;
    old: boolean;
    isDone: boolean;
    priority: number;
  };
}

export function TodoFilter({ filters }: TodoFilterProps) {
  const { changeFilter, changeIsDone, changePriority} = useTodo()

  return (
    <div className={styles.todoFilter}>
      <span
        className={filters.new ? styles.active : ""}
        onClick={() =>
          changeFilter()
        }
      >
        Recentes
      </span>
      <span
        className={filters.old ? styles.active : ""}
        onClick={() =>
          changeFilter()
        }
      >
        Antigas
      </span>
      <span
        className={filters.isDone ? styles.active : ""}
        onClick={() =>
          changeIsDone()
        }
      >
        Concluidas
      </span>
      <div className={`${styles.priorityContainer} ${filters.priority !== -1 ? styles.active : ''}`}>
        Prioridade{" "}
        <div className={styles.priority}>
          {priorityColors.map((priority, index) => (
            <div
              key={priority}
              style={{ backgroundColor: `${priority}` }}
              className={index === filters.priority ? styles.active : ""}
              onClick={() =>
                changePriority(filters.priority === index ? -1 : index)
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
