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
        <small>Post #{id} by @user{userId}</small>
      </header>
      <h4>{title}</h4>
      <p className={styles["post-body"]}>{body}</p>
    </article>
  );
};

export default Post;
