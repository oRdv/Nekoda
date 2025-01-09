import Link from "next/link";
import Image from "next/image";
import gato from "@/public/img/gato.png";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#7C1E1E] flex flex-col justify-center items-center h-[600px]">
        <div className="text-center">
          <div className="relative w-[547.36px] h-[344.62px] mx-auto">
            <Image
              src={gato}
              alt="Silhueta de um gato"
              layout="fill"
              objectFit="contain"
              priority={true}
            />
          </div>
          <h1 className="text-white text-9xl font-bold tracking-wide">NEKODA</h1>
          <p className="text-white text-base tracking-wider ml-[460px]">
            Compartilhe seus pensamentos
          </p>
        </div>
      </div>

      <div className="bg-white flex flex-col justify-center items-center flex-1">
        <Link
          href="/authentication/login"
          className="bg-[#7C1E1E] text-white font-semibold text-center w-[414px] h-[50px] rounded-full shadow-md hover:bg-[#8a2828] transition text-center tracking-widest"
          style={{ fontSize: '32px' }}
        >
          Login
        </Link>

        <Link
        href="/authentication/signUp"
        className="text-[#7C1E1E] text-m mt-1 tracking-wider"
        >
        ou faça Sign Up
        </Link>
      </div>
    </div>
  );
}
