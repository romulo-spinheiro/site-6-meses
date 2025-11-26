import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, X, Upload } from 'lucide-react';

// --- CONFIGURAÇÃO CORRIGIDA DAS FOTOS ---
// Importante: As fotos devem estar na pasta "public/fotos" do seu projeto.
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

// Efeito de Máquina de Escrever
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
    <span className={`${className} inline-flex items-center`}>
      <span>{words[index].substring(0, subIndex)}</span>
      <span className={`ml-1 font-light ${cursorColor} ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
};

// Card de Foto
const PhotoCard = ({ src, alt, className = "" }) => (
  <motion.div 
    className={`relative flex-shrink-0 overflow-hidden rounded-3xl bg-gray-100 shadow-sm ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
  >
    <img src={src} alt={alt} className="h-full w-full object-cover" />
  </motion.div>
);

// Uploader de Imagem (Para testes locais)
const ImageUploader = ({ label, currentImages, onUpload, isMultiple = true }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newUrls = files.map(file => URL.createObjectURL(file));
      if (isMultiple) {
        onUpload([...currentImages, ...newUrls]);
      } else {
        onUpload(newUrls[0]);
      }
    }
  };

  const clearImages = () => {
    if(isMultiple) onUpload([]);
    else onUpload(null);
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        {isMultiple && currentImages.length > 0 && (
          <button onClick={clearImages} className="text-xs text-red-500 hover:text-red-600">
            Limpar
          </button>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {isMultiple ? (
          currentImages.map((src, i) => (
            <div key={i} className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-200 relative">
              <img src={src} className="w-full h-full object-cover" alt="" />
            </div>
          ))
        ) : (
          currentImages && (
            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gray-200">
              <img src={currentImages} className="w-full h-full object-cover" alt="" />
            </div>
          )
        )}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-16 h-16 shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          <Upload size={16} />
        </button>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        multiple={isMultiple} 
        accept="image/*"
        onChange={handleFileChange} 
      />
    </div>
  );
};

// Modal de Configurações
const SettingsModal = ({ isOpen, onClose, images, setImages }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Camera className="text-blue-500" /> Personalizar Fotos
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
             Dica: Para o site final, coloque as fotos na pasta "public" e edite o código. Esta ferramenta é apenas para visualização temporária.
          </p>

          <ImageUploader 
            label="1. Topo (Carrossel Principal)" 
            currentImages={images.hero} 
            onUpload={(newImgs) => setImages(prev => ({ ...prev, hero: newImgs }))} 
          />
          
          <ImageUploader 
            label="2. Meio (3 Fotos)" 
            currentImages={images.middle} 
            onUpload={(newImgs) => setImages(prev => ({ ...prev, middle: newImgs }))} 
          />

          <ImageUploader 
            label="3. Foto Futuro (Grande)" 
            currentImages={images.future} 
            onUpload={(newImg) => setImages(prev => ({ ...prev, future: newImg }))} 
            isMultiple={false}
          />

          <ImageUploader 
            label="4. Galeria Final (Grid)" 
            currentImages={images.gallery} 
            onUpload={(newImgs) => setImages(prev => ({ ...prev, gallery: newImgs }))} 
          />
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
           <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
             Ver Resultado
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [images, setImages] = useState(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-blue-100">
      
      {/* Botão Flutuante de Configuração */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white text-gray-800 px-5 py-3 rounded-full shadow-lg border border-gray-200 font-medium flex items-center gap-2 hover:shadow-xl transition-all"
      >
        <Camera size={20} className="text-blue-500" />
        Personalizar Fotos
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <SettingsModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            images={images} 
            setImages={setImages} 
          />
        )}
      </AnimatePresence>

      {/* --- Seção 1: Hero --- */}
      <section className="relative flex flex-col justify-center min-h-[90vh] py-20 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight mb-4">
              Feliz 6 meses de nós,<br />
              <Typewriter 
                words={["meu amor.", "meu trovãozinho."]} 
                className="text-gray-400"
                cursorColor="text-gray-400"
              />
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-6 flex justify-center"
            >
              <Heart className="text-red-500 fill-current w-8 h-8 animate-pulse" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex space-x-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.hero.length > 0 ? images.hero.map((src, index) => (
              <div key={index} className="snap-center shrink-0 first:pl-4 last:pr-4">
                <PhotoCard 
                  src={src} 
                  alt={`Nós ${index + 1}`} 
                  className="w-[280px] h-[400px] md:w-[350px] md:h-[500px]" 
                />
              </div>
            )) : (
              <div className="w-full text-center text-gray-400 py-10">Adicione fotos clicando em Personalizar</div>
            )}
          </motion.div>
          <p className="text-center text-sm text-gray-400 mt-4 font-medium animate-bounce">Deslize para ver mais</p>
        </div>
      </section>

      {/* --- Seção 2: Texto Animado --- */}
      <section className="py-32 bg-white rounded-[3rem] shadow-xl mx-2 md:mx-6 my-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-8"
          >
            Partilhar a vida com você é <br className="hidden md:block" />
            <Typewriter 
              words={["bom demais.", "muito leve.", "amar todos os dias.", "me apaixonar cada vez mais."]}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              cursorColor="text-purple-500"
            />
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            O melhor da vida é poder partilhar cada momento dela ao teu lado. Amo as nossas viagens, o teu jeito, o teu sorriso, olhar e cada detalhe que faz eu me apaixonar ainda mais.
          </motion.p>
        </div>

        <div className="mt-20 overflow-hidden">
          <motion.div 
            className="flex gap-6 px-6"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
             <div className="flex space-x-6 overflow-x-auto pb-4 w-full justify-start md:justify-center scrollbar-hide">
                {images.middle.map((src, index) => (
                  <PhotoCard 
                    key={index}
                    src={src}
                    alt={`Momentos ${index + 1}`} 
                    className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]" 
                  />
                ))}
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- Seção 3: Futuro --- */}
      <section className="py-32 max-w-screen-xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Olhar todas as fotos mostra o quanto quero tudo isso pra vida toda.
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Planejar o futuro é bom demais. Amo as nossas conversas sobre os planos, sobre casa e tantas outras coisas. Melhor ainda, vai ser quando finalmente dar esse próximo passo.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {images.future ? (
              <img 
                src={images.future} 
                alt="Futuro" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">Sem Foto</div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.gallery.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden h-48 md:h-64 ${index % 2 === 0 ? 'mt-8' : ''}`}
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
      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-black text-white px-6 text-center rounded-t-[3rem] mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-full mx-auto mb-8 flex items-center justify-center">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Eu te amo demais, <br/> meu amor!
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            "Há 6 meses eu estou apaixonado por você e vivendo o melhor da vida ao teu lado. Obrigado por partilhar tudo isso e ir além dos momentos bons."
          </p>

          <motion.div 
            className="mt-16 text-sm text-gray-600 font-medium tracking-widest uppercase"
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