import { ChangeEvent, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import './Components.css'

type CardDataProps = {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  address: string
  color: string
  fontColor: string
  logoPosition: 'left' | 'center' | 'right'
  logoImage: string | null
}

interface SettingsPanelProps {
  cardData: CardDataProps
  setCardData: (data: CardDataProps) => void
}

export default function SettingsPanel({ cardData, setCardData }: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeSection, setActiveSection] = useState<string>('personal')

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCardData({ ...cardData, [name]: value })
  }

  // Handle logo upload
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCardData({
            ...cardData,
            logoImage: event.target.result as string
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle logo removal
  const handleRemoveLogo = () => {
    setCardData({
      ...cardData,
      logoImage: null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle card export as image
  const handleExportCard = () => {
    const frontCardElement = document.querySelector('.card-front')
    if (frontCardElement) {
      html2canvas(frontCardElement as HTMLElement, {
        backgroundColor: null,
        scale: 2, // Higher quality
      }).then(canvas => {
        // Create a temporary link element to trigger download
        const link = document.createElement('a')
        link.download = `${cardData.name.replace(/\s+/g, '-').toLowerCase()}-business-card.png`
        link.href = canvas.toDataURL('image/png')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }

  return (
    <div className="settings-panel-container">
      <div className="settings-panel">
        <div className="settings-panel-shadow"></div>
        <h2>Card Settings</h2>
        
        <div className="settings-tabs">
          <button 
            className={`tab-button ${activeSection === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveSection('personal')}
          >
            Personal
          </button>
          <button 
            className={`tab-button ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contact
          </button>
          <button 
            className={`tab-button ${activeSection === 'design' ? 'active' : ''}`}
            onClick={() => setActiveSection('design')}
          >
            Design
          </button>
        </div>
        
        {activeSection === 'personal' && (
          <div className="settings-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={cardData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={cardData.title}
                onChange={handleChange}
                placeholder="Software Developer"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={cardData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />
            </div>
          </div>
        )}
        
        {activeSection === 'contact' && (
          <div className="settings-section">
            <h3 className="section-title">Contact Information</h3>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={cardData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={cardData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={cardData.website}
                onChange={handleChange}
                placeholder="www.example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={cardData.address}
                onChange={handleChange}
                placeholder="123 Business St, City, Country"
              />
            </div>
          </div>
        )}
        
        {activeSection === 'design' && (
          <div className="settings-section">
            <h3 className="section-title">Visual Design</h3>
            
            <div className="form-group">
              <label htmlFor="color">Card Color</label>
              <div className="color-input-container">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={cardData.color}
                  onChange={handleChange}
                />
                <span className="color-value">{cardData.color}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="fontColor">Font Color</label>
              <div className="color-input-container">
                <input
                  type="color"
                  id="fontColor"
                  name="fontColor"
                  value={cardData.fontColor}
                  onChange={handleChange}
                />
                <span className="color-value">{cardData.fontColor}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="logoPosition">Logo Position</label>
              <select
                id="logoPosition"
                name="logoPosition"
                value={cardData.logoPosition}
                onChange={handleChange}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="logoUpload">Company Logo</label>
              <div className="logo-upload-container">
                <div className="logo-upload-button-container">
                  <input
                    type="file"
                    id="logoUpload"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="logo-upload-input"
                  />
                  <label htmlFor="logoUpload" className="upload-label">
                    Choose File
                  </label>
                </div>
                {cardData.logoImage && (
                  <div className="logo-preview">
                    <img src={cardData.logoImage} alt="Logo preview" />
                    <div className="button-wrap">
                      <button 
                        onClick={handleRemoveLogo}
                        className="remove-logo-btn"
                        type="button"
                      >
                        <span>Remove</span>
                      </button>
                      <div className="button-shadow"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="action-buttons">
          <div className="button-wrap">
            <button onClick={handleExportCard} className="export-button">
              <span>Export as Image</span>
            </button>
            <div className="button-shadow"></div>
          </div>
          <div className="button-wrap">
            <button onClick={() => window.print()} className="print-button">
              <span>Print Card</span>
            </button>
            <div className="button-shadow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}