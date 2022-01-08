import Link from "next/link";
import { UserType } from "./user.model";
import styles from "./user.module.scss";

const User = (user: UserType) => {
  return (
    <Link passHref href={`/users/${user.id}`}>
      <article className={styles.user}>
        <h3>{user.name}</h3>
        <span>@{user.username}</span>
      </article>
    </Link>
  );
};

export default User;
