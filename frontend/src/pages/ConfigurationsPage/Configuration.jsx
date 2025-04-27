import styles from "./styles.module.css"
import { useState } from "react"
import { useEffect } from "react"
import api from "../../services/api"
import Topbar from "../../components/Topbar/index"

export default function Configuration() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("Token não encontrado.");
        return;
      }
  
      try {
        const response = await api.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { id, user, email } = response.data;
        setUserId(id);
        setUsername(user);
        setEmail(email);
        setDataLoaded(true);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    }
  
    fetchUserData();
    return () => {
      setUserId(null);
      setUsername(""); 
      setEmail("");
    };
  }, []);

  const handleUpdate = async (field) => {
    
    setUsernameError("");
    setEmailError("");
    setGeneralError("");
    setSuccessMessage("");
    
    if (!userId || !field) {
      return;
    }
    
    let payload = {};
  
    if (field === "username" && username.trim() !== "") {
      payload.user = username.trim();
    }
  
    if (field === "email" && email.trim() !== "") {
      payload.email = email.trim();
    }
  
    if (field === "newPassword" && newPassword.trim() !== "") {
      payload.password = newPassword.trim();
    }
  
    if (Object.keys(payload).length === 0) {
      console.log("Nenhum dado para atualizar.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await api.put(`/users/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setNewPassword("");
      setSuccessMessage("Dados atualizados com sucesso!");

      if (field === "username") {
        setUsername(username.trim());
      }

    } catch (error) {
      const detail = error.response?.data?.detail;
      console.error("Erro ao atualizar: ", error.response);
  
      if (error.response?.status === 409) {
        if (detail === "E-mail já cadastrado") {
          setEmailError("Este e-mail já está em uso.");
        } else if (detail === "Username já em uso") {
          setUsernameError("Este nome de usuário já está em uso.");
        } else {
          setGeneralError("Erro de conflito: " + detail);
        }
      } else if (error.response?.status === 400) {
        setGeneralError("Permissão negada.");
      } else {
        setGeneralError("Erro inesperado: " + detail);
      }
    }
  };

  return(
    <div className={styles.container}>
      <Topbar />
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Configurações</h1>
        </div>
        <div className={styles.messageWrapper}>
          {generalError && <p className={styles.errorUpdate}>{generalError}</p>}
          {usernameError && <p className={styles.errorUpdate}>{usernameError}</p>}
          {emailError && <p className={styles.errorUpdate}>{emailError}</p>}
          {successMessage && <p className={styles.successAlert}>{successMessage}</p>}
        </div>
        <div className={styles.configurations}>
          <div className={styles.configSection}>
            <h2>Username</h2>
            <label htmlFor="username" className={styles.label}>Alterar Usuário</label>
            <div className={styles.inputContainer}>
              <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} className={styles.inputs} />
              <button className={styles.btns} onClick={() => handleUpdate("username")}>Alterar</button>
            </div>
          </div>

          <div className={styles.configSection}>
            <h2>E-mail</h2>
            <label htmlFor="email" className={styles.label}>Alterar E-mail</label>
            <div className={styles.inputContainer}>
              <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} className={styles.inputs} />
              <button className={styles.btns} onClick={() => handleUpdate("email")}>Alterar</button>
            </div>
          </div>
          
          <div className={styles.configSection}>
            <h2>Senha</h2>
            <label htmlFor="password" className={styles.label}>Alterar Senha</label>
            <div className={styles.inputContainer}>
              <input type="password" id="password" onChange={(e) => setNewPassword(e.target.value)} className={styles.inputs} />
              <button className={styles.btns} onClick={() => handleUpdate("newPassword")}>Alterar</button>
            </div>
          </div>
        </div>
      </main>
  </div>
)}