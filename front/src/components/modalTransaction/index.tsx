import { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

interface ModalTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTransactions: () => void;
}

const ModalTransaction: React.FC<ModalTransactionProps> = ({ isOpen, onClose, refreshTransactions }) => {
  if (!isOpen) return null;

  const [type, setType] = useState<"entrada" | "saida">("entrada");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!amount || !category) {
      setMessage("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transation`, {
        type,
        amount: parseFloat(amount),
        category,
      });

      setMessage("Transação adicionada!");
      refreshTransactions();
      onClose();
    } catch (error) {
      console.error("Erro na API:", error);
      setMessage("Erro ao adicionar transação.");
    }
  };

  return (
      <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white">
          <AiOutlineClose />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-white">Nova Transação</h1>

        <div className="flex mb-4">
          <button
            onClick={() => setType("entrada")}
            className={type === "entrada" ? "bg-green-500" : "bg-gray-600"}
          >
            Entrada
          </button>
          <button
            onClick={() => setType("saida")}
            className={type === "saida" ? "bg-red-500" : "bg-gray-600"}
          >
            Saída
          </button>
        </div>

        <input
          type="number"
          placeholder="Quantia"
          className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoria"
          className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="w-full bg-yellow-500 text-black py-2 rounded-lg" onClick={handleSubmit}>
          Adicionar
        </button>

        {message && <p className="text-white mt-2">{message}</p>}
      </div>
    </div>
    </>
  );
};

export default ModalTransaction;