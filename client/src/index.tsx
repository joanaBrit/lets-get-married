import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TextBlockWithTitle } from './components/TextBlockWithTitle'
import { StyledButton } from './components/StyledButton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TextBlockWithTitle title='Test' paragraphs={['par1', 'par2']} />
    <StyledButton onClick={()=>console.log('his')}>
      Test
    </StyledButton>
  </StrictMode>,
)
