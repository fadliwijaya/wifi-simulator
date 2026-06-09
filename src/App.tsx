import { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { DriveFileList } from './components/DriveFileList';
import { DownloadSimulation } from './components/DownloadSimulation';
import { SimpleComparison } from './components/SimpleComparison';
import { Explanation } from './components/Explanation';
import { TechFeatures } from './components/TechFeatures';
import { Charts } from './components/Charts';

import { simulationData } from './data/simulationData';
import { fileList, type DriveFile } from './data/fileList';

function App() {
  const [simulatingFile, setSimulatingFile] = useState<DriveFile | null>(null);
  const fileLibraryRef = useRef<HTMLDivElement>(null);

  const handleSimulate = (file: DriveFile) => {
    setSimulatingFile(file);
  };

  const handleCloseSimulation = () => {
    setSimulatingFile(null);
  };

  const scrollToLibrary = () => {
    fileLibraryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <main className="flex flex-col items-center">
        <Hero onStartSimulation={scrollToLibrary} />
        
        <DriveFileList 
          ref={fileLibraryRef}
          files={fileList} 
          wifi6Data={simulationData[0]}
          wifi7Data={simulationData[1]}
          onSimulate={handleSimulate}
        />
        <Explanation />
        
        <TechFeatures />
        
        <Charts 
          wifi6Data={simulationData[0]}
          wifi7Data={simulationData[1]}
          files={fileList}
        />
      </main>

      <footer className="py-12 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Values are based on NS-3 simulation output and visualized for thesis exhibition purposes.
        </p>
      </footer>

      {simulatingFile && (
        <DownloadSimulation 
          file={simulatingFile}
          wifi6Data={simulationData[0]}
          wifi7Data={simulationData[1]}
          onClose={handleCloseSimulation}
        />
      )}
    </div>
  );
}

export default App;
