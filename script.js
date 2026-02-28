// ⚡ Firebase Auth imports
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

// Inicializa o Auth
const auth = getAuth();

// Formulários e mensagens
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

const msgLogin = document.getElementById("msgLogin");
const msgCadastro = document.getElementById("msgCadastro");

// ===== FUNÇÕES PARA ALTERNAR TELAS =====
// Expondo para o HTML poder chamar via onclick
window.mostrarCadastro = function() {
  loginForm.style.display = "none";
  cadastroForm.style.display = "block";
  msgLogin.textContent = "";
}

window.mostrarLogin = function() {
  cadastroForm.style.display = "none";
  loginForm.style.display = "block";
  msgCadastro.textContent = "";
}

// Mostrar login ao abrir
mostrarLogin();

// ===== LOGIN =====
loginForm.addEventListener("submit", async function(e){
  e.preventDefault();

  // ✅ Adicionado .trim() para remover espaços extras
  const email = document.getElementById("loginuser").value.trim();
  const senha = document.getElementById("loginpass").value;

  if (!email || !senha) {
    msgLogin.textContent = "Preencha todos os campos!";
    msgLogin.className = "mensagem erro";
    return;
  }

try {
  const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  msgLogin.textContent = "Login realizado com sucesso!";
  msgLogin.className = "mensagem sucesso";
  console.log("Usuário logado:", userCredential.user);
//p ir p outra tela se der certo td
  window.location.href = "dashboard.html"; // coloque aqui a página que quer abrir
} catch (error) {
  msgLogin.textContent = "Erro no login: " + error.message;
  msgLogin.className = "mensagem erro";
}
});

// ===== CADASTRO =====
cadastroForm.addEventListener("submit", async function(e){
  e.preventDefault();

  // ✅ Adicionado .trim() para remover espaços extras
  const email = document.getElementById("cadastroemail").value.trim();
  const senha = document.getElementById("cadastropass").value;

  if (!email || !senha) {
    msgCadastro.textContent = "Preencha todos os campos!";
    msgCadastro.className = "mensagem erro";
    return;
  }

  // Mantendo a validação de senha 6 caracteres
  if (senha.length < 6) {
    msgCadastro.textContent = "A senha deve ter pelo menos 6 caracteres!";
    msgCadastro.className = "mensagem erro";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    msgCadastro.textContent = "Cadastro realizado com sucesso!";
    msgCadastro.className = "mensagem sucesso";
    console.log("Usuário criado:", userCredential.user);
  } catch (error) {
    msgCadastro.textContent = "Erro no cadastro: " + error.message;
    msgCadastro.className = "mensagem erro";
  }
});

// ===== MONITORAR ESTADO DE LOGIN (OPCIONAL) =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário está logado:", user.email);
    // Aqui você pode redirecionar ou mostrar algo diferente
  } else {
    console.log("Nenhum usuário logado");
  }
});

