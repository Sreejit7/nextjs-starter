import Link from "next/link";
import { PostType } from "./post.model";
import styles from "./post.module.scss";

type Props = {
  post: PostType;
};
const Post = ({ post }: Props) => {
  const { title, userId, body, id } = post;
  return (
    <article className={styles.post}>
      <header>
        <small className={styles.header}>
          Post #{id} by @user{userId}
        </small>
      </header>
      <Link passHref href={`/posts/${id}`}>
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <p className={styles["post-body"]}>{body}</p>
    </article>
  );
};

export default Post;
