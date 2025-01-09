'use client';
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const router = useRouter();

  const handlePostModal = () => {
    setShowModal(!showModal);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  };

  const posts = [
    { id: 1, title: "Título do post 1", content: "Conteúdo do post 1", date: "10/01/20", user: "Neko", username: "@nekoda" },
    { id: 2, title: "Título do post 2", content: "Conteúdo do post 2", date: "11/01/20", user: "Neko", username: "@nekoda" },
  ];

  const handlePostClick = (id) => {
    router.push(`/post/${id}`);
  };

  return (
    <div className="flex h-screen" onKeyDown={handleKeyPress} tabIndex={0}>
      <aside
        className="w-[266px] bg-[#882525] flex flex-col items-center py-8"
        style={{ height: "100vh" }}
      >
        <h1 className="text-white font-bold text-[36px] mb-12">NEKODA</h1>
        <button
          className="w-[242px] h-[54px] bg-[#963838] text-white font-bold text-[40px] rounded-[10px] mb-4"
        >
          Início
        </button>
        <button
          onClick={handlePostModal}
          className="w-[242px] h-[54px] bg-white text-[#963838] font-bold text-[40px] rounded-[10px]"
        >
          Postar
        </button>
        <div className="mt-auto flex items-center w-full px-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FaUser className="text-[#882525] text-[24px]" />
          </div>
          <p className="ml-2 text-white font-bold text-[40px]">Neko</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-white">
        <header className="text-center py-6">
          <h2 className="text-[#963838] font-bold text-[55px]">Para você</h2>
          <div className="mx-auto mt-2 w-[350px] border-b-[3px] border-[#963838]"></div>
        </header>

        <div className="flex-1 overflow-y-scroll p-6 space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="bg-gray-200 p-7 rounded flex items-center justify-between shadow cursor-pointer"
              style={{ height: "137px" }}
            >
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-500 text-[40px]" />
                <div>
                  <div className="flex items-center space-x-2">
                    <p
                      className="font-bold text-[35px]"
                      style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    >
                      {post.user}
                    </p>
                    <p
                      className="text-[20px]"
                      style={{ color: "rgba(0, 0, 0, 0.6)" }}
                    >
                      {post.username}
                    </p>
                  </div>
                  <p className="text-[30px] mt-2">{post.title}</p>
                </div>
              </div>

              <div className="text-[20px] text-gray-500">{post.date}</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded shadow-lg relative"
            style={{ width: "1100px", height: "488px" }}
          >
            <button
              onClick={handlePostModal}
              className="absolute top-4 left-4 text-black font-bold text-[20px]"
            >
              X
            </button>
            <div className="flex items-center mb-6">
              <FaUser className="text-[#882525] text-[40px] mr-4" />
              <input
                type="text"
                className="text-[#882525] text-[20px] font-bold focus:outline-none"
                placeholder="Título"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <textarea
              className="w-full h-[300px] border border-gray-300 rounded p-4 text-gray-800 text-[18px] focus:outline-none resize-none"
              placeholder="O que está acontecendo?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePostModal}
                className="px-6 py-2 bg-[#882525] text-white rounded-[10px]"
              >
                Postar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
