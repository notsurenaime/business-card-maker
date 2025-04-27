import { useState } from 'react'
import './App.css'
import BusinessCardPreview from './components/BusinessCardPreview'
import SettingsPanel from './components/SettingsPanel'

function App() {
  const [cardData, setCardData] = useState({
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    website: 'www.johndoe.com',
    address: '123 Tech Lane, Silicon Valley, CA',
    color: '#4A90E2',
    fontColor: '#FFFFFF',
    logoPosition: 'left' as 'left' | 'center' | 'right',
    logoImage: null as string | null
  })

  return (
    <div className="app-container">
      <h1 className="app-title">Business Card Maker</h1>
      <div className="content-container">
        <BusinessCardPreview cardData={cardData} />
        <SettingsPanel cardData={cardData} setCardData={setCardData} />
      </div>
      <div className="copyright">© {new Date().getFullYear()} Malango Tech Labs</div>
    </div>
  )
}

export default App
