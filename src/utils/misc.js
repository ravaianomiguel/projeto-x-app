import { storageSet } from "./secureStore";

export async function logout() {
    await storageSet("logado", "");
    await storageSet("usuarioId", "");
    await storageSet("token", "");
}
