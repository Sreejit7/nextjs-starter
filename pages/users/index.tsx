import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import User from "../../src/components/User";
import { UserType } from "../../src/components/User/user.model";
import { fetchUsers } from "../../src/helpers/fetcher";
import styles from "../../styles/users.module.scss";

const Users = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className="page">
      <h2 className={styles.title}>List of all users</h2>
      <ul className={styles.users}>
        {users.map((user) => (
          <li key={user.id}>
            <User {...user} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getStaticProps: GetStaticProps<{
  users: UserType[];
}> = async () => {
  const users = await fetchUsers();
  return {
    props: { users },
  };
};

export default Users;
