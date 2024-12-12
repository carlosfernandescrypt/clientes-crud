import React, { useState, useEffect } from "react";
import api from "../services/api";

const ClienteForm = ({ clienteAtual, onSave }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    endereco: {
      cep: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      uf: "",
      complemento: "",
    },
    telefones: [],
    emails: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("endereco.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleListChange = (index, field, value, listName) => {
    setFormData((prev) => {
      const updatedList = [...prev[listName]];
      updatedList[index] = field
        ? { ...updatedList[index], [field]: value }
        : value;
      return { ...prev, [listName]: updatedList };
    });
  };

  const handleAddToList = (listName, defaultItem) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], defaultItem],
    }));
  };

  const handleRemoveFromList = (index, listName) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      if (clienteAtual) {
        await api.put(
          `http://localhost:8080/clientes/${clienteAtual.id}`,
          formData
        );
      } else {
        await api.post("http://localhost:8080/clientes", formData);
      }
      onSave();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  useEffect(() => {
    if (clienteAtual) setFormData(clienteAtual);
  }, [clienteAtual]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">
        {clienteAtual ? "Editar Cliente" : "Novo Cliente"}
      </h2>

      {/* Nome e CPF */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Endereço */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-2">CEP</label>
          <input
            type="text"
            name="cep"
            value={formData.endereco.cep}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Logradouro</label>
          <input
            type="text"
            name="logradouro"
            value={formData.endereco.logradouro}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={formData.endereco.bairro}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={formData.endereco.cidade}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">UF</label>
          <input
            type="text"
            name="uf"
            value={formData.endereco.uf}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Complemento</label>
          <input
            type="text"
            name="complemento"
            value={formData.endereco.complemento}
            onChange={handleInputChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Telefones */}
      <h3 className="text-md font-bold mt-4">Telefones</h3>
      <div className="space-y-4">
        {formData.telefones.map((telefone, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <select
              value={telefone.tipo}
              onChange={(e) =>
                handleListChange(index, "tipo", e.target.value, "telefones")
              }
              className="border rounded px-2 py-2"
            >
              <option value="CELULAR">Celular</option>
              <option value="RESIDENCIAL">Residencial</option>
              <option value="COMERCIAL">Comercial</option>
            </select>
            <input
              type="text"
              value={telefone.numero}
              onChange={(e) =>
                handleListChange(index, "numero", e.target.value, "telefones")
              }
              className="border rounded px-4 py-2 flex-grow"
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleRemoveFromList(index, "telefones")}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() =>
          handleAddToList("telefones", { tipo: "CELULAR", numero: "" })
        }
      >
        Adicionar Telefone
      </button>

      {/* Emails */}
      <h3 className="text-md font-bold mt-4">Emails</h3>
      <div className="space-y-4">
        {formData.emails.map((email, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <input
              type="email"
              value={email}
              onChange={(e) =>
                handleListChange(index, null, e.target.value, "emails")
              }
              className="border rounded px-4 py-2 flex-grow"
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleRemoveFromList(index, "emails")}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 w-48">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => handleAddToList("emails", "")}
        >
          Adicionar Email
        </button>

        {/* Botão de Salvar */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleSave}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default ClienteForm;
