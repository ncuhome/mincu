import { Ready } from 'mincu-react'
import { Demo, Fallback } from 'mincu-react-demo-shared';

const App = () => {
  return (
    <Ready fallback={<Fallback />}>
      <Demo />
    </Ready>
  )
}

export default App
