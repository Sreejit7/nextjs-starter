import styles from "./pagination.module.scss";

type PaginationProps = {
  pages: number;
  paginate: (page: number) => void;
};
const Pagination = ({ pages, paginate }: PaginationProps) => {
  return (
    <ul className={styles.pagination}>
      {Array(pages)
        .fill(0)
        .map((_, index) => (
          <li className={styles.item} key={index}>
            <button className={styles.btn} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Pagination;
