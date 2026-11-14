import { storageGet, storageSet } from "./secureStore";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

const API_URL = "https://ambiguity-trench-duckling.ngrok-free.dev/";

async function fetchApi(uri, { method = "GET", body, auth = false } = {}) {
  const headers = { "ngrok-skip-browser-warning": "1" };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = await storageGet("token");
    if (token.ok) {
      headers.Authorization = `Bearer ${token.val}`;
    }
  }

  try {
    const response = await fetch(API_URL + uri, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return {
        ok: false,
        message: result?.message || result?.erro || `Response status: ${response.status}`,
      };
    }

    return { ok: true, data: result };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

async function getApi(uri) {
  const resultado = await fetchApi(uri);
  return resultado.ok ? resultado.data : resultado.message;
}

export function getTutoriais() {
  return getApi("tutoriais");
}

export function getUsuarios(incluirFoto = false) {
  return getApi(incluirFoto ? "usuarios?foto=1" : "usuarios");
}

export function getUsuario(id, incluirFoto = false) {
  return getApi(incluirFoto ? `usuarios/${id}?foto=1` : `usuarios/${id}`);
}

export function getTutorial(id) {
  return getApi(`tutoriais/${id}`);
}

export function tutoriaisDoUsuario(id) {
  return getApi(`usuarios/${id}/tutoriais`);
}

export function interacoesDoUsuario(id) {
  return getApi(`usuarios/${id}/interacoes`);
}

export function interacoesDoTutorial(id) {
  return getApi(`tutoriais/${id}/interacoes`);
}

export function fotosDaInteracao(id) {
  return getApi(`interacoes/${id}/fotos`);
}

export async function login(username, senha) {
  const resultado = await fetchApi("auth/login", {
    method: "POST",
    body: { username, senha },
  });

  if (!resultado.ok) return resultado;

  await storageSet("logado", "1");
  await storageSet("usuarioId", String(resultado.data.usuario.id));
  await storageSet("token", String(resultado.data.token));

  return resultado;
}

export async function loginComGithub() {
  const redirectUrl = process.env.EXPO_PUBLIC_APP_REDIRECT_URI;

  if (!redirectUrl) {
    return { ok: false, message: "EXPO_PUBLIC_APP_REDIRECT_URI não configurado no app." };
  }

  const authUrl = API_URL + "auth/github";

  try {
    const resultado = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

    if (resultado.type !== "success") {
      return { ok: false, cancelado: true, message: "Login com GitHub cancelado." };
    }

    const { queryParams } = Linking.parse(resultado.url);

    if (queryParams.error) {
      return { ok: false, message: String(queryParams.error) };
    }

    if (!queryParams.token || !queryParams.usuarioId) {
      return { ok: false, message: "Login com GitHub não retornou os dados esperados." };
    }

    await storageSet("logado", "1");
    await storageSet("usuarioId", String(queryParams.usuarioId));
    await storageSet("token", String(queryParams.token));

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export function registro(data, edit) {
  return fetchApi(edit ? `usuarios/${data.id}` : "auth/registrar", {
    method: edit ? "PATCH" : "POST",
    body: data,
    auth: edit,
  });
}

export function definirSenha(senha) {
  return fetchApi("auth/senha", {
    method: "PATCH",
    body: { senha },
    auth: true,
  });
}

export function criarTutorial({ title, content }) {
  return fetchApi("tutoriais", {
    method: "POST",
    body: { title, content },
    auth: true,
  });
}

export function criarInteracao({ desc, tutorialId }) {
  return fetchApi("interacoes", {
    method: "POST",
    body: { desc, tutorialId },
    auth: true,
  });
}

export function criarFoto(interacaoId, picture) {
  return fetchApi(`interacoes/${interacaoId}/fotos`, {
    method: "POST",
    body: { picture },
    auth: true,
  });
}
