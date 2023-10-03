
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface User {
  user_id: string;
  name: string;
  email:string;
  role:{
    role_type:string,
    role_name:string
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
