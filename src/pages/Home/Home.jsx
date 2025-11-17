import useAdminAuth from "../../hooks/useAdminAuth";


export default function Home() {
  const { token, isLoggedIn } = useAdminAuth();

  console.log("HOME COMPONENT LOADED");
  console.log("TOKEN:", token);
  console.log("LOGGED IN:", isLoggedIn);

  alert("HOME RENDERED");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
    </div>
  );
}
