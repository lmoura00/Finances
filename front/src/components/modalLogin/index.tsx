
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';  
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import {useCookies} from 'next-client-cookies'

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const cookies = useCookies()

  const handleSubmit = async() => {
    // Lógica de autenticação aqui
    try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/session`,
          { email, password }
      );
      cookies.set("token", response.data.token)
      console.log(response.data.token)
      console.log(email,password)
      setMessage('Login successful!');
      console.log(response.data);
      router.push('/dashboard')
      
  } catch (error) {
      setMessage('Login failed. Please check your credentials.');
  } 
    console.log('Email:', email);
    console.log('Senha:', password);
    onClose(); // Fechar o modal após o envio
  };

  return (
     <AuthProvider>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
          {/* Ícone de Fechar */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose />
          </button>

          <h1 className="text-2xl font-bold mb-4">Faça Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-[#4B4040] text-white px-4 py-2 rounded-lg"
              onClick={handleSubmit}
            >
              Entrar
            </button>

          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </AuthProvider>
  );
};

export default ModalLogin ;
