"use client"
import React, { createContext, useState, ReactNode } from "react";
import {headers, cookies} from 'next/headers'
type User = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  token: string | null;
  createdAt: string;
  updatedAt: string;
  transaction: any[];
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData); // Simula o login com os dados do usuário
  };

  const logout = () => {
    setUser(null); // Simula o logout limpando o usuário
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
