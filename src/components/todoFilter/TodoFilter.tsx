import { Dispatch, SetStateAction } from "react";
import { priorityColors } from "../../utils/filter";

import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  filters: {
    new: boolean;
    old: boolean;
    isDone: boolean;
    priority: number;
  };
  changeFilter: Dispatch<
    SetStateAction<{ new: boolean; old: boolean; isDone: boolean; priority: number }>
  >;
}


export function TodoFilter({ filters, changeFilter }: TodoFilterProps) {

  return (
    <div className={styles.todoFilter}>
      <span
        className={filters.new ? styles.active : ""}
        onClick={() =>
          changeFilter({
            new: !filters.new,
            old: !filters.old,
            isDone: filters.isDone,
            priority: filters.priority
          })
        }
      >
        Recentes
      </span>
      <span
        className={filters.old ? styles.active : ""}
        onClick={() =>
          changeFilter({
            new: !filters.new,
            old: !filters.old,
            isDone: filters.isDone,
            priority: filters.priority
          })
        }
      >
        Antigas
      </span>
      <span
        className={filters.isDone ? styles.active : ""}
        onClick={() =>
          changeFilter({
            new: filters.new,
            old: filters.old,
            isDone: !filters.isDone,
            priority: filters.priority
          })
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
                changeFilter({
                  new: filters.new,
                  old: filters.old,
                  isDone: filters.isDone,
                  priority: filters.priority === index ? -1 : index,
                })
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
