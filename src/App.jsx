import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, CheckCircle, Circle, ChevronDown, Plane, Plus, Check } from 'lucide-react';

// --- SUAS FOTOS AQUI ---
const INITIAL_DATA = {
  hero: [
    "/fotos/Capa1.jpeg",
    "/fotos/Capa2.jpeg",
    "/fotos/Capa3.jpeg",
    "/fotos/Capa4.jpeg"
  ],
  middle: [
    "/fotos/meio1.jpeg",
    "/fotos/meio2.jpeg"
  ],
  future: "/fotos/grande1.jpeg",
  gallery: [
    "/fotos/final1.jpeg",
    "/fotos/final2.jpeg",
    "/fotos/final3.jpeg",
    "/fotos/final4.jpeg",
    "/fotos/final5.jpeg",
    "/fotos/final6.jpeg",
    "/fotos/final7.jpeg",
    "/fotos/final8.jpeg",
    "/fotos/final9.jpeg",
    "/fotos/final10.jpeg",
    "/fotos/final11.jpeg",
    "/fotos/final12.jpeg"
  ]
};

// --- COMPONENTES AUXILIARES ---

const Typewriter = ({ words, className, cursorColor = "black" }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink(p => !p), 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <span>{words[index].substring(0, subIndex)}</span>
      <span style={{ marginLeft: '4px', fontWeight: 300, color: cursorColor, opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
};

const PhotoCard = ({ src, alt, style = {}, imgStyle = {} }) => (
  <motion.div 
    className="photo-card"
    style={{ 
      position: 'relative', 
      flexShrink: 0, 
      overflow: 'hidden', 
      borderRadius: '24px', 
      backgroundColor: '#E5E7EB',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      ...style 
    }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.4 }}
  >
    <img 
      src={src} 
      alt={alt} 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        objectPosition: 'top center',
        ...imgStyle 
      }} 
    />
  </motion.div>
);

