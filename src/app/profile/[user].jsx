import { useLocalSearchParams } from "expo-router"; // [NÃO BÁSICO] ver nota abaixo
import Tela from "../../components/Tela";
import Perfil from "../../components/Perfil";

// Perfil de qualquer usuário: rota /profile/<username>.
// NOTA: useLocalSearchParams (expo-router) devolve os parâmetros da rota.
// Como o arquivo se chama [user].jsx, o valor da URL vem em `user`
// (em /profile/ana_croche, user === "ana_croche"). Sempre chega como texto.
export default function PerfilUsuario() {
  const { user } = useLocalSearchParams();
  return (
    <Tela voltar>
      <Perfil username={user} />
    </Tela>
  );
}