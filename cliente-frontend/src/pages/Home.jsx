import React, { useState } from "react";
import ClienteList from "../components/ClienteList";
import ClienteForm from "../components/ClienteForm";

const Home = () => {
  const [clienteAtual, setClienteAtual] = useState(null);
  const username = localStorage.getItem("username");

  const handleEdit = (cliente) => {
    setClienteAtual(cliente);
  };

  const handleSave = () => {
    setClienteAtual(null);
  };

  return (
    <div className="container mx-auto">
      {username === "admin" && (
        <ClienteForm clienteAtual={clienteAtual} onSave={handleSave} />
      )}
      <ClienteList onEdit={username === "admin" ? handleEdit : null} />
    </div>
  );
};

export default Home;
