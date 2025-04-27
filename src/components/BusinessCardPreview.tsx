import React, { useState, useRef, useEffect } from 'react'
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

interface BusinessCardPreviewProps {
  cardData: CardDataProps
}

export default function BusinessCardPreview({ cardData }: BusinessCardPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Update the card's transform style when flip state changes
  useEffect(() => {
    if (cardRef.current) {
      if (isFlipped) {
        cardRef.current.style.transform = 'perspective(1000px) rotateY(180deg)'
      } else {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
      }
    }
  }, [isFlipped])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -8 // -8 to 8 degrees
    const rotateY = ((x - centerX) / centerX) * 8  // -8 to 8 degrees
    
    // For the back side, we need to invert the Y rotation to maintain correct perspective
    const yRotation = isFlipped ? 180 - rotateY : rotateY
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${yRotation}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    
    // Reset to basic rotation based on flip state
    cardRef.current.style.transform = isFlipped 
      ? 'perspective(1000px) rotateY(180deg)'
      : 'perspective(1000px) rotateX(0) rotateY(0)'
  }

  // Calculate logo position
  const getLogoStyle = () => {
    const base = {
      maxWidth: '60px',
      maxHeight: '60px',
      position: 'absolute',
      top: '25px',
      zIndex: 2,
    } as React.CSSProperties

    switch (cardData.logoPosition) {
      case 'left':
        return { ...base, left: '25px' }
      case 'right':
        return { ...base, right: '25px' }
      default:
        return { ...base, left: '50%', transform: 'translateX(-50%)' }
    }
  }
  
  // Create contact icon mapping
  const getContactIcon = (type: string) => {
    const icons = {
      email: <svg className="contact-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
      phone: <svg className="contact-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
      website: <svg className="contact-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
      address: <svg className="contact-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    }
    return icons[type as keyof typeof icons] || null
  }
  
  // Card overlay pattern based on color
  const getCardPattern = () => {
    return {
      backgroundImage: `linear-gradient(135deg, ${cardData.color}80 0%, ${cardData.color}00 50%)`,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      opacity: 0.7,
      borderRadius: '16px',
    } as React.CSSProperties
  }

  return (
    <div className="card-preview-container">
      <div 
        ref={cardRef}
        className={`business-card ${isFlipped ? 'flipped' : ''}`} 
        onClick={handleCardFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Front of card */}
        <div 
          className="card-side card-front" 
          style={{ 
            backgroundColor: cardData.color,
            color: cardData.fontColor 
          }}
        >
          <div className="card-pattern" style={getCardPattern()}></div>
          
          {cardData.logoImage && (
            <img 
              src={cardData.logoImage} 
              alt="Company Logo" 
              className="company-logo"
              style={getLogoStyle()} 
            />
          )}
          
          <div className="card-content">
            <h2 className="card-name">{cardData.name}</h2>
            <div className="card-divider" style={{ backgroundColor: cardData.fontColor }}></div>
            <p className="card-title">{cardData.title}</p>
            <h3 className="card-company">{cardData.company}</h3>
          </div>
          
          <div className="card-accent" style={{ backgroundColor: cardData.fontColor }}></div>
        </div>
        
        {/* Back of card */}
        <div 
          className="card-side card-back" 
          style={{ 
            backgroundColor: cardData.color,
            color: cardData.fontColor 
          }}
        >
          <div className="card-pattern" style={getCardPattern()}></div>
          
          <div className="card-content back-content">
            <div className="contact-info">
              {cardData.email && (
                <div className="contact-item">
                  <span className="contact-icon">{getContactIcon('email')}</span>
                  <span className="contact-text">{cardData.email}</span>
                </div>
              )}
              {cardData.phone && (
                <div className="contact-item">
                  <span className="contact-icon">{getContactIcon('phone')}</span>
                  <span className="contact-text">{cardData.phone}</span>
                </div>
              )}
              {cardData.website && (
                <div className="contact-item">
                  <span className="contact-icon">{getContactIcon('website')}</span>
                  <span className="contact-text">{cardData.website}</span>
                </div>
              )}
              {cardData.address && (
                <div className="contact-address">
                  <span className="contact-icon">{getContactIcon('address')}</span>
                  <span className="contact-text">{cardData.address}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="card-accent" style={{ backgroundColor: cardData.fontColor }}></div>
        </div>
      </div>
      
      {/* Flip instruction outside the card */}
      <div className="flip-instruction-container">
        <button 
          className="flip-button"
          onClick={handleCardFlip}
          aria-label="Flip card"
        >
          {isFlipped ? 'Show Front' : 'Show Back'}
        </button>
        <p className="flip-helper-text">or click the card to flip</p>
      </div>
    </div>
  )
}