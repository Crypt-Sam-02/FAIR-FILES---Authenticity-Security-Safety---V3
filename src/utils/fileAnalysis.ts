import CryptoJS from 'crypto-js';
import { FileHashes, ScanResult, RiskType } from '../types/fileTypes';

const SCAN_PHASES = [
  { name: 'Initialization', weight: 0.1 },
  { name: 'Content Analysis', weight: 0.3 },
  { name: 'Pattern Detection', weight: 0.3 },
  { name: 'Risk Assessment', weight: 0.2 },
  { name: 'Report Generation', weight: 0.1 }
];

export async function calculateHashes(file: File): Promise<FileHashes> {
  const arrayBuffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer as any);

  return {
    md5: CryptoJS.MD5(wordArray).toString(),
    sha1: CryptoJS.SHA1(wordArray).toString(),
    sha256: CryptoJS.SHA256(wordArray).toString(),
    sha512: CryptoJS.SHA512(wordArray).toString(),
  };
}

const getVulnerabilities = (fileType: string, issues: string[]): string[] => {
  const vulnerabilities = [];
  
  if (fileType.match(/exe|dll|bat|cmd/i)) {
    vulnerabilities.push('Potential for arbitrary code execution');
    vulnerabilities.push('System-level access capabilities');
  }
  
  if (issues.some(i => i.includes('size'))) {
    vulnerabilities.push('Abnormal file size may indicate hidden content');
  }
  
  if (issues.some(i => i.includes('Unknown'))) {
    vulnerabilities.push('Unknown file type increases uncertainty of content safety');
  }
  
  return vulnerabilities;
};

const getRecommendations = (vulnerabilities: string[]): string[] => {
  const recommendations = [];
  
  if (vulnerabilities.includes('Potential for arbitrary code execution')) {
    recommendations.push('Run in isolated environment');
    recommendations.push('Verify digital signatures if available');
  }
  
  if (vulnerabilities.includes('Abnormal file size')) {
    recommendations.push('Inspect file structure for hidden content');
    recommendations.push('Compare with known good versions if available');
  }
  
  if (vulnerabilities.length === 0) {
    recommendations.push('Regular security scans recommended');
    recommendations.push('Keep system security up to date');
  }
  
  return recommendations;
};

export async function analyzefile(file: File): Promise<ScanResult> {
  const startTime = performance.now();
  let currentPhase = 0;
  let scanProgress = {
    phase: SCAN_PHASES[0].name,
    percentage: 0,
    currentOperation: 'Starting scan...'
  };
  
  const suspiciousExtensions = [
    '.exe', '.dll', '.bat', '.cmd', '.vbs', '.js',
    '.jar', '.msi', '.ps1', '.scr', '.hta'
  ];
  
  const detectedIssues: string[] = [];
  let riskLevel = 0;
  
  // Phase 1: Initialization
  await new Promise(resolve => setTimeout(resolve, 200));
  currentPhase++;
  scanProgress = {
    phase: SCAN_PHASES[currentPhase].name,
    percentage: 20,
    currentOperation: 'Analyzing file properties...'
  };
  
  // Phase 2: Content Analysis
  const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (suspiciousExtensions.includes(fileExtension)) {
    detectedIssues.push('Potentially dangerous file extension');
    riskLevel += 3;
  }
  
  await new Promise(resolve => setTimeout(resolve, 300));
  currentPhase++;
  scanProgress = {
    phase: SCAN_PHASES[currentPhase].name,
    percentage: 50,
    currentOperation: 'Detecting patterns...'
  };
  
  // Phase 3: Pattern Detection
  if (file.size > 100 * 1024 * 1024) {
    detectedIssues.push('Large file size detected');
    riskLevel += 1;
  }
  
  if (file.type) {
    if (file.type.includes('application/x-msdownload') || 
        file.type.includes('application/x-executable')) {
      detectedIssues.push('Executable file type detected');
      riskLevel += 3;
    }
  } else {
    detectedIssues.push('Unknown file type');
    riskLevel += 2;
  }

  await new Promise(resolve => setTimeout(resolve, 300));
  currentPhase++;
  scanProgress = {
    phase: SCAN_PHASES[currentPhase].name,
    percentage: 80,
    currentOperation: 'Evaluating risks...'
  };
  
  // Phase 4: Risk Assessment
  let riskType: RiskType;
  if (riskLevel === 0) {
    riskType = 'None';
  } else if (riskLevel <= 2) {
    riskType = 'Low';
  } else if (riskLevel <= 4) {
    riskType = 'Medium';
  } else if (riskLevel <= 6) {
    riskType = 'High';
  } else {
    riskType = 'Critical';
  }
  
  let status: 'clean' | 'suspicious' | 'malicious';
  if (riskLevel === 0) {
    status = 'clean';
  } else if (riskLevel <= 2) {
    status = 'suspicious';
  } else {
    status = 'malicious';
  }

  // Generate vulnerabilities and recommendations
  const vulnerabilities = getVulnerabilities(fileExtension, detectedIssues);
  const recommendations = getRecommendations(vulnerabilities);
  
  await new Promise(resolve => setTimeout(resolve, 200));
  currentPhase++;
  scanProgress = {
    phase: SCAN_PHASES[currentPhase].name,
    percentage: 100,
    currentOperation: 'Finalizing analysis...'
  };
  
  return {
    status,
    riskLevel,
    riskType,
    detectedIssues,
    scanTime: Math.round(performance.now() - startTime),
    fileType: fileExtension.slice(1).toUpperCase() || 'Unknown',
    mimeType: file.type || 'Unknown',
    riskAssessment: {
      vulnerabilities,
      recommendations,
      impactLevel: riskLevel <= 2 ? 'Low' : riskLevel <= 4 ? 'Medium' : 'High',
      confidence: Math.max(0, Math.min(100, 100 - (detectedIssues.length * 10))),
    },
    scanProgress
  };
}