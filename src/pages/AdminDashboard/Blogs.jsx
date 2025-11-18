import { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/blogService";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then((data) => {
      setBlogs(data.blogs || []);
    });
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map((b) => (
        <div key={b._id}>
          <h3>{b.title}</h3>
          <p>{b.subTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
