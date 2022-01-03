import { useEffect, useState } from "react";

/** 
 * Custom reusable pagination hook
 * Returns starting & ending indices for current page
 */
export const usePaginate = (
  paginateTo: number,
  postsPerPage: number,
  pages: number,
  numOfPosts: number
) => {
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(0);

  // Set starting and ending indices for posts in the current page on navigation
  useEffect(() => {
    setStartingIndex((paginateTo - 1) * postsPerPage);

    // If paginating to last page, set ending post index as index of last post
    paginateTo === pages
      ? setEndingIndex(numOfPosts)
      : setEndingIndex((paginateTo - 1) * postsPerPage + postsPerPage);
  }, [paginateTo, postsPerPage, pages, numOfPosts]);

  return {
    start: startingIndex,
    end: endingIndex,
  };
};
