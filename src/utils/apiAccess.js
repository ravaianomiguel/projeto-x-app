import { storageGet, storageSet } from "./secureStore";

async function fetchApi(uri){
  const url = "https://ambiguity-trench-duckling.ngrok-free.dev/"+uri;
  try {
    const response = await fetch(url, {
      headers: { "ngrok-skip-browser-warning": "1" },
    });
    if  (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return error.message;
  }
}

export function getTutoriais(){
  return fetchApi("tutoriais")
}


export function getUsuarios() {
  return fetchApi(`usuarios`)
}

export function getUsuario(id) {
  return fetchApi(`usuarios/${id}`)
}

export function getTutorial(id) {
  return fetchApi(`tutoriais/${id}`)
}

export function tutoriaisDoUsuario(id) {
  return fetchApi(`usuarios/${id}/tutoriais`)
}

export function interacoesDoUsuario(id) {
  return fetchApi(`usuarios/${id}/interacoes`)
}

export function interacoesDoTutorial(id) {
  return fetchApi(`tutoriais/${id}/interacoes`)
}

export function fotosDaInteracao(id) {
  return fetchApi(`interacoes/${id}/fotos`)
}

export async function login(username, senha){
  console.log(username+' '+senha)
  const url = "https://ambiguity-trench-duckling.ngrok-free.dev/auth/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "ngrok-skip-browser-warning": "1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, senha})
    });
    
    const result = await response.json();
    if  (!response.ok) {
      return {ok: false, message: result.message}
    }
    
    await storageSet("logado", "1");
    await storageSet("usuarioId", String(result.usuario.id));
    await storageSet("token", String(result.token));

    return {ok: true};
  } catch (error) {
    return {ok: false, message: error.message};
  }
}

export async function registro(data, edit){
  const url = "https://ambiguity-trench-duckling.ngrok-free.dev/"+(edit ? `usuarios/${data.id}`: "auth/register");
  const token = await storageGet("token")
  console.log(token)
  try {
    const response = await fetch(url, {
      method: edit ? "PATCH" : "POST",
      headers: { 
        "ngrok-skip-browser-warning": "1",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.val}`
      },
      body: JSON.stringify(data)
    });
    if(response.ok) return {ok:true}
    const result = await response.json();
    return {ok: false, message: result.message}

  } catch (error) {
    return {ok: false, message: error.message};
  }
}
