import { useLocalSearchParams } from "expo-router";
import Tela from "../../components/Tela";
import Perfil from "../../components/Perfil";

export default function PerfilUsuario() {
  const { user } = useLocalSearchParams();
  return (
    <Tela voltar>
      <Perfil id={user} />
    </Tela>
  );
}