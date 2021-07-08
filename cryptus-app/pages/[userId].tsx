import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { userId } = router.query;

  return <p>User: {userId}</p>;
};

export default Post;