// Modal de Senha
const PasswordModal = ({ isOpen, onClose, onSuccess, requiredPassword, hint }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase().replace(/\s/g, '');
    const cleanPassword = requiredPassword.trim().toLowerCase().replace(/\s/g, '');

    if (cleanInput === cleanPassword) {
      onSuccess();
      onClose();
      setInput('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '350px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
      >
        <Lock size={32} style={{ color: '#6B7280', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>Conteúdo Protegido</h3>
        <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '20px' }}>{hint || "Digite a senha para visualizar."}</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Senha..."
            autoFocus
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '12px', 
              border: `1px solid ${error ? '#EF4444' : '#E5E7EB'}`,
              marginBottom: '10px',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          {error && <p style={{ color: '#EF4444', fontSize: '0.8rem', marginBottom: '10px' }}>Senha incorreta. Tente novamente.</p>}
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#F3F4F6', color: '#4B5563', fontWeight: 500, cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#2563EB', color: 'white', fontWeight: 500, cursor: 'pointer' }}
            >
              Desbloquear
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function App() {
  const images = INITIAL_DATA;
  
  // Estados de Senhas
  const [isDateUnlocked, setIsDateUnlocked] = useState(false);
  const [isWeddingDateUnlocked, setIsWeddingDateUnlocked] = useState(false); 
  const [isFutureUnlocked, setIsFutureUnlocked] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });

  // Estados de Lua de Mel
  const [isHoneymoonOpen, setIsHoneymoonOpen] = useState(false);
  const [honeymoonOptions, setHoneymoonOptions] = useState(() => {
    const saved = localStorage.getItem('honeymoonOptions');
    return saved ? JSON.parse(saved) : ['África', 'Europa', 'Disney', 'Ásia'];
  });
  const [selectedHoneymoon, setSelectedHoneymoon] = useState(() => {
    return localStorage.getItem('selectedHoneymoon') || '';
  });
  const [newHoneymoonInput, setNewHoneymoonInput] = useState('');

  // Persistir dados da lua de mel
  useEffect(() => {
    localStorage.setItem('honeymoonOptions', JSON.stringify(honeymoonOptions));
  }, [honeymoonOptions]);

  useEffect(() => {
    localStorage.setItem('selectedHoneymoon', selectedHoneymoon);
  }, [selectedHoneymoon]);

  const openModal = (type) => {
    setModalConfig({ isOpen: true, type });
  };

  const handleModalSuccess = () => {
    if (modalConfig.type === 'date') setIsDateUnlocked(true);
    if (modalConfig.type === 'weddingDate') setIsWeddingDateUnlocked(true);
    if (modalConfig.type === 'future') setIsFutureUnlocked(true);
  };

  const getPassword = (type) => {
      if (type === 'future') return 'quercasarcomigo?';
      return 'euteamomuitomeuamor';
  }

  const handleAddHoneymoon = () => {
    if (newHoneymoonInput.trim()) {
      const newOption = newHoneymoonInput.trim();
      if (!honeymoonOptions.includes(newOption)) {
        setHoneymoonOptions([...honeymoonOptions, newOption]);
        setSelectedHoneymoon(newOption); // Seleciona automaticamente o novo
      } else {
        setSelectedHoneymoon(newOption);
      }
      setNewHoneymoonInput('');
    }
  };

  return (
    <div style={{ backgroundColor: '#F5F5F7', color: '#1D1D1F', minHeight: '100vh', fontFamily: '-apple-system, sans-serif', overflowX: 'hidden' }}>
      
      <style>{`
        body { margin: 0; background-color: #F5F5F7 !important; color: #1D1D1F !important; }
        .flex-center { display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .carousel { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 32px; padding-left: 16px; padding-right: 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
        .carousel::-webkit-scrollbar { display: none; }
        .carousel-item { scroll-snap-align: center; }
        .text-gradient { background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; color: transparent; background-clip: text; }
        .timeline-item { display: flex; align-items: flex-start; margin-bottom: 24px; position: relative; }
        .timeline-line { position: absolute; left: 11px; top: 28px; bottom: -24px; width: 2px; background-color: #E5E7EB; z-index: 0; }
        .timeline-item:last-child .timeline-line { display: none; }
        .blur-content { filter: blur(6px); user-select: none; transition: filter 0.3s; cursor: pointer; }
        .blur-content:hover { filter: blur(4px); }
        .unblur { filter: none !important; cursor: default; }
        .honeymoon-option { cursor: pointer; transition: background 0.2s; border-radius: 8px; }
        .honeymoon-option:hover { background-color: #F9FAFB; }
        
        @media (min-width: 768px) {
          h1 { font-size: 4.5rem !important; }
          h2 { font-size: 3.5rem !important; }
          p { font-size: 1.5rem !important; }
        }
      `}</style>

      <PasswordModal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onSuccess={handleModalSuccess}
        requiredPassword={getPassword(modalConfig.type)}
        hint={modalConfig.type === 'future' ? 'Dica: A pergunta mais importante...' : 'Dica: O que eu sinto por você?'}
      />

      {/* --- Seção 1: Hero --- */}
      <section className="flex-center" style={{ padding: '60px 0', minHeight: '85vh' }}>
        <div style={{ maxWidth: '1200px', width: '100%', padding: '0 20px', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.1', fontWeight: 600, marginBottom: '1rem' }}>
              Feliz 6 meses de nós,<br />
              <Typewriter 
                words={["meu amor.", "meu trovãozinho."]} 
                className="text-gray-400"
                cursorColor="#9CA3AF"
              />
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}
            >
              <Heart style={{ color: '#EF4444', width: '32px', height: '32px' }} fill="currentColor" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="carousel"
          >
            {images.hero.map((src, index) => (
              <div key={index} className="carousel-item">
                <PhotoCard 
                  src={src} 
                  alt={`Nós ${index + 1}`} 
                  style={{ width: '80vw', height: '55vh', maxWidth: '350px', maxHeight: '500px' }}
                />
              </div>
            ))}
          </motion.div>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '10px', opacity: 0.6 }}>
            Deslize para o lado
          </p>
        </div>
      </section>

      {/* --- Seção 2: Texto Animado --- */}
      <section style={{ padding: '40px 0', margin: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '60px 20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: '2rem', lineHeight: '1.2', fontWeight: 600, marginBottom: '1rem' }}
            >
              Partilhar a vida com você é <br className="hidden md:block" />
              <span className="text-gradient">
                <Typewriter 
                  words={["bom demais.", "muito leve.", "amar todos os dias.", "me apaixonar cada vez mais."]}
                  className=""
                  cursorColor="#a855f7"
                />
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ maxWidth: '600px', margin: '20px auto 0', fontSize: '1.125rem', lineHeight: '1.6', color: '#6B7280' }}
            >
              O melhor da vida é poder partilhar cada momento dela ao teu lado. Amo as nossas viagens, o teu jeito, o teu sorriso, olhar e cada detalhe que faz eu me apaixonar ainda mais.
            </motion.p>
          </div>

          <div style={{ marginTop: '60px' }}>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <div className="carousel" style={{ justifyContent: 'center' }}>
                  {images.middle.map((src, index) => (
                    <PhotoCard 
                      key={index}
                      src={src}
                      alt={`Momentos ${index + 1}`} 
                      style={{ width: '70vw', height: '450px', maxWidth: '400px', maxHeight: '550px' }}
                    />
                  ))}
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Seção 3: Futuro --- */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: '2rem', lineHeight: '1.2', fontWeight: 600, marginBottom: '1rem' }}>
              Olhar todas as fotos mostra o quanto quero tudo isso pra vida toda.
            </h2>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: '#6B7280' }}>
              Planejar o futuro é bom demais. Amo as nossas conversas sobre os planos, sobre casa e tantas outras coisas. Melhor ainda, vai ser quando finalmente dar esse próximo passo.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}
          >
            <img 
              src={images.future} 
              alt="Futuro" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        {/* Galeria Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
          {images.gallery.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              style={{ borderRadius: '16px', overflow: 'hidden', height: '200px' }}
            >
              <img 
                src={src}
                alt={`Galeria ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Seção Final --- */}
      <section style={{ backgroundColor: 'black', color: 'white', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', padding: '100px 20px', textAlign: 'center', marginTop: '60px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(to top right, #ec4899, #8b5cf6)', borderRadius: '50%', margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart style={{ color: 'white', width: '40px', height: '40px' }} fill="currentColor" />
          </div>
          
          <h2 style={{ fontSize: '3rem', background: 'linear-gradient(to bottom, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '30px' }}>
            Eu te amo demais, <br/> meu amor!
          </h2>
          
          <p style={{ fontSize: '1.25rem', color: '#9CA3AF', fontWeight: 300 }}>
            "Há 6 meses eu estou apaixonado por você e vivendo o melhor da vida ao teu lado. Obrigado por partilhar tudo isso e ir além dos momentos bons."
          </p>

          <motion.div 
            style={{ marginTop: '60px', fontSize: '0.875rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            6 Meses • E contando
          </motion.div>
        </motion.div>
      </section>

      {/* --- NOVA SEÇÃO: TRACKING DO NOIVADO E CASAMENTO --- */}
      <section style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* --- Bloco 1: Noivado --- */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '10px' }}>Tracking do Noivado 💍</h2>
          <p style={{ color: '#6B7280' }}>Acompanhe o status do nosso próximo grande passo.</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          
          {/* Item 1 */}
          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
              <CheckCircle size={24} style={{ color: '#10B981' }} fill="#D1FAE5" />
            </div>
            <div style={{ marginLeft: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Decidir dar o próximo passo</p>
              <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>O "sim" mais fácil da vida.</p>
            </div>
          </div>

          {/* Item 2 - Data Oculta */}
          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
              <CheckCircle size={24} style={{ color: '#10B981' }} fill="#D1FAE5" />
            </div>
            <div style={{ marginLeft: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                Definir data 
                <span 
                  onClick={() => !isDateUnlocked && openModal('date')}
                  className={isDateUnlocked ? 'unblur' : 'blur-content'}
                  style={{ 
                    backgroundColor: isDateUnlocked ? '#ECFDF5' : '#F3F4F6', 
                    padding: '2px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.9rem',
                    color: isDateUnlocked ? '#059669' : 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {isDateUnlocked ? '27/07/2027' : 'ContentHidden'}
                  {!isDateUnlocked && <Lock size={12} style={{ color: '#9CA3AF' }} />}
                </span>
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Data salva no coração.</p>
            </div>
          </div>

          {/* Items Normais */}
          {['Descobrir o aro', 'Experimentar a aliança', 'Planejar o pedido'].map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-line"></div>
              <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
                <CheckCircle size={24} style={{ color: '#10B981' }} fill="#D1FAE5" />
              </div>
              <div style={{ marginLeft: '16px' }}>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item}</p>
              </div>
            </div>
          ))}

          {/* Item Comprar Alianças (Cadeado, sem blur) */}
           <div className="timeline-item">
            <div className="timeline-line"></div>
            <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
               <Lock size={24} style={{ color: '#9CA3AF' }} />
            </div>
            <div style={{ marginLeft: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Comprar alianças</p>
            </div>
          </div>

          {/* Items Futuros Ocultos */}
          <div className="timeline-item" onClick={() => !isFutureUnlocked && openModal('future')} style={{ cursor: isFutureUnlocked ? 'default' : 'pointer' }}>
            <div className="timeline-line"></div>
            <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
               {isFutureUnlocked ? <Circle size={24} style={{ color: '#3B82F6' }} /> : <Lock size={24} style={{ color: '#9CA3AF' }} />}
            </div>
            <div style={{ marginLeft: '16px', filter: isFutureUnlocked ? 'none' : 'blur(5px)', transition: 'all 0.5s' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Programar viagem para Itália</p>
              <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>O cenário perfeito.</p>
            </div>
          </div>

          <div className="timeline-item" onClick={() => !isFutureUnlocked && openModal('future')} style={{ cursor: isFutureUnlocked ? 'default' : 'pointer' }}>
            <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
               {isFutureUnlocked ? <Circle size={24} style={{ color: '#3B82F6' }} /> : <Lock size={24} style={{ color: '#9CA3AF' }} />}
            </div>
            <div style={{ marginLeft: '16px', filter: isFutureUnlocked ? 'none' : 'blur(5px)', transition: 'all 0.5s' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Fazer o pedido</p>
              <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>O momento mais esperado.</p>
            </div>
          </div>
        </div>

        {/* --- Bloco 2: Casamento --- */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '10px' }}>Planejamento do Casamento 💒</h2>
          <p style={{ color: '#6B7280' }}>Nosso sonho virando realidade.</p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          
          {/* Data do Casamento (Oculta) */}
          <div className="timeline-item">
            <div className="timeline-line"></div>
            <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
               <Lock size={24} style={{ color: '#9CA3AF' }} />
            </div>
            <div style={{ marginLeft: '16px' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                Definir data do casamento
                <span 
                  onClick={() => !isWeddingDateUnlocked && openModal('weddingDate')}
                  className={isWeddingDateUnlocked ? 'unblur' : 'blur-content'}
                  style={{ 
                    backgroundColor: isWeddingDateUnlocked ? '#ECFDF5' : '#F3F4F6', 
                    padding: '2px 8px', 
                    borderRadius: '6px', 
                    fontSize: '0.9rem',
                    color: isWeddingDateUnlocked ? '#059669' : 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {isWeddingDateUnlocked ? '28/10/2028 ou 29/09/2029' : 'ContentHidden'}
                  {!isWeddingDateUnlocked && <Lock size={12} style={{ color: '#9CA3AF' }} />}
                </span>
              </p>
            </div>
          </div>

          {/* Itens do Casamento (Cadeado, sem blur, exceto Lua de Mel que expande) */}
          {['Casamento Civil', 'Casamento Religioso', 'Casamento fora do país', 'Lua de Mel', 'Apartamento e coisas de casa'].map((item, i, arr) => {
            const isHoneymoon = item === 'Lua de Mel';
            return (
              <div 
                className="timeline-item" 
                key={i} 
                onClick={() => isHoneymoon ? setIsHoneymoonOpen(!isHoneymoonOpen) : null}
                style={{ cursor: isHoneymoon ? 'pointer' : 'default' }}
              >
                <div className="timeline-line" style={{ display: i === arr.length - 1 ? 'none' : 'block' }}></div>
                <div style={{ zIndex: 1, backgroundColor: 'white', padding: '2px' }}>
                  {isHoneymoon ? <Plane size={24} style={{ color: '#9CA3AF' }} /> : <Lock size={24} style={{ color: '#9CA3AF' }} />}
                </div>
                <div style={{ marginLeft: '16px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '10px' }}>
                    <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item}</p>
                    {isHoneymoon && (
                      <ChevronDown 
                        size={20} 
                        style={{ 
                          color: '#6B7280', 
                          transform: isHoneymoonOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s'
                        }} 
                      />
                    )}
                  </div>
                  
                  {/* Opções da Lua de Mel com Seleção */}
                  {isHoneymoon && (
                    <AnimatePresence>
                      {isHoneymoonOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden', marginTop: '10px' }}
                        >
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {honeymoonOptions.map(opt => (
                              <li 
                                key={opt} 
                                className="honeymoon-option"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedHoneymoon(opt);
                                }}
                                style={{ 
                                  padding: '12px 10px', 
                                  borderBottom: '1px solid #F3F4F6', 
                                  color: selectedHoneymoon === opt ? '#2563EB' : '#4B5563', 
                                  fontSize: '0.95rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  backgroundColor: selectedHoneymoon === opt ? '#EFF6FF' : 'transparent',
                                  borderRadius: '8px'
                                }}
                              >
                                {selectedHoneymoon === opt ? (
                                  <CheckCircle size={16} style={{ display: 'inline-block', marginRight: '10px', color: '#2563EB' }} fill="#DBEAFE" />
                                ) : (
                                  <Circle size={16} style={{ display: 'inline-block', marginRight: '10px', color: '#D1D5DB' }} />
                                )}
                                {opt}
                              </li>
                            ))}
                            <li style={{ padding: '12px 0 4px', color: '#4B5563', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: '8px', whiteSpace: 'nowrap' }}>Outro lugar:</span>
                              <input 
                                type="text" 
                                value={newHoneymoonInput}
                                onChange={(e) => setNewHoneymoonInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddHoneymoon();
                                }}
                                placeholder="Escreva e dê enter..." 
                                style={{ 
                                  border: 'none', 
                                  borderBottom: '1px solid #D1D5DB', 
                                  outline: 'none', 
                                  background: 'transparent', 
                                  width: '100%',
                                  padding: '4px 0',
                                  fontSize: '0.95rem',
                                  color: '#1F2937'
                                }} 
                                onClick={(e) => e.stopPropagation()} 
                              />
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddHoneymoon();
                                }}
                                style={{
                                  marginLeft: '8px',
                                  background: '#2563EB',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '24px',
                                  height: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                              >
                                <Plus size={14} />
                              </button>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            );
          })}

        </div>

      </section>

    </div>
  );
}