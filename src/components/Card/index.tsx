import Link from "next/link";
import styles from "./card.module.scss";

type Props = {
  title: string;
  content: string;
  link?: string;
};
const Card = ({ content, title, link }: Props) => {
  return link ? (
    <Link passHref href={link}>
      <article className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>{content}</p>
      </article>
    </Link>
  ) : (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </article>
  );
};

export default Card;
