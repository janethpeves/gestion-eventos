import { useEffect, useState, useRef } from 'react';

interface CountdownTimer3Props {
  initialMinutes: number;
  handlePause: () => void;
  isRunning: boolean;
  resetTrigger: number;
  addTime: boolean;
  setAddTime: (addTime: boolean) => void;
  onElapsedTimeChange: (elapsedTime: number) => void;
}

const CountdownTimer = ({ initialMinutes, handlePause, isRunning, resetTrigger, addTime, setAddTime, onElapsedTimeChange }: CountdownTimer3Props) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convertir a segundos
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedTimeRef = useRef<number>(0);

  // Formatea el tiempo a HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Actualizar timeLeft cuando cambie initialMinutes o resetTrigger
  useEffect(() => {
    setTimeLeft(initialMinutes * 60);
    elapsedTimeRef.current = 0; // Reiniciar tiempo transcurrido cuando se reinicia
    onElapsedTimeChange(0);
  }, [initialMinutes, resetTrigger, onElapsedTimeChange]);

  useEffect(() => {
    if (addTime) {
      setTimeLeft(timeLeft + 60);
      setAddTime(false);
    }
  }, [addTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        elapsedTimeRef.current += 1;
        onElapsedTimeChange(elapsedTimeRef.current); // Comunicar al componente padre
      }, 1000);
    }

    if (timeLeft === 0) {
      // Notificar al componente padre que el tiempo se acabó
      handlePause();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft, handlePause, onElapsedTimeChange]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>{formatTime(timeLeft)}</h1>
    </div>
  );
};

export default CountdownTimer;
