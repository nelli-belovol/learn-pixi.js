import { useEffect, useState, useRef } from 'react';

import './App.css';
import { Test } from './Test';

function App() {
  const [canvasWrapper, setCanvasWrapper] = useState<HTMLDivElement | null>();
  const game = useRef<Test | null>(null);

  useEffect(() => {
    if (canvasWrapper) {
      game.current = new Test({
        canvasWrapper,
      });
    }
    return () => {
      game.current?.destroy();
      game.current = null;
    };
  }, [canvasWrapper]);

  return <div ref={setCanvasWrapper} className="canvasWrapper"></div>;
}

export default App;
