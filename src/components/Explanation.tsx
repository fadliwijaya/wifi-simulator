import background3 from '../assets/Background3.png';
import { Clock, ShieldCheck, Activity, BarChart2 } from 'lucide-react';

export const Explanation = () => {
  return (
    <section className="w-full relative min-h-[85vh] flex items-center overflow-hidden bg-slate-50">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-right md:bg-center"
        style={{ backgroundImage: `url(${background3})` }}
      />
      
      {/* Optional gradient overlay for text readability if the image isn't purely white on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent w-full md:w-2/3" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-16 pb-16">
        
        <div className="max-w-xl">
          
          {/* Top Label */}
          <div className="mb-8">
            <h4 className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Wi-Fi 7 Advantage
            </h4>
            <div className="w-8 h-[2px] bg-slate-300"></div>
          </div>

          {/* Main Title */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-[1.2] tracking-tight mb-6">
              Engineered for <br/> 
              the next generation <br/>
              of connectivity.
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-md">
              Wi-Fi 7 brings higher speed, lower latency, and greater reliability for every connection.
            </p>
          </div>

          {/* 2x2 Grid Stats */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
            
            {/* Stat 1 */}
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
              <div>
                <p className="text-3xl font-bold text-slate-800 mb-1">3.07x</p>
                <p className="text-xs text-slate-500">Faster Downloads</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-start gap-4 relative">
              {/* Vertical divider line for grid */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-slate-200/60 hidden md:block"></div>
              <Clock className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
              <div>
                <p className="text-3xl font-bold text-slate-800 mb-1">66%</p>
                <p className="text-xs text-slate-500">Lower Latency</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-start gap-4 relative">
              {/* Horizontal divider line for grid */}
              <div className="absolute -top-6 left-0 right-0 h-px bg-slate-200/60 hidden md:block"></div>
              <ShieldCheck className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
              <div>
                <p className="text-3xl font-bold text-slate-800 mb-1">40%</p>
                <p className="text-xs text-slate-500">Lower Packet Loss</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-start gap-4 relative">
              {/* Vertical & Horizontal divider lines */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-slate-200/60 hidden md:block"></div>
              <div className="absolute -top-6 left-0 right-0 h-px bg-slate-200/60 hidden md:block"></div>
              <BarChart2 className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
              <div>
                <p className="text-3xl font-bold text-slate-800 mb-1">53%</p>
                <p className="text-xs text-slate-500">Higher Spectral Efficiency</p>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};
