import clsx from "clsx";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);

  function makeAmount() {
    let a = Math.round(1 + Math.random() * 10);
    if (count > 10 && Math.random() < 0.5) {
      a *= -1;
    }
    setAmount(a);
  }

  useEffect(() => {
    setCount((c) => c + amount);
  }, [amount]);

  return (
    <main
      className={clsx(
        "flex h-screen max-h-dvh cursor-pointer flex-col items-center justify-center text-9xl font-black select-none",
        amount == 0 && "text-yellow-600",
        amount > 0 && "text-green-600",
        amount < 0 && "text-red-600",
      )}
      onClick={makeAmount}
    >
      {count == 0 ? "Click!" : count}
    </main>
  );
}

export default App;
