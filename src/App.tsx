import { use, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";
function App() {
  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    response.data.map((customer) => {
      console.log(customer);
    });
  }

  return (
    <div className="flex justify-center w-full min-h-screen px-4 bg-gray-900">
      <main className="w-full my-10 sm:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-6">
          <label className="font-medium text-white ">Nome:</label>
          <input
            className="w-full p-2 mb-2 rounded"
            type="text"
            placeholder="Digite seu nome completo"
          />
          <label className="font-medium text-white ">Email:</label>
          <input
            className="w-full p-2 mb-2 rounded"
            type="email"
            placeholder="Digite seu e-mail"
          />
          <input
            type="submit"
            value="Cadastrar"
            className="w-full p-2 mb-2 font-medium text-black bg-green-500 rounded cursor-pointer"
          />
        </form>

        <section className="flex flex-col">
          <article className="relative w-full p-2 transition-transform bg-white rounded-lg hover:scale-105">
            <p>
              <span className="font-medium">Nome</span> Matheus
            </p>
            <p>
              <span className="font-medium">E-mail</span> teste@teste.com
            </p>
            <p>
              <span className="font-medium">Status</span> ATIVO
            </p>
            <button className="absolute right-0 flex items-center p-2 mt-2 bg-red-500 rounded-lg justify-center-center text-red w-7 h-7 -top-3">
              <FiTrash size={18} color="#FFF" />
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
