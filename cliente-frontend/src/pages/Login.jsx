import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirecionar o usuário após login

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Usado para redirecionar o usuário

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/clientes", {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.status === 200) {
        // Credenciais válidas
        localStorage.setItem("auth", btoa(`${username}:${password}`));
        localStorage.setItem("username", username); // Salvar o nome do usuário para verificação
        setAuthenticated(true);
        navigate("/"); // Redireciona para a página inicial
      }
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
