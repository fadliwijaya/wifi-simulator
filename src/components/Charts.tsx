import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import type { WifiData } from '../data/simulationData';
import { calculateDownloadTime } from '../utils/calculateDownloadTime';
import type { DriveFile } from '../data/fileList';
import background5 from '../assets/Background5.png';

interface ChartsProps {
  wifi6Data: WifiData;
  wifi7Data: WifiData;
  files: DriveFile[];
}

interface KPICardProps {
  label: string;
  wifi6Value: string | number;
  wifi7Value: string | number;
  unit: string;
}

const KPICard = ({ label, wifi6Value, wifi7Value, unit }: KPICardProps) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <h4 className="text-sm font-semibold text-slate-500 mb-6">{label}</h4>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-50 pb-3">
          <span className="text-xs font-medium text-slate-400">Wi-Fi 6</span>
          <span className="text-base font-semibold text-slate-700">{Number(wifi6Value).toFixed(2)} <span className="text-xs text-slate-400 font-normal">{unit}</span></span>
        </div>
        
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-blue-600">Wi-Fi 7</span>
          <span className="text-lg font-bold text-blue-600">{Number(wifi7Value).toFixed(2)} <span className="text-xs text-blue-400/80 font-normal">{unit}</span></span>
        </div>
      </div>
    </div>
  );
};

export const Charts = ({ wifi6Data, wifi7Data, files }: ChartsProps) => {
  // Throughput Data
  const throughputData = [
    {
      name: 'Throughput (Mbps)',
      'Wi-Fi 6': wifi6Data.throughputMbps,
      'Wi-Fi 7': wifi7Data.throughputMbps,
    }
  ];

  // Download Time Data
  const downloadTimeData = files.map(file => ({
    name: `${file.sizeGB} GB`,
    'Wi-Fi 6': calculateDownloadTime(file.sizeGB, wifi6Data.throughputMbps),
    'Wi-Fi 7': calculateDownloadTime(file.sizeGB, wifi7Data.throughputMbps),
  }));

  // Radar Chart Normalization (Score out of 100, Higher is Better)
  const calcScore = (val1: number, val2: number, lowerIsBetter = false) => {
    if (lowerIsBetter) {
      return val1 < val2 ? 100 : (val2 / val1) * 100;
    }
    return val1 > val2 ? 100 : (val1 / val2) * 100;
  };

  const radarData = [
    {
      subject: 'Throughput',
      'Wi-Fi 6': calcScore(wifi6Data.throughputMbps, wifi7Data.throughputMbps),
      'Wi-Fi 7': calcScore(wifi7Data.throughputMbps, wifi6Data.throughputMbps),
    },
    {
      subject: 'Low Delay',
      'Wi-Fi 6': calcScore(wifi6Data.delayMs, wifi7Data.delayMs, true),
      'Wi-Fi 7': calcScore(wifi7Data.delayMs, wifi6Data.delayMs, true),
    },
    {
      subject: 'Low Jitter',
      'Wi-Fi 6': calcScore(wifi6Data.jitterMs, wifi7Data.jitterMs, true),
      'Wi-Fi 7': calcScore(wifi7Data.jitterMs, wifi6Data.jitterMs, true),
    },
    {
      subject: 'Low Pkt Loss',
      'Wi-Fi 6': calcScore(wifi6Data.packetLossPercent, wifi7Data.packetLossPercent, true),
      'Wi-Fi 7': calcScore(wifi7Data.packetLossPercent, wifi6Data.packetLossPercent, true),
    },
    {
      subject: 'PDR',
      'Wi-Fi 6': calcScore(wifi6Data.pdrPercent, wifi7Data.pdrPercent),
      'Wi-Fi 7': calcScore(wifi7Data.pdrPercent, wifi6Data.pdrPercent),
    },
    {
      subject: 'Spectral Eff',
      'Wi-Fi 6': calcScore(wifi6Data.spectralEfficiency, wifi7Data.spectralEfficiency),
      'Wi-Fi 7': calcScore(wifi7Data.spectralEfficiency, wifi6Data.spectralEfficiency),
    }
  ];

  // Clean SaaS Colors
  const COLOR_WIFI_7 = '#2563eb'; // blue-600
  const COLOR_WIFI_6 = '#cbd5e1'; // slate-300
  const GRID_COLOR = '#f1f5f9';   // slate-100
  const TEXT_COLOR = '#64748b';   // slate-500

  const customTooltipStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '0.75rem',
    color: '#0f172a',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  };

  return (
    <section 
      className="w-full relative py-24"
      style={{
        backgroundImage: `url(${background5})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-[1px]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Performance Summary</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">Direct comparison of raw simulation output metrics alongside visual data analysis.</p>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          <KPICard 
            label="Throughput" 
            wifi6Value={wifi6Data.throughputMbps} 
            wifi7Value={wifi7Data.throughputMbps} 
            unit="Mbps" 
          />
          <KPICard 
            label="Delay" 
            wifi6Value={wifi6Data.delayMs} 
            wifi7Value={wifi7Data.delayMs} 
            unit="ms" 
          />
          <KPICard 
            label="Packet Loss" 
            wifi6Value={wifi6Data.packetLossPercent} 
            wifi7Value={wifi7Data.packetLossPercent} 
            unit="%" 
          />
          <KPICard 
            label="PDR" 
            wifi6Value={wifi6Data.pdrPercent} 
            wifi7Value={wifi7Data.pdrPercent} 
            unit="%" 
          />
          <KPICard 
            label="Spectral Eff." 
            wifi6Value={wifi6Data.spectralEfficiency} 
            wifi7Value={wifi7Data.spectralEfficiency} 
            unit="bps/Hz" 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Throughput Chart */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-[350px] hover:shadow-md transition-shadow">
            <h4 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider text-center">Throughput Capacity</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
                <XAxis dataKey="name" stroke={TEXT_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={TEXT_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{fill: '#f8fafc'}} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                <Bar dataKey="Wi-Fi 6" fill={COLOR_WIFI_6} radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="Wi-Fi 7" fill={COLOR_WIFI_7} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Download Time Chart */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-[350px] hover:shadow-md transition-shadow">
            <h4 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider text-center">Download Time (Seconds)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downloadTimeData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
                <XAxis dataKey="name" stroke={TEXT_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={TEXT_COLOR} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{fill: '#f8fafc'}} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                <Bar dataKey="Wi-Fi 6" fill={COLOR_WIFI_6} radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Wi-Fi 7" fill={COLOR_WIFI_7} radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-[400px] lg:col-span-2 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider text-center">Overall QoS Radar</h4>
            <p className="text-xs text-slate-400 text-center mb-4">Normalized Score (Higher is Better)</p>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="45%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke={GRID_COLOR} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: TEXT_COLOR, fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={GRID_COLOR} tick={false} axisLine={false} />
                <Radar name="Wi-Fi 6" dataKey="Wi-Fi 6" stroke={COLOR_WIFI_6} fill={COLOR_WIFI_6} fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Wi-Fi 7" dataKey="Wi-Fi 7" stroke={COLOR_WIFI_7} fill={COLOR_WIFI_7} fillOpacity={0.4} strokeWidth={2} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                <Tooltip contentStyle={customTooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </section>
  );
};
