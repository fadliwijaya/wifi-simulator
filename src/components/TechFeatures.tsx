import { Radio, Zap, Link2, Waves } from 'lucide-react';
import background4 from '../assets/Background4.png';

export const TechFeatures = () => {
  return (
    <section 
      className="w-full relative py-24"
      style={{
        backgroundImage: `url(${background4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to ensure text readability if the background is too strong */}
      <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[1px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Why Wi-Fi 7 is Faster</h3>
        <p className="text-slate-500 max-w-2xl mx-auto">
          The core technologies that enable massive throughput and ultra-low latency.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
            <Radio className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-3">320 MHz Channels</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Doubles the channel width compared to Wi-Fi 6, enabling twice the data capacity for massive throughput.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-3">4096-QAM</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Packs 20% more data into every single transmission symbol, significantly boosting peak speeds.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
            <Link2 className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-3">MLO</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Multi-Link Operation combines multiple frequency bands simultaneously to drastically reduce latency.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
            <Waves className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-3">8x8 MIMO</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Supports more simultaneous spatial streams to serve multiple devices with consistently higher throughput.
          </p>
        </div>

      </div>
      </div>
    </section>
  );
};
