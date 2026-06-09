import { useState, useEffect } from 'react';
import type { DriveFile } from '../data/fileList';
import type { WifiData } from '../data/simulationData';
import { calculateDownloadTime } from '../utils/calculateDownloadTime';
import { formatTime, formatSpeed } from '../utils/formatters';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadSimulationProps {
  file: DriveFile | null;
  wifi6Data: WifiData;
  wifi7Data: WifiData;
  onClose: () => void;
}

export const DownloadSimulation = ({ file, wifi6Data, wifi7Data, onClose }: DownloadSimulationProps) => {
  const [progress6, setProgress6] = useState(0);
  const [progress7, setProgress7] = useState(0);
  const [status, setStatus] = useState<'Preparing' | 'Downloading' | 'Completed'>('Preparing');

  useEffect(() => {
    if (!file) return;

    setProgress6(0);
    setProgress7(0);
    setStatus('Preparing');

    const time6 = calculateDownloadTime(file.sizeGB, wifi6Data.throughputMbps);
    const time7 = calculateDownloadTime(file.sizeGB, wifi7Data.throughputMbps);
    
    // Scale down animation time for demo purposes.
    // Wi-Fi 7 takes exactly 4 seconds.
    const BASE_ANIMATION_TIME_MS = 4000;
    const speedRatio = time6 / time7;
    const animTime7 = BASE_ANIMATION_TIME_MS;
    const animTime6 = BASE_ANIMATION_TIME_MS * speedRatio;

    const prepTimer = setTimeout(() => {
      setStatus('Downloading');
      
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        
        let p6 = (elapsed / animTime6) * 100;
        let p7 = (elapsed / animTime7) * 100;
        
        if (p6 >= 100) p6 = 100;
        if (p7 >= 100) p7 = 100;
        
        setProgress6(p6);
        setProgress7(p7);
        
        if (p6 === 100 && p7 === 100) {
          clearInterval(interval);
          setStatus('Completed');
        }
      }, 50);

      return () => clearInterval(interval);
    }, 800); // Quick preparation phase

    return () => clearTimeout(prepTimer);
  }, [file, wifi6Data, wifi7Data]);

  if (!file) return null;

  const time6 = calculateDownloadTime(file.sizeGB, wifi6Data.throughputMbps);
  const time7 = calculateDownloadTime(file.sizeGB, wifi7Data.throughputMbps);
  const advantage = time6 / time7;

  // Calculate simulated remaining time
  const remaining6 = Math.max(0, time6 - (time6 * (progress6 / 100)));
  const remaining7 = Math.max(0, time7 - (time7 * (progress7 / 100)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-surface rounded-2xl p-8 shadow-2xl w-full max-w-4xl relative overflow-hidden border border-border"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {status === 'Completed' ? 'Download Complete' : 'Downloading'}
          </p>
          <h2 className="text-3xl font-bold text-text-main mb-2">{file.name}</h2>
          <p className="text-slate-500">{file.sizeGB} GB</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          {/* Divider line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>

          {/* LEFT SIDE: Wi-Fi 6 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-xl font-bold text-text-main">Wi-Fi 6</h3>
                <p className="text-sm text-slate-500 mt-1">Speed: {formatSpeed(wifi6Data.throughputMbps)}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold text-slate-700">{progress6.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-4 relative">
              <motion.div 
                className="bg-slate-300 h-full rounded-full transition-colors"
                animate={{ backgroundColor: progress6 === 100 ? '#94a3b8' : '#cbd5e1' }}
                style={{ width: `${progress6}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-slate-500">
              <span>{formatTime((progress6/100) * time6)} elapsed</span>
              <span className={progress6 === 100 ? "text-slate-400" : "text-slate-600 font-medium"}>
                {progress6 === 100 ? 'Done' : `${formatTime(remaining6)} left`}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Wi-Fi 7 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-xl font-bold text-primary">Wi-Fi 7</h3>
                <p className="text-sm text-slate-500 mt-1">Speed: {formatSpeed(wifi7Data.throughputMbps)}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold text-primary">{progress7.toFixed(0)}%</span>
              </div>
            </div>
            
            <div className="w-full bg-blue-50 rounded-full h-3 overflow-hidden mb-4 relative">
              <motion.div 
                className="bg-primary h-full rounded-full relative"
                style={{ width: `${progress7}%` }}
              >
                {progress7 < 100 && progress7 > 0 && (
                  <motion.div 
                    className="absolute inset-0 bg-white/30"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                )}
              </motion.div>
            </div>
            
            <div className="flex justify-between text-sm text-slate-500">
              <span>{formatTime((progress7/100) * time7)} elapsed</span>
              <span className={progress7 === 100 ? "text-blue-600 font-medium" : "text-slate-600 font-medium"}>
                {progress7 === 100 ? 'Done' : `${formatTime(remaining7)} left`}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {status === 'Completed' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Wi-Fi 7 is {advantage.toFixed(2)}x faster
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
