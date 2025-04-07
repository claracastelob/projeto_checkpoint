import styles from "./styles.module.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import ConfigurationsModal from "./components/configurationsModal"
import { useState } from "react"
import { useEffect } from "react"
import api from "../../services/api"

export default function Configuration() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [confirmField, setConfirmField] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");

      try {
        const response = await api.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { id, user, email } = response.data;
        setUserId(id);

        setTimeout(() => {
          setUsername(user);
          setEmail(email);
          setDataLoaded(true);
        }, 500);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    setUsernameError("");
    setEmailError("");
    setGeneralError("");
    setSuccessMessage("");

    if (!userId || !confirmField) return;

    let payload = {};

    if (confirmField === "username") {
      payload.user = username.trim();
    }
  
    if (confirmField === "email") {
      payload.email = email.trim();
    }
  
    if (confirmField === "newPassword" && newPassword.trim() !== "") {
      payload.password = newPassword.trim();
    }

    try {
      await api.put(`/users/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConfirmField(null);
      setNewPassword("");

      setSuccessMessage("Dados atualizados com sucesso!");

    } catch (error) {
      const detail = error.response?.data?.detail;
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
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Configurações</h1>
        </div>
        <div className={styles.configurations}>
          {generalError && <p className={styles.errorUpdate}>{generalError}</p>}
          {successMessage && <p className={styles.successAlert}>{successMessage}</p>}
          {usernameError && <p className={styles.errorUpdate}>{usernameError}</p>}
          {emailError && <p className={styles.errorUpdate}>{emailError}</p>}
          <label htmlFor="username" className={styles.label}>Alterar Usuário</label>
          <div className={styles.inputContainer}>
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} className={styles.inputs} />
            <button className={styles.btns} onClick={() => {setConfirmField("username"); setOpenModal(true)}}>Alterar</button>
          </div>

          <label htmlFor="email" className={styles.label}>Alterar E-mail</label>
          <div className={styles.inputContainer}>
            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} className={styles.inputs} />
            <button className={styles.btns} onClick={() => {setConfirmField("email"); setOpenModal(true)}}>Alterar</button>
          </div>
          
          <label htmlFor="password" className={styles.label}>Alterar Senha</label>
          <div className={styles.inputContainer}>
            <input type="password" id="password" onChange={(e) => setNewPassword(e.target.value)} className={styles.inputs} />
            <button className={styles.btns} onClick={() => {setConfirmField("newPassword"); setOpenModal(true)}}>Alterar</button>
          </div>
        </div>
      </main>
    {openModal && confirmField && (
      <ConfigurationsModal
        isOpen={openModal}
        onClose={() => {
        setOpenModal(false);
        setConfirmField(null);
      }}
      onConfirm={handleUpdate}
    />
  )}
  </div>
)}