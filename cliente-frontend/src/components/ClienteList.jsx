import React, { useEffect, useState } from "react";
import api from "../services/api";

const ClienteList = ({ onEdit }) => {
  const [clientes, setClientes] = useState([]);
  const username = localStorage.getItem("username"); // Recupera o usuário logado

  const fetchClientes = async () => {
    try {
      const response = await api.get("http://localhost:8080/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8080/clientes/${id}`);
      fetchClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Clientes</h1>
      <table className="table-auto w-full text-left border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">CPF</th>
            {username === "admin" && (
              <th className="border px-4 py-2">Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="border px-4 py-2">{cliente.nome}</td>
              <td className="border px-4 py-2">{cliente.cpf}</td>
              {username === "admin" && (
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => onEdit(cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Deletar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
