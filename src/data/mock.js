// Dados falsos só para desenvolver as telas.
// Quando a API existir, estas funções são substituídas por chamadas fetch
// (ex: getTutorial -> GET /tutoriais/:id) e o resto do app quase não muda.
//
// Obs: aqui o "dono" de cada item é identificado pelo username (e não por
// usuarioID) porque a rota de perfil já usa o username: /profile/[user].

export const usuarios = [
  { username: "miguel", realname: "Miguel", biography: "Aprendendo crochê e aquarela." },
  { username: "ana_croche", realname: "Ana Souza", biography: "Crochê desde 2015. Amigurumis e bolsas." },
  { username: "bia.pinta", realname: "Beatriz Lima", biography: "Pinturas em tela e aquarela." },
];

export const tutoriais = [
  {
    id: "1",
    username: "ana_croche",
    title: "Amigurumi de coelho",
    content: "Material: lã, agulha 3mm e enchimento.\n1. Faça um anel mágico.\n2. Aumente a cada carreira até formar a cabeça.\n3. Continue com o corpo, as orelhas e os braços.",
  },
  {
    id: "2",
    username: "bia.pinta",
    title: "Aquarela: céu ao entardecer",
    content: "Material: papel 300g, tintas azul, laranja e rosa.\n1. Molhe o papel.\n2. Aplique as cores de cima para baixo.\n3. Deixe secar na horizontal.",
  },
  {
    id: "3",
    username: "ana_croche",
    title: "Bolsa de crochê com fio de malha",
    content: "Material: fio de malha e agulha 8mm.\n1. Faça a base oval.\n2. Suba as laterais em ponto baixo.\n3. Finalize com as alças.",
  },
];

// fotos: lista com um item por foto (por enquanto só o número importa)
export const interacoes = [
  { id: "1", tutorialID: "1", username: "miguel", desc: "Ficou bem parecido! Usei lã azul.", fotos: ["1", "2"] },
  { id: "2", tutorialID: "2", username: "miguel", desc: "Minha primeira aquarela.", fotos: ["1"] },
  { id: "3", tutorialID: "1", username: "bia.pinta", desc: "Fiz em duas cores.", fotos: ["1", "2", "3"] },
];

export function getUsuario(username) {
  return usuarios.find((u) => u.username === username);
}

export function getTutorial(id) {
  return tutoriais.find((t) => t.id === id);
}

export function tutoriaisDoUsuario(username) {
  return tutoriais.filter((t) => t.username === username);
}

export function interacoesDoUsuario(username) {
  return interacoes.filter((i) => i.username === username);
}

export function interacoesDoTutorial(tutorialID) {
  return interacoes.filter((i) => i.tutorialID === tutorialID);
}