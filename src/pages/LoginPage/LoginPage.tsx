import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context.tsx/AuthContext";
import api from "../../services/api";
import RegisterModal from "./ModalRegistroUsuario";
import ForgotPasswordModal from "./ModalRecuperarUsuario";
import ResetPasswordModal from "./ModalDeNovaSenha";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleGoogleToken = useCallback(
    (token: string) => {
      try {
        localStorage.setItem("token", token);

        const user = {};

        login(token, user);
        navigate("/TelaInicial");
      } catch (error) {
        console.error("Erro ao processar o login com o Google:", error);
        setError("Erro ao processar o login com o Google.");
      }
    },
    [login, navigate]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      handleGoogleToken(token);
    } else if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [handleGoogleToken]);

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, senha });

      if (response.status === 200) {
        const { token, user } = response.data;

        if (!token) {
          throw new Error("Token não recebido do servidor");
        }

        login(token, user);
        setEmail("");
        setSenha("");
        navigate("/TelaInicial");
      } else {
        console.log("Erro ao Logar:", response.data);
      }
    } catch (error: any) {
      console.error("Erro de login:", error);

      if (error.response) {
        if (error.response.status === 401) {
          setError("Credenciais inválidas. Por favor, tente novamente.");
        } else if (error.response.status === 500) {
          setError(
            "O servidor encontrou um erro. Por favor, tente novamente mais tarde."
          );
        }
      } else {
        setError(
          "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  const openResetPasswordModal = (email: string) => {
    setResetEmail(email);
    setIsResetPasswordModalOpen(true);
  };
  const closeResetPasswordModal = () => setIsResetPasswordModalOpen(false);

  const handleForgotPasswordSuccess = (email: string) => {
    closeForgotPasswordModal();
    openResetPasswordModal(email);
  };

  return (
    <div className="relative select-none flex flex-col h-screen bg-cover bg-center bg-custom-bg">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="rounded-lg bg-white bg-opacity-20 w-96 h-96 flex flex-col items-center justify-center p-10 mb-2">
          <input
            className="mb-1 mt-3 roboto rounded-lg p-2 w-full border-[#9e9e9e] border hover:border hover:w-full transition-all text-center"
            type="text"
            id="email"
            placeholder="Entre com o seu email"
            value={email}
            onChange={handleUserChange}
          />

          <input
            ref={passwordRef}
            className="mb-3 mt-3 rounded-lg p-2 w-full border-[#9e9e9e] border hover:border hover:w-full transition-all text-center"
            type="password"
            id="senha"
            placeholder="Entre com a sua senha"
            value={senha}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
          />

          {error && (
            <div className="text-[#4CAF50] font-bold mt-2">{error}</div>
          )}
          <button
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 text-white font-bold py-2 px-2 rounded-lg mb-2"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-2 px-4 rounded-lg mb-2 flex items-center justify-center border border-gray-300"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://img.icons8.com/color/20/000000/google-logo.png"
              alt="Google logo"
              className="mr-2"
            />
            Login com Google
          </button>

          <div className="flex justify-between w-full mt-4">
            <button
              className="rounded-lg px-2 bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 text-white"
              onClick={openRegisterModal}
            >
              Criar conta
            </button>
            <button
              className="rounded-lg px-2 bg-gradient-to-r from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700 text-white"
              onClick={openForgotPasswordModal}
            >
              Esqueci minha senha
            </button>
          </div>
        </div>
      </div>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
      />
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onRequestClose={closeForgotPasswordModal}
        onSuccess={handleForgotPasswordSuccess}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onRequestClose={closeResetPasswordModal}
        email={resetEmail}
      />
    </div>
  );
};

export default Login;
