import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";

interface User {
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("https://sergioaramburu.com/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);
  async function logoutUser() {
    try {
      const res = await fetch("https://sergioaramburu.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
