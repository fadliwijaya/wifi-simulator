export interface WifiData {
  technology: string;
  mimo: string;
  mlo: string;
  qam: string;
  channelWidth: string;
  throughputMbps: number;
  delayMs: number;
  jitterMs: number;
  packetLossPercent: number;
  pdrPercent: number;
  spectralEfficiency: number;
}

export const simulationData: WifiData[] = [
  {
    technology: "Wi-Fi 6",
    mimo: "8x8",
    mlo: "OFF",
    qam: "1024-QAM",
    channelWidth: "160 MHz",
    throughputMbps: 3003.323314,
    delayMs: 54.38894,
    jitterMs: 0.001875,
    packetLossPercent: 7.925252,
    pdrPercent: 92.074748,
    spectralEfficiency: 18.770771,
  },
  {
    technology: "Wi-Fi 7",
    mimo: "8x8",
    mlo: "ON",
    qam: "4096-QAM",
    channelWidth: "320 MHz",
    throughputMbps: 9227.694349,
    delayMs: 18.488938,
    jitterMs: 0.00139,
    packetLossPercent: 4.747248,
    pdrPercent: 95.252752,
    spectralEfficiency: 28.836545,
  },
];
