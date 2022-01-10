import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CommentType } from "../../src/components/Post/post.model";
import { fetcher } from "../../src/helpers/fetcher";
import styles from "../../styles/posts.module.scss";

const SinglePost: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    fetcher
  );
  return (
    <main className={styles.main}>
      <h2>Post #{id}</h2>
      <h3 className={styles.subtitle}>Comments</h3>
      {error ? (
        <span>Failed to fetch comments!</span>
      ) : (
        <ul className={styles.comments}>
          {!data && <span>Loading comments...</span>}
          {data &&
            data.map((comment: CommentType) => (
              <li key={comment.id} className={styles.comment}>
                <span>{comment.body}</span>
              </li>
            ))}
        </ul>
      )}
    </main>
  );
};

export default SinglePost;
