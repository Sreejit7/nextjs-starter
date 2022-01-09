import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { AlbumType } from "../../src/components/Album/album.model";
import { PostType } from "../../src/components/Post/post.model";
import { TodoType } from "../../src/components/TodoItem/todo.model";
import { UserType } from "../../src/components/User/user.model";
import { fetchUserData, fetchUsers } from "../../src/helpers/fetcher";
import styles from "../../styles/users.module.scss";

const SingleUser = ({
  details,
  posts,
  todos,
  albums,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();
  const firstName = details.name.split(" ")[0];

  if (isFallback) {
    return (
      <main className="page loading">
        <h1>Loading, please wait ...</h1>
      </main>
    );
  }

  return (
    <main className="page">
      <section className={styles.details}>
        <h1 className={styles["details-name"]}>{details.name}</h1>
        <span className={styles["details-username"]}>@{details.username}</span>
        <span>
          Write to:
          <span className={styles["details-email"]}>{details.email}</span>
        </span>
      </section>
      <section className={styles.content}>
        <h2>User Activity</h2>
        <span>{firstName} has posted {posts.length} times.</span>
        <span>{firstName} is currently working on {todos.length} tasks.</span>
        <span>{firstName} has uploaded {albums.length} albums.</span>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps<{
  details: UserType;
  posts: PostType[];
  todos: TodoType[];
  albums: AlbumType[];
}> = async ({ params }: GetStaticPropsContext) => {
  const [details, posts, todos, albums] = await fetchUserData(
    Number(params?.id)
  );

  return {
    props: {
      details,
      posts,
      todos,
      albums,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetchUsers();

  // Get limited ids from users which routes will be generated statically
  // Other routes will be generated dynamically with a fallback
  const limitedPaths = users.slice(0, 5).map((user) => ({
    params: { id: user.id.toString() },
  }));

  return {
    paths: limitedPaths,
    fallback: true,
  };
};

export default SingleUser;
