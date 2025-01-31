"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ModalTransaction from "../../components/modalTransaction";
import { useAuth } from "../../components/contexts/AuthContext";
import {useCookies} from 'next-client-cookies'

interface Transaction {
  id: number;
  type: "entrada" | "saida";
  amount: number;
  category: string;
  date: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [predictedBalance, setPredictedBalance] = useState(0);
  const [data, setData] = useState([]);

  const variaveis = useCookies()


  useEffect(() => {
    fetchTransactions();
  }, []);
 
  const fetchTransactions = async () => {
    try {
      const token = variaveis.get("token")
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transation`,
          {
            headers:{Authorization:`Bearer ${token}`}
          }
      )
      console.log(response.data)
      setTransactions(response.data);
      calculateBalances(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const getData = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const calculateBalances = (transactions: Transaction[]) => {
    let saldo = 0;
    transactions.forEach((t) => {
      saldo += t.type === "entrada" ? t.amount : -t.amount;
    });
    setBalance(saldo);
    setPredictedBalance(saldo);
  };

   function Profile() {
     const { user } = useAuth();

    if (!user) {
      return <p>Você não está logado.</p>;
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">FinancePig</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
            >
              + Adicionar Transação
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400">Saldo Atual</p>
              <h2 className="text-xl font-bold">R${balance.toFixed(2)}</h2>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400">Saldo Previsto</p>
              <h2 className="text-xl font-bold">
                R${predictedBalance.toFixed(2)}
              </h2>
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4">Histórico</h2>
          <div className="bg-gray-700 p-4 rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Quantia</th>
                  <th className="py-2">Categoria</th>
                  <th className="py-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <>
                    <tr key={t.id} className="border-b border-gray-600">
                      <td
                        className={
                          t.type === "entrada"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {t.type === "entrada" ? "Entrada" : "Saída"}
                      </td>
                      <td className="py-2">R${t.amount.toFixed(2)}</td>
                      <td className="py-2">{t.category}</td>
                      <td className="py-2">{t.date}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ModalTransaction
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshTransactions={()=>{}}
        />
      </div>
    );
  }
};

export default Dashboard;
