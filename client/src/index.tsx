import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TextBlockWithTitle } from './components/TextBlockWithTitle'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TextBlockWithTitle title='Test' paragraphs={['par1', 'par2']} />
  </StrictMode>,
)
