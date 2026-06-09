import { motion } from 'framer-motion';
import background from '../assets/background.png';

interface HeroProps {
  onStartSimulation: () => void;
}

export const Hero = ({ onStartSimulation }: HeroProps) => {
  return (
    <section className="w-full relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-right md:bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />
      
      {/* Optional subtle gradient overlay just in case the image doesn't have the white part natively */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full md:w-1/2" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-12 pb-12">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Top small text */}
          <div className="mb-20 flex items-start">
            <div className="w-[1px] h-8 bg-slate-400 mr-4 mt-1 border-l border-dashed border-slate-400"></div>
            <p className="text-slate-500 text-xs md:text-sm font-mono tracking-widest uppercase leading-relaxed">
              Engineered for <br/> next-gen speeds.
            </p>
          </div>

          {/* Main Title */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 leading-[1.05] tracking-tight">
              Experience <br/> 
              the speed of <br/>
              Wi-Fi 7.
            </h1>
          </div>

          {/* Bottom Area */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div className="flex items-start">
              <div className="w-[1px] h-8 bg-slate-400 mr-4 mt-1 border-l border-dashed border-slate-400"></div>
              <p className="text-slate-500 text-xs md:text-sm font-mono tracking-widest uppercase leading-relaxed">
                Wi-Fi 6 vs Wi-Fi 7 <br/>
                Download Simulator
              </p>
            </div>
            
            <button 
              onClick={onStartSimulation}
              className="bg-slate-900 hover:bg-primary text-white text-sm font-bold px-8 py-4 uppercase tracking-widest transition-colors shadow-lg"
            >
              Start Simulation
            </button>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};
