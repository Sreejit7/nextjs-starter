import { AlbumType } from "../components/Album/album.model";
import { PostType } from "../components/Post/post.model";
import { TodoType } from "../components/TodoItem/todo.model";
import { UserType } from "../components/User/user.model";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`${baseUrl}/users`);
  const users = await response.json();

  return users;
};

export const fetchUserPosts = async (id: number): Promise<PostType[]> => {
  const response = await fetch(`${baseUrl}/users/${id}/posts`);
  const posts = await response.json();

  return posts;
};

export const fetchUserTodos = async (id: number): Promise<TodoType[]> => {
  const response = await fetch(`${baseUrl}/users/${id}/todos`);
  const todos = await response.json();

  return todos;
};

export const fetchUserAlbums = async (id: number): Promise<AlbumType[]> => {
  const response = await fetch(`${baseUrl}/users/${id}/albums`);
  const albums = await response.json();

  return albums;
};

/**
 * @description Fetches user data - details, posts, todos, albums
 * @param id User id
 * @returns An array of all the user details
 */
export const fetchUserData = async (id: number) => {
  const response = await Promise.all([
    fetch(`${baseUrl}/users/${id}`),
    fetch(`${baseUrl}/users/${id}/posts`),
    fetch(`${baseUrl}/users/${id}/todos`),
    fetch(`${baseUrl}/users/${id}/albums`),
  ]);

  const data = await Promise.all(response.map(res => res.json()));
  return data;
};
