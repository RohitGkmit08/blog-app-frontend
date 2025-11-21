import { useState } from "react";
import api from "../services/api";

export default function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("Loading...");

    try {
      await api.post("/subscribers/subscribe", { email });
      setStatus("Subscribed successfully.");
      setEmail("");
    } catch (error) {
      setStatus(error.response?.data?.message || "Subscription failed.");
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Subscribe for Blog Updates</h3>

      <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            background: "#000",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </form>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}
