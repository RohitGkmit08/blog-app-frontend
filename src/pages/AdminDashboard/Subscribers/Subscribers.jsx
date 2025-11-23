import { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = useCallback(async () => {
    try {
      const res = await api.get("/subscribers/admin/subscribers");
      setSubscribers(res.data.subscribers || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  }, []);
 
  const deleteSubscriber = useCallback(async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) {
      return;
    }
    
    try {
      await api.delete(`/subscribers/admin/subscribers/${id}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      alert("Subscriber deleted successfully");
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
      alert(error.response?.data?.message || "Failed to delete subscriber. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Subscribers</h1>

      {subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Email</th>
              <th style={th}>Joined At</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((user) => (
              <tr key={user._id}>
                <td style={td}>{user.email}</td>
                <td style={td}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={td}>
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteSubscriber(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  borderBottom: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "10px",
};
