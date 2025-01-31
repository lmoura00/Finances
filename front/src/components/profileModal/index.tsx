import { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {/* Botão de Fechar */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Meu Perfil</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes/>
          </button>
        </div>

        {/* Informações do Usuário */}
        <div className="mt-4 text-center">
          <img
            src="/profile.jpg"
            alt="Foto de perfil"
            className="w-20 h-20 rounded-full mx-auto border-2 border-yellow-500"
          />
          <h4 className="text-xl font-semibold mt-2">Nome do Usuário</h4>
          <p className="text-gray-600 text-sm">email@exemplo.com</p>
        </div>

        {/* Botão de Logout */}
        <button
          onClick={() => {
            console.log("Usuário deslogado"); // Substituir pela lógica real de logout
            onClose();
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
        >
          Deslogar
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
