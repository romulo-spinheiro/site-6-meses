import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

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

const PhotoCard = ({ src, alt, style = {} }) => (
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
    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </motion.div>
);

export default function App() {
  const images = INITIAL_DATA;

  return (
    <div style={{ backgroundColor: '#F5F5F7', color: '#1D1D1F', minHeight: '100vh', fontFamily: '-apple-system, sans-serif', overflowX: 'hidden' }}>
      {/* CSS DE EMERGÊNCIA - Garante que funcione mesmo sem Tailwind */}
      <style>{`
        body { margin: 0; background-color: #F5F5F7 !important; color: #1D1D1F !important; }
        .flex-center { display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .carousel { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 32px; padding-left: 16px; padding-right: 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
        .carousel::-webkit-scrollbar { display: none; }
        .carousel-item { scroll-snap-align: center; }
        .text-gradient { background: linear-gradient(to right, #2563eb, #9333ea); -webkit-background-clip: text; color: transparent; background-clip: text; }
        
        /* Tipografia Responsiva Manual */
        h1 { font-size: 2.5rem; line-height: 1.1; font-weight: 600; margin-bottom: 1rem; }
        h2 { font-size: 2rem; line-height: 1.2; font-weight: 600; margin-bottom: 1rem; }
        p { font-size: 1.125rem; line-height: 1.6; color: #6B7280; }
        
        @media (min-width: 768px) {
          h1 { font-size: 4.5rem; }
          h2 { font-size: 3.5rem; }
          p { font-size: 1.5rem; }
        }
      `}</style>

      {/* --- Seção 1: Hero --- */}
      <section className="flex-center" style={{ padding: '60px 0', minHeight: '85vh' }}>
        <div style={{ maxWidth: '1200px', width: '100%', padding: '0 20px', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h1>
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

          {/* Carrossel Manual */}
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
                  // Largura responsiva via inline style
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
      <section style={{ padding: '80px 0', margin: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '60px 20px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              style={{ maxWidth: '600px', margin: '20px auto 0' }}
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
                      style={{ width: '70vw', height: '300px', maxWidth: '400px', maxHeight: '400px' }}
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
            <h2>
              Olhar todas as fotos mostra o quanto quero tudo isso pra vida toda.
            </h2>
            <p>
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

    </div>
  );
}