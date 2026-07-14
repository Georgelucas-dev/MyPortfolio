// useRealTime.ts
import { useState, useEffect } from "react";

export function useRealTime(): string {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();

      const formato = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setTime(formato.format(agora));
    };

    atualizarHora();
    const interval = setInterval(atualizarHora, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}