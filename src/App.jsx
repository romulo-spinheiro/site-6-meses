import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// --- SUAS FOTOS AQUI ---
// Certifique-se de que os nomes estão idênticos aos arquivos na pasta public/fotos
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

// Efeito de Máquina de Escrever (Ajustado para não quebrar linha no mobile)
const Typewriter = ({ words, className, cursorColor = "text-black" }) => {
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
    <span className={`${className} inline-flex items-center break-words`}>
      <span>{words[index].substring(0, subIndex)}</span>
      <span className={`ml-1 font-light ${cursorColor} ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
};

// Card de Foto (Responsivo)
const PhotoCard = ({ src, alt, className = "" }) => (
  <motion.div 
    className={`relative flex-shrink-0 overflow-hidden rounded-2xl md:rounded-3xl bg-gray-200 shadow-sm ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
  >
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  </motion.div>
);

export default function App() {
  const images = INITIAL_DATA;

  return (
    // Forçamos bg-gray-50 para garantir o fundo claro mesmo se o celular estiver em modo escuro
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- Seção 1: Hero --- */}
      <section className="relative flex flex-col justify-center min-h-[85vh] py-10 md:py-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 md:mb-12 text-center"
          >
            {/* Títulos ajustados: text-4xl no mobile, text-7xl no PC */}
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight mb-4">
              Feliz 6 meses de nós,<br />
              <Typewriter 
                words={["meu amor.", "meu trovãozinho."]} 
                className="text-gray-400 block mt-2 md:inline md:mt-0"
                cursorColor="text-gray-400"
              />
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-6 flex justify-center"
            >
              <Heart className="text-red-500 fill-current w-6 h-6 md:w-8 md:h-8 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Carrossel: Ajustado para mostrar parte da próxima foto no mobile (w-[75vw]) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex space-x-4 md:space-x-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.hero.map((src, index) => (
              <div key={index} className="snap-center shrink-0 first:pl-2 last:pr-2">
                <PhotoCard 
                  src={src} 
                  alt={`Nós ${index + 1}`} 
                  // Mobile: 75% da largura da tela | Desktop: 350px fixo
                  className="w-[75vw] h-[55vh] md:w-[350px] md:h-[500px]" 
                />
              </div>
            ))}
          </motion.div>
          <p className="text-center text-xs md:text-sm text-gray-400 mt-2 font-medium animate-bounce">
            Deslize para o lado
          </p>
        </div>
      </section>

      {/* --- Seção 2: Texto Animado --- */}
      <section className="py-20 md:py-32 bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl mx-2 md:mx-6 my-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-semibold leading-tight tracking-tight mb-6 md:mb-8"
          >
            Partilhar a vida com você é <br className="hidden md:block" />
            <Typewriter 
              words={["bom demais.", "muito leve.", "amar todos os dias.", "me apaixonar cada vez mais."]}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 block mt-2 md:inline md:mt-0"
              cursorColor="text-purple-500"
            />
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto px-2"
          >
            O melhor da vida é poder partilhar cada momento dela ao teu lado. Amo as nossas viagens, o teu jeito, o teu sorriso, olhar e cada detalhe que faz eu me apaixonar ainda mais.
          </motion.p>
        </div>

        <div className="mt-12 md:mt-20 overflow-hidden">
          <motion.div 
            className="flex gap-4 md:gap-6 px-4 md:px-6"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
             <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 w-full justify-start md:justify-center scrollbar-hide">
                {images.middle.map((src, index) => (
                  <PhotoCard 
                    key={index}
                    src={src}
                    alt={`Momentos ${index + 1}`} 
                    className="w-[60vw] h-[300px] md:w-[400px] md:h-[400px]" 
                  />
                ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Seção 3: Futuro --- */}
      <section className="py-20 md:py-32 max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 md:mb-6">
              Olhar todas as fotos mostra o quanto quero tudo isso pra vida toda.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
              Planejar o futuro é bom demais. Amo as nossas conversas sobre os planos, sobre casa e tantas outras coisas. Melhor ainda, vai ser quando finalmente dar esse próximo passo.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[300px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src={images.future} 
              alt="Futuro" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Galeria Final - Grid Responsivo (2 colunas mobile, 3 desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.gallery.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl md:rounded-2xl overflow-hidden h-40 md:h-64 ${index % 2 === 0 ? 'mt-0 md:mt-8' : ''}`}
            >
              <img 
                src={src}
                alt={`Galeria ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Seção Final --- */}
      <section className="min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center bg-black text-white px-4 md:px-6 text-center rounded-t-[2rem] md:rounded-t-[3rem] mt-10 md:mt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Eu te amo demais, <br/> meu amor!
          </h2>
          
          <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            "Há 6 meses eu estou apaixonado por você e vivendo o melhor da vida ao teu lado. Obrigado por partilhar tudo isso e ir além dos momentos bons."
          </p>

          <motion.div 
            className="mt-12 md:mt-16 text-xs md:text-sm text-gray-600 font-medium tracking-widest uppercase"
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