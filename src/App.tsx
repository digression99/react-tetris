import { useSelector } from 'react-redux';
import { Heading } from '@chakra-ui/react'
import { PixelFieldDisplay } from './components/PixelFieldDisplay';
import { selectPixelField } from './features/playfield/playfieldSlice';
import { Playfield } from './components/Playfield';

function App() {
  const pixelField = useSelector(selectPixelField)

  return (
    <div>
      <Heading>
        React Tetris
      </Heading>

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
