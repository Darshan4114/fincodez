import { createContext } from "react";

interface User {
  uid: string;
  displayName: string;
}

interface AuthContextProps {
  user: User | null;
  claims: string[];
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  claims: [],
});

export default AuthContext;