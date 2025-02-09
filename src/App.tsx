import { useEffect, useState, useRef } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: string;
}

function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
    setCustomers((allCustomers) => [...allCustomers, response.data]);
    nameRef.current.value = "";
    emailRef.current.value = "";
    nameRef.current.focus();
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/customer`, {
        params: {
          id,
        },
      });
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center min-h-screen px-4 bg-gray-900">
      <main className="w-full my-10 sm:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white ">Nome:</label>
          <input
            className="w-full p-2 mb-2 rounded"
            type="text"
            placeholder="Digite seu nome completo"
            ref={nameRef}
          />
          <label className="font-medium text-white ">Email:</label>
          <input
            className="w-full p-2 mb-2 rounded"
            type="email"
            placeholder="Digite seu e-mail"
            ref={emailRef}
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
                <span className="font-medium">ID</span> {customer.id}
              </p>
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
              <p>
                <span className="font-medium">Criado</span> {customer.createdAt}
              </p>
              <button
                className="absolute right-0 flex items-center p-2 mt-2 bg-red-500 rounded-lg justify-center-center text-red w-7 h-7 -top-7"
                onClick={() => handleDelete(customer.id)}
              >
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
