export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    console.log(form.get("email"))
    console.log("hi");
  };
  return (
    <div>
      Login
      <form
        action="http://localhost:3000/api/auth/login"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="email" name="email" placeholder="email/username" />
        <input type="password" name="password" placeholder="password." />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
