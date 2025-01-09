'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gato from "@/public/img/gato.png";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/v1/nekoda/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ open: true, msg: "Usuário cadastrado com sucesso!", severity: "success" });
        setTimeout(() => {
          router.push("/authentication/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setAlert({ open: true, msg: errorData.message || "Erro ao realizar o cadastro.", severity: "error" });
      }
    } catch (error) {
      setAlert({ open: true, msg: "Erro ao conectar ao servidor. Tente novamente mais tarde.", severity: "error" });
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div
        className="w-[720px] bg-[#7C1E1E] relative overflow-hidden flex items-center justify-center"
        style={{
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "350px",
          padding: "20px",
        }}
      >
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <Image
            src={gato}
            alt="Silhueta de um gato"
            width={620}
            height={400}
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center px-8">
        <h1 className="font-bold text-black leading-none">
          <span className="text-[120px]">Sign Up</span>
        </h1>
        <form className="mt-8 w-full max-w-lg" onSubmit={handleSignUp}>
          {alert.open && (
            <p
              className={`text-[18px] mb-4 ${
                alert.severity === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {alert.msg}
            </p>
          )}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-black text-[20px] font-bold mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-[656px] h-[95px] px-4 text-black text-[20px] border-[5px] border-[#7C1E1E] rounded-[20px] focus:outline-none focus:border-[#8a2828]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black text-[20px] font-bold mb-2"
            >
              User
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-[656px] h-[95px] px-4 text-black text-[20px] border-[5px] border-[#7C1E1E] rounded-[20px] focus:outline-none focus:border-[#8a2828]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-[20px] font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-[656px] h-[95px] px-4 text-black text-[20px] border-[5px] border-[#7C1E1E] rounded-[20px] focus:outline-none focus:border-[#8a2828]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-[20px] font-bold mb-2 flex items-center"
            >
              Senha
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2 text-[#7C1E1E] text-[20px]"
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-[656px] h-[95px] px-4 text-black text-[20px] border-[5px] border-[#7C1E1E] rounded-[20px] focus:outline-none focus:border-[#8a2828]"
              required
            />
          </div>
          <div className="flex items-center w-full max-w-[656px]">
            <span
              onClick={() => router.push("/authentication/login")}
              className="text-[#7C1E1E] text-[30px] font-bold cursor-pointer"
            >
              Login
            </span>
            <button
              type="submit"
              className="w-[220px] h-[61px] bg-[#7C1E1E] text-white text-[20px] font-bold rounded-[20px] hover:bg-[#8a2828] transition ml-auto"
              style={{ marginRight: "-140px" }}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
