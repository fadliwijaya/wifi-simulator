import { forwardRef } from 'react';
import type { DriveFile } from '../data/fileList';
import type { WifiData } from '../data/simulationData';
import { calculateDownloadTime } from '../utils/calculateDownloadTime';
import { formatTime } from '../utils/formatters';
import { Download, PlayCircle, Folder, FileText, Disc, Clock, CloudUpload } from 'lucide-react';
import background2 from '../assets/background2.png';

interface DriveFileListProps {
  files: DriveFile[];
  wifi6Data: WifiData;
  wifi7Data: WifiData;
  onSimulate: (file: DriveFile) => void;
}

export const DriveFileList = forwardRef<HTMLDivElement, DriveFileListProps>(({ files, wifi6Data, wifi7Data, onSimulate }, ref) => {
  const getFileIcon = (id: string) => {
    switch(id) {
      case '1': return <PlayCircle className="w-6 h-6 text-blue-500" />;
      case '2': return <Folder className="w-6 h-6 text-slate-400" />;
      case '3': return <FileText className="w-6 h-6 text-slate-400" />;
      case '4': return <Disc className="w-6 h-6 text-slate-400" />;
      default: return <FileText className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <section 
      ref={ref} 
      className="w-full relative py-16 scroll-mt-10"
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay if background is too strong */}
      <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">Download Test Files</p>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Choose a file to simulate real download time.</h3>
            <p className="text-slate-600 text-sm md:text-base max-w-3xl leading-relaxed">
              Each file is downloaded virtually using Wi-Fi 6 and Wi-Fi 7 throughput <br className="hidden md:block" /> from NS-3 simulation output.
            </p>
          </div>
          
          {/* Top Right Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4 shrink-0">
            <CloudUpload className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm font-semibold text-slate-700">NS-3 Drive Test</p>
              <p className="text-sm font-medium text-blue-500">Wi-Fi 7 is {(wifi6Data.throughputMbps / wifi7Data.throughputMbps).toFixed(2).replace('0.', '')}x faster</p>
            </div>
          </div>
        </div>
        
        {/* Table Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-white">
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500 whitespace-nowrap">File Name</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500 whitespace-nowrap">Size</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500 whitespace-nowrap">Wi-Fi 6</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500 whitespace-nowrap">Wi-Fi 7</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500 whitespace-nowrap">Difference</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500 text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => {
                  const time6 = calculateDownloadTime(file.sizeGB, wifi6Data.throughputMbps);
                  const time7 = calculateDownloadTime(file.sizeGB, wifi7Data.throughputMbps);
                  const advantage = time6 / time7;
                  
                  return (
                    <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group bg-white">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                            {getFileIcon(file.id)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block text-[15px]">{file.name}</span>
                            <span className="text-sm text-slate-500">{file.subtitle}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-500 font-medium whitespace-nowrap">
                        {file.sizeGB} GB
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-semibold text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          {formatTime(time6)}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100/50">
                          <Clock className="w-4 h-4 text-blue-400" />
                          {formatTime(time7)}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-bold border border-blue-100/50">
                          {advantage.toFixed(2)}x faster
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <button 
                          onClick={() => onSimulate(file)}
                          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                        >
                          <Download className="w-4 h-4" />
                          Simulate
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Card Section inside the table container (or below it) */}
          <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col md:flex-row items-center gap-8 text-sm">
            <div className="flex items-center gap-3 text-slate-500 font-medium">
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-500" />
              </div>
              Based on measured NS-3 throughput
            </div>
            
            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
            
            <div className="flex flex-col">
              <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1">Wi-Fi 6</span>
              <span className="font-bold text-slate-800 text-base">{(wifi6Data.throughputMbps / 1000).toFixed(2)} Gbps</span>
            </div>

            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
            
            <div className="flex flex-col">
              <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-1">Wi-Fi 7</span>
              <span className="font-bold text-blue-600 text-base">{(wifi7Data.throughputMbps / 1000).toFixed(2)} Gbps</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
});

DriveFileList.displayName = 'DriveFileList';
