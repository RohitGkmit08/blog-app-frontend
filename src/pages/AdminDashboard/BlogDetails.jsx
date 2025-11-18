import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogById, getApprovedComments } from "../../services/blogService";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getBlogById(id).then((data) => setBlog(data.blog));
    getApprovedComments(id).then((data) => setComments(data.comments));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>

      <h2>Comments</h2>
      {comments.map((c) => (
        <div key={c._id}>{c.comment}</div>
      ))}
    </div>
  );
};

export default BlogDetails;
