'use client';
import { useState, useEffect } from "react";
import { FaUser, FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [activePostOptions, setActivePostOptions] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = () => {
      const storedUserProfile = localStorage.getItem("userProfile");
      if (storedUserProfile) {
        setUserProfile(JSON.parse(storedUserProfile));
      } else {
        router.push("/login"); 
      }
    };

    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch("http://localhost:8080/v1/nekoda/posts");
        const postsData = await postsResponse.json();

        const usersResponse = await fetch("http://localhost:8080/v1/nekoda/users");
        const usersData = await usersResponse.json();

        const usersMap = usersData.users.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});

        const postsWithUsernames = postsData.posts.map((post) => ({
          ...post,
          username: usersMap[post.user_id] || "Desconhecido",
        }));


        postsWithUsernames.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setPosts(postsWithUsernames);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, [router]);

  const handlePostModal = () => {
    setShowModal(!showModal);
  };

  const handlePostSubmit = async () => {
    if (!postTitle || !postContent) {
      alert("Título e conteúdo do post são obrigatórios!");
      return;
    }

    try {
      const newPost = {
        title: postTitle,
        body: postContent,
        user_id: userProfile.id,
      };

      const response = await fetch("http://localhost:8080/v1/nekoda/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const result = await response.json();
        setPosts([result.post, ...posts]);
        setShowModal(false);
        setPostTitle("");
        setPostContent("");
      } else {
        console.error("Erro ao postar:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  const togglePostOptions = (postId) => {
    setActivePostOptions((prev) => (prev === postId ? null : postId));
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/v1/nekoda/posts/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error("Erro ao deletar post:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[266px] bg-[#882525] flex flex-col items-center py-8">
        <h1 className="text-white font-bold text-[36px] mb-12">NEKODA</h1>
        <button className="w-[242px] h-[54px] bg-[#963838] text-white font-bold text-[40px] rounded-[10px] mb-4">
          Início
        </button>
        <button onClick={handlePostModal} className="w-[242px] h-[54px] bg-white text-[#963838] font-bold text-[40px] rounded-[10px]">
          Postar
        </button>
        <div className="mt-auto flex items-center w-full px-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FaUser className="text-[#882525] text-[24px]" />
          </div>
          <p className="ml-2 text-white font-bold text-[40px]">
            {userProfile?.name || "Carregando..."}
          </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-white">
        <header className="text-center py-6">
          <h2 className="text-[#963838] font-bold text-[55px]">Para você</h2>
          <div className="mx-auto mt-2 w-[350px] border-b-[3px] border-[#963838]"></div>
        </header>

        <div className="flex-1 overflow-y-scroll p-6 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-200 p-7 rounded shadow relative">
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/post/${post.id}`)} 
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <FaUser className="text-gray-500 text-[40px]" />
                    <div>
                      <p className="font-bold text-[20px]">{post.username}</p>
                      <p className="text-[30px] mt-2">{post.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-[20px]">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {post.user_id === userProfile?.id && (
                <div className="absolute top-4 right-4">
                  <button onClick={() => togglePostOptions(post.id)}>
                    <FaEllipsisV />
                  </button>
                  {activePostOptions === post.id && (
                    <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded">
                      <button
                        onClick={() => router.push(`/edit/${post.id}`)} 
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Deletar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <button onClick={handlePostModal} className="absolute top-4 left-4 text-black">
              X
            </button>
            <input
              type="text"
              placeholder="Título"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              placeholder="O que está acontecendo?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full h-[200px] p-2 border rounded"
            />
            <button onClick={handlePostSubmit} className="w-full bg-[#882525] text-white py-2 rounded">
              Postar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
