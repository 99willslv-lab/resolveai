import { useState, useEffect } from 'react'

export default function ImageSlider({ images = [] }) {
  const [current, setCurrent] = useState(0)
  
  const defaultImages = [
    'https://via.placeholder.com/300x200?text=Imagem+1',
    'https://via.placeholder.com/300x200?text=Imagem+2',
    'https://via.placeholder.com/300x200?text=Imagem+3'
  ]
  
  const imgs = images.length > 0 ? images : defaultImages
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imgs.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [imgs.length])
  
  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      display: 'block'
    },
    button: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      cursor: 'pointer',
      fontSize: '20px',
      zIndex: 10
    },
    prev: { left: '10px' },
    next: { right: '10px' },
    dots: {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px'
    },
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.5)',
      cursor: 'pointer',
      border: 'none'
    },
    dotActive: {
      backgroundColor: 'white'
    }
  }
  
  return (
    <div style={styles.container}>
      <img
        src={imgs[current]}
        alt={`Slide ${current + 1}`}
        style={styles.image}
      />
      
      <button
        style={{ ...styles.button, ...styles.prev }}
        onClick={() => setCurrent((prev) => (prev - 1 + imgs.length) % imgs.length)}
      >
        &#10094;
      </button>
      
      <button
        style={{ ...styles.button, ...styles.next }}
        onClick={() => setCurrent((prev) => (prev + 1) % imgs.length)}
      >
        &#10095;
      </button>
      
      <div style={styles.dots}>
        {imgs.map((_, index) => (
          <button
            key={index}
            style={{
              ...styles.dot,
              ...(index === current ? styles.dotActive : {})
            }}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}
