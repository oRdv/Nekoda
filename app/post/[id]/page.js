'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

export default function PostPage() {
  const router = useRouter();
  const params = useParams(); 
  const { id } = params; 
  const isLoggedIn = true;
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(false);
    alert('Post excluído com sucesso!');
  };

  return (
    <div className="flex h-screen">
      <aside
        className="w-[266px] bg-[#882525] flex flex-col items-center py-8"
        style={{ height: '100vh' }}
      >
        <h1 className="text-white font-bold text-[36px] mb-12">NEKODA</h1>
        <button
          className="w-[242px] h-[54px] bg-[#963838] text-white font-bold text-[40px] rounded-[10px] mb-4"
          onClick={() => router.push('/home')}
        >
          Início
        </button>
        <div className="mt-auto flex items-center w-full px-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FaUser className="text-[#882525] text-[24px]" />
          </div>
          <p className="ml-2 text-white font-bold text-[40px]">Neko</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-[960px]">
          <div
            className="flex items-center text-[#963838] text-[40px] cursor-pointer mb-8"
            onClick={() => router.push('/home')}
          >
            <FiArrowLeft className="mr-3" />
            <span className="font-bold" style={{ fontSize: '50px' }}>Post</span>
          </div>

          <div
            className="bg-gray-200 rounded-[12px] shadow p-8 mx-auto flex flex-col justify-between"
            style={{
              width: '960px',
              height: '420px',
              boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center space-x-6">
              <FaUser className="text-gray-500 text-[60px]" />
              <div>
                <div className="flex items-center space-x-3">
                  <p className="font-bold text-[42px] text-gray-600">Neko</p>
                  <p className="text-[24px] text-gray-500">@nekoda</p>
                </div>
                <p className="text-[36px] mt-3 font-bold text-[#963838]">
                  Que dia lindo!
                </p>
                <p className="text-[30px] text-gray-700 mt-2">
                  O dia de hoje foi incrível!
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-[24px] text-gray-500">10/01/20</div>
              {isLoggedIn && (
                <div className="flex space-x-8">
                  <button
                    onClick={() => router.push(`/edit/${id}`)} 
                    className="text-[24px] font-bold text-black hover:underline"
                  >
                    editar
                  </button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="text-[24px] font-bold text-red-500 hover:underline"
                  >
                    excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded shadow-lg text-center w-[500px]">
            <p className="text-[28px] font-bold text-black mb-8">
              Deseja excluir post?
            </p>
            <div className="flex justify-center space-x-8">
              <button
                onClick={handleDelete}
                className="px-8 py-3 text-white font-bold rounded-full bg-[#92AB7F] hover:opacity-90 text-[24px]"
              >
                Sim
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-8 py-3 text-white font-bold rounded-full bg-[#882525] hover:opacity-90 text-[24px]"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
