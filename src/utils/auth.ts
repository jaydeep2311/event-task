export interface AuthSessionType {
  email: string;
  name: string;
  expiresAt: number; 
}

const SECRET_KEY = "currentSession";

const DURATION = 30 * 60 * 1000; 

export const loginAction = (email: string, password: string) => {
  const storedUser = localStorage.getItem("userList");
  if (!storedUser) throw new Error("No user found. Please sign up first.");

  const userList = JSON.parse(storedUser);
  const user = userList.find((u: { email: string }) => u.email === email);

  if (user && user.email === email && user.password === password) {
    const session: AuthSessionType = {
      email: user.email,
      name: user.name,
      expiresAt: Date.now() + DURATION,
    }
    localStorage.setItem(SECRET_KEY, JSON.stringify(session))
    return session
  }
  throw new Error("Invalid email or password");
};

export const storeUser = (user: { name: string; email: string; password: string }) => {
  const storedUser = localStorage.getItem('userList')
  const userList = JSON.parse(storedUser??"[]");
  const userData = userList.find((u: { email: string }) => u.email === user.email)
  if(userData){
    throw new Error('User already exists with this email')
  }
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem('userList', userList ? JSON.stringify([...userList, user]) : JSON.stringify([user]));
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

export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SECRET_KEY)
    
  }
}