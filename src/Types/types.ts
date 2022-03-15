import { WP_REST_API_Post as Post, WP_REST_API_Category as Category, WP_REST_API_Tag as Tag, WP_REST_API_User as Author, WP_REST_API_Attachment as Image} from "wp-types"

interface User {
  uid: string,
  name: string,
  email: string
}

export type { User, Post, Category, Tag, Author, Image }
