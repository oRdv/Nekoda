'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import gato from "@/public/img/gato.png";

export default function LoginPage() {
  const router = useRouter();

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
          <span className="text-[120px]">Welcome</span>
          <span className="block text-[48px] text-right">BACK</span>
        </h1>
        <form className="mt-8 w-full max-w-lg">
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
              className="w-[656px] h-[95px] px-4 text-black text-[20px] border-[5px] border-[#7C1E1E] rounded-[20px] focus:outline-none focus:border-[#8a2828]"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-[20px] font-bold mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-[656px] h-[95px] px-4 text-black text-[20px] border-[5px] border-[#7C1E1E] rounded-[20px] focus:outline-none focus:border-[#8a2828]"
            />
          </div>
          <div className="flex items-center w-full max-w-[656px]">
            <span
              onClick={() => router.push("/authentication/signUp")}
              className="text-[#7C1E1E] text-[30px] font-bold cursor-pointer"
            >
              Sign Up
            </span>
            <button
              type="submit"
              className="w-[220px] h-[61px] bg-[#7C1E1E] text-white text-[20px] font-bold rounded-[20px] hover:bg-[#8a2828] transition ml-auto"
              style={{ marginRight: "-140px" }}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
