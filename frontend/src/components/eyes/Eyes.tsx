import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Eyes.css';

export default function SeeThroughEyes() {
  const { rock } = useAuth();
  const navigate = useNavigate();

  if (!rock) {
    navigate('/');
    return null;
  }

  return (
    <div className="eyes-page">
      <div className="eyes-container">
        <div className="eyes-background">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="dust-particle"
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
                '--size': `${2 + Math.random() * 4}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        
        <div className="eyes-content">
          <div className="rock-vision-icon">
            {rock.profilePictureUrl ? (
              <img src={rock.profilePictureUrl} alt={rock.name} />
            ) : (
              '🪨'
            )}
          </div>
          <h1>Through {rock.name}'s Eyes</h1>
          <p className="vision-text">
            Your rock sees... {rock.name === 'Stone' ? 'everything' : 'a beautiful world of grays and earth tones'}.
          </p>
          <p className="vision-text muted">
            (It's actually just a black screen. Rocks can't see.)
          </p>
          
          <div className="vision-koan">
            <p>"What is the sound of a rock not falling?"</p>
            <span>— {rock.name}, probably</span>
          </div>
        </div>

        <button className="exit-eyes" onClick={() => navigate('/dashboard')}>
          Return to Reality
        </button>
      </div>
    </div>
  );
}
