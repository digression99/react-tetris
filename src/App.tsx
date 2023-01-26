import { useSelector } from 'react-redux';
import { PixelFieldDisplay } from './components/PixelFieldDisplay';
import { selectPixelField } from './features/playfield/playfieldSlice';
import { Playfield } from './components/Playfield';

function App() {
  const pixelField = useSelector(selectPixelField)

  return (
    <div>
      <h2>
        React Tetris
      </h2>

      <div>
        <Playfield />
      </div>

      <div>
        <PixelFieldDisplay pixelField={pixelField} />
      </div>
    </div>
  );
}

export default App;
