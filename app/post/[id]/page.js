'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      const parsedProfile = JSON.parse(storedUserProfile);
      setUserId(parsedProfile.id);
    } else {
      router.push('/login');
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/nekoda/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
        } else {
          console.error('Erro ao carregar o post:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/v1/nekoda/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/home');
      } else {
        console.error('Erro ao excluir o post:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!post) {
    return <div>Post não encontrado.</div>;
  }

  const isOwner = post.user_id === userId;

  return (
    <div className="flex h-screen">
      <aside className="w-[266px] bg-[#882525] flex flex-col items-center py-8">
        <h1 className="text-white font-bold text-[36px] mb-12">NEKODA</h1>
        <button
          className="w-[242px] h-[54px] bg-[#963838] text-white font-bold text-[40px] rounded-[10px] mb-4"
          onClick={() => router.push('/home')}
        >
          Início
        </button>
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

          <div className="bg-gray-200 rounded-[12px] shadow p-8 mx-auto flex flex-col justify-between">
            <div className="flex items-center space-x-6">
              <FaUser className="text-gray-500 text-[60px]" />
              <div>
                <p className="font-bold text-[42px] text-gray-600">{post.username}</p>
                <p className="text-[36px] mt-3 font-bold text-[#963838]">{post.title}</p>
                <p className="text-[30px] text-gray-700 mt-2">{post.body}</p>
              </div>
            </div>
            <div className="text-[24px] text-gray-500">{new Date(post.created_at).toLocaleDateString()}</div>
          </div>

          {isOwner && (
            <div className="mt-8 flex justify-end space-x-4">
              <button
                className="text-[20px] text-black font-bold"
                onClick={() => router.push(`/edit/${id}`)}
              >
                Editar
              </button>
              <button
                className="text-[20px] text-[#963838] font-bold"
                onClick={handleDelete}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
