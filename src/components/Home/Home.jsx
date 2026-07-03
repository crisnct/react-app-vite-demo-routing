import React, { useEffect, useState } from "react";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const counterId = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => {
      console.log("Home unmounted");
      clearInterval(counterId);
    };
  }, [running]);

  return (
    <div>
      <h2>Home</h2>
      <p>Counter: {counter}</p>
      <div>
        <button onClick={() => setRunning(false)}>Stop</button>
      </div>
    </div>
  );
};

export default Home;
