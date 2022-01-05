import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Pagination from "../../src/components/Pagination";
import Post from "../../src/components/Post";
import { PostType } from "../../src/components/Post/post.model";
import { usePaginate } from "../../src/hooks/usePaginate";
import styles from "../../styles/posts.module.css";

type Props = {
  posts: PostType[];
};

const Posts: NextPage<Props> = ({ posts }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  let pages = posts.length / postPerPage;

  if (posts.length % postPerPage !== 0) {
    pages++;
  }

  const { start, end } = usePaginate(
    currentPage,
    postPerPage,
    pages,
    posts.length
  );

  return (
    <main className={styles.main}>
      <ul className={styles.list}>
        {posts.slice(start, end).map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <footer className={styles.footer}>
        <Pagination pages={pages} paginate={(page) => setCurrentPage(page)} />
      </footer>
    </main>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return {
    props: { posts },
  };
};

export default Posts;
