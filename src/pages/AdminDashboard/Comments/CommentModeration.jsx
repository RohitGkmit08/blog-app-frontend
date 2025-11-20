import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import {
  getCommentsByStatus,
  moderateComment,
} from "../../../services/adminBlogService";

const CommentModeration = () => {
  const { blogId } = useParams();
  const { token } = useAdminAuth();

  const [status, setStatus] = useState("pending");
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  // Load comments whenever status or blogId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getCommentsByStatus(blogId, status, token);
        setComments(res.comments || []);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };

    fetchComments();
  }, [blogId, status, token]);

  // Handle approve/reject/delete
  const handleAction = async (commentId, action) => {
    try {
      const res = await moderateComment(
        { commentId, status: action },
        token
      );

      setMessage(res.message);

      // Refresh list after action
      const updated = await getCommentsByStatus(blogId, status, token);
      setComments(updated.comments || []);
    } catch (err) {
      console.error("Moderation error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Moderate Comments</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setStatus("pending")}>Pending</button>
        <button onClick={() => setStatus("approved")} style={{ marginLeft: 10 }}>
          Approved
        </button>
        <button onClick={() => setStatus("rejected")} style={{ marginLeft: 10 }}>
          Rejected
        </button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {comments.length === 0 && <p>No comments found.</p>}

      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            marginBottom: 10,
            borderRadius: 4,
          }}
        >
          <strong>{c.userId}</strong>
          <p>{c.comment}</p>
          <small>
            {new Date(c.createdAt).toLocaleString()}
          </small>

          <div style={{ marginTop: 10 }}>
            {status === "pending" && (
              <>
                <button
                  onClick={() => handleAction(c._id, "approved")}
                  style={{ marginRight: 10 }}
                >
                  Approve
                </button>

                <button
                  onClick={() => handleAction(c._id, "rejected")}
                  style={{ marginRight: 10 }}
                >
                  Reject
                </button>
              </>
            )}

            <button
              onClick={() => handleAction(c._id, "deleted")}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentModeration;
