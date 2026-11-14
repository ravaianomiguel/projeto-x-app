import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { storageGet, storageSet } from "../utils/secureStore";

const TemaContext = createContext(null);

const temas = {
  claro: {
    primaria: "#004987",
    primariaClara: "#d6e6f5",
    botaoFundo: "#004987",
    botaoTexto: "#ffffff",
    fundo: "#ffffff",
    superficie: "#f4f4f5",
    superficieAlt: "#e4e4e7",
    texto: "#18181b",
    textoMuted: "#71717a",
    textoSecondary: "#3f3f46",
    borda: "#d4d4d8",
    erro: "#dc2626",
    sucesso: "#15803d",
    sombra: "#000000",
  },
  escuro: {
    primaria: "#7cc4ff",
    primariaClara: "#12304d",
    botaoFundo: "#1d4ed8",
    botaoTexto: "#ffffff",
    fundo: "#09090b",
    superficie: "#18181b",
    superficieAlt: "#27272a",
    texto: "#fafafa",
    textoMuted: "#a1a1aa",
    textoSecondary: "#d4d4d8",
    borda: "#3f3f46",
    erro: "#f87171",
    sucesso: "#4ade80",
    sombra: "#000000",
  },
};

export function TemaProvider({ children }) {
  const sistema = useColorScheme();
  const [modo, setModo] = useState(sistema === "dark" ? "escuro" : "claro");

  useEffect(() => {
    const carregar = async () => {
      const salvo = await storageGet("tema");
      if (salvo.ok && temas[salvo.val]) setModo(salvo.val);
    };
    carregar();
  }, []);

  const definirTema = async (novoModo) => {
    setModo(novoModo);
    await storageSet("tema", novoModo);
  };

  return (
    <TemaContext.Provider value={{ modo, cores: temas[modo], definirTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
