export async function login(username: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const res = await fetch("https://sergioaramburu.com/api/auth/login", {
    method: "POST",
    body: formData,
    credentials: "include", // Important! Sends/receives cookies
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Login failed");
  }
  // No need to return token, it's stored in cookie
  return data;
}
