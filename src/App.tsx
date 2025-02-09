import { useEffect, useState, useRef } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;

    if (name && email) {
      api.post("/customers", { name, email });
      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
    }
  }

  return (
    <div className="flex justify-center w-full min-h-screen px-4 bg-gray-900">
      <main className="w-full my-10 sm:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white ">Nome:</label>
          <input
            className="w-full p-2 mb-2 rounded"
            type="text"
            placeholder="Digite seu nome completo"
            ref={nameInputRef}
          />
          <label className="font-medium text-white ">Email:</label>
          <input
            className="w-full p-2 mb-2 rounded"
            type="email"
            placeholder="Digite seu e-mail"
            ref={emailInputRef}
          />
          <input
            type="submit"
            value="Cadastrar"
            className="w-full p-2 mb-2 font-medium text-black bg-green-500 rounded cursor-pointer"
          />
        </form>
        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="relative w-full p-2 transition-transform bg-white rounded-lg hover:scale-105"
            >
              <p>
                <span className="font-medium">Nome</span> {customer.name}
              </p>
              <p>
                <span className="font-medium">E-mail</span> {customer.email}
              </p>
              <p>
                <span className="font-medium">Status</span>{" "}
                {customer.status ? "Ativo" : "Inativo"}
              </p>
              <button className="absolute right-0 flex items-center p-2 mt-2 bg-red-500 rounded-lg justify-center-center text-red w-7 h-7 -top-3">
                <FiTrash size={18} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
