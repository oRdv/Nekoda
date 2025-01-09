'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
  
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/nekoda/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
          setTitle(data.post.title);
          setContent(data.post.body);
        } else {
          console.error('Erro ao carregar o post:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSave = async () => {
    try {
        const userProfile = JSON.parse(localStorage.getItem('userProfile')); 
        const updatedPost = {
            title,
            body: content,
            user_id: userProfile?.id,
        };

        const response = await fetch(`http://localhost:8080/v1/nekoda/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        });

        if (response.ok) {
            alert('Post atualizado com sucesso!');
            router.push(`/post/${id}`);
        } else {
            console.error('Erro ao atualizar o post:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
    }
};


  if (!post) {
    return <div>Carregando...</div>;
  }

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
            onClick={() => router.push(`/post/${id}`)}
          >
            <FiArrowLeft className="mr-3" />
            <span className="font-bold" style={{ fontSize: '50px' }}>
              Edit
            </span>
          </div>

          <div
            className="bg-gray-200 rounded-[12px] shadow p-8 mx-auto flex flex-col justify-between"
            style={{
              width: '960px',
              boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex flex-col">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-[36px] font-bold text-[#882525] mb-4 focus:outline-none bg-gray-200 p-2 rounded"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[200px] p-4 text-gray-800 text-[18px] rounded focus:outline-none resize-none bg-gray-200"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#882525] text-white rounded-[10px] text-[30px]"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 