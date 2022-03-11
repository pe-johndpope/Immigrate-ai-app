import React, { createContext, useEffect, useState } from "react";

import { Post, Category, Tag, Author } from "../Types";

const WPAPI = require("wpapi")

const BLOG = "https://rasa.immigrate.ai";

interface BlogContextI {
  posts: Post[],
  tags: Tag[],
  categories: Category[],
  authors: Author[]
}

const BlogContext = createContext<BlogContextI>(
  {} as BlogContextI
);

const BlogContextProvider: React.FC = ({ children }) => {
  const wp = new WPAPI({ endpoint: `${BLOG}/wp-json` });
  const [posts, setPosts] = useState<Post[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    (async () => {
      await onFetchBlogPosts()
      await onFetchAuthors()
      await onFetchCategories()
      await onFetchTags()
    })() 
  }, []);

  const onFetchBlogPosts = async () : Promise<void> => {
    try {
      setPosts(await wp.posts().get())

      console.log(`SUCCESSFULLY FETCHED BLOG POSTS. COUNT: ${posts.length}`)
    } catch (e) { console.error(e) }
  }

  const onFetchTags = async () : Promise<void> => {
    try {
      setTags(await wp.tags().get())

      console.log(`SUCCESSFULLY FETCHED TAGS`)
    } catch (e) { console.error(e) }
  }

  const onFetchAuthors = async () : Promise<void> => {
    try {
      setAuthors(await wp.users().get())

      console.log(`SUCCESSFULLY FETCHED AUTHORS`)
    } catch (e) { console.error(e) }
  }

  const onFetchCategories = async () : Promise<void> => {
    try {
      setCategories(await wp.categories().get())

      console.log(`SUCCESSFULLY FETCHED CATEGORIES`)
    } catch (e) { console.error(e) }
  }

  return (
    // TODO: set value to be a BlogContextI type
    <BlogContext.Provider
      value={{
        tags,
        authors,
        categories,
        posts
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContextProvider, BlogContext };
export type { BlogContextI };
