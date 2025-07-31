export interface AuthSessionType {
  email: string;
  name: string;
  expiresAt: number; 
}

const SECRET_KEY = "currentSession";

const DURATION = 30 * 60 * 1000; 

export const loginAction = (email: string, password: string) => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) throw new Error("No user found. Please sign up first.");

  const user = JSON.parse(storedUser);
  if (user.email === email && user.password === password) {
    const session: AuthSessionType = {
      email: user.email,
      name: user.name,
      expiresAt: Date.now() + DURATION,
    };
    localStorage.setItem(SECRET_KEY, JSON.stringify(session));
    return session;
  }
  throw new Error("Invalid email or password");
};

export const storeUser = (user: { name: string; email: string; password: string }) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const latestCurrentSessionSession = (): AuthSessionType | null => {
  const session = localStorage.getItem(SECRET_KEY);
  if (!session) return null;

  const parsed = JSON.parse(session);
  if (Date.now() > parsed.expiresAt) {
    localStorage.removeItem(SECRET_KEY);
    return null;
  }
  return parsed;
};

export const userLogout = () => {
  localStorage.removeItem(SECRET_KEY);
};