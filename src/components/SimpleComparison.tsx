export const SimpleComparison = () => {
  return (
    <section className="w-full max-w-5xl mx-auto mb-24 px-4 text-center">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-12">
        Wi-Fi 6 <span className="mx-2 text-slate-300">vs</span> <span className="text-primary">Wi-Fi 7</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8">
        <div>
          <p className="text-5xl md:text-6xl font-bold text-text-main tracking-tight mb-4">3.07x</p>
          <p className="text-lg font-medium text-slate-500">Faster Downloads</p>
        </div>
        
        <div>
          <p className="text-5xl md:text-6xl font-bold text-text-main tracking-tight mb-4">66%</p>
          <p className="text-lg font-medium text-slate-500">Lower Latency</p>
        </div>
        
        <div>
          <p className="text-5xl md:text-6xl font-bold text-text-main tracking-tight mb-4">40%</p>
          <p className="text-lg font-medium text-slate-500">Lower Packet Loss</p>
        </div>
        
        <div>
          <p className="text-5xl md:text-6xl font-bold text-text-main tracking-tight mb-4">53%</p>
          <p className="text-lg font-medium text-slate-500">Higher Spectral Efficiency</p>
        </div>
      </div>
    </section>
  );
};
