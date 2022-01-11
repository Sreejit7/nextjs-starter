import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CommentType } from "../../src/components/Post/post.model";
import { fetcher } from "../../src/helpers/fetcher";
import styles from "../../styles/posts.module.scss";

const SinglePost = ({
  comments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    query: { id },
  } = useRouter();

  // Client side data fetching
  // const { data, error } = useSWR(
  //   `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  //   fetcher
  // );
  return (
    <main className={styles.main}>
      <h2>Post #{id}</h2>
      <h3 className={styles.subtitle}>Comments</h3>
      {/* {error ? (
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
      )} */}
      <ul className={styles.comments}>
        {comments.map((comment: CommentType) => (
          <li key={comment.id} className={styles.comment}>
            <span>{comment.body}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<{
  comments: CommentType[];
}> = async ({ params }: GetServerSidePropsContext) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}/comments`
  );

  const comments: CommentType[] = await response.json();

  return {
    props: {
      comments,
    },
  };
};

export default SinglePost;
