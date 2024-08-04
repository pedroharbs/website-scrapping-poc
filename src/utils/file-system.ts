import fs from 'fs-extra';
import path from 'path';

/**
 * Create a directory for the target domain
 * @param targetDomain Domain to create the directory for
 * @param selectedOutputDir Folder to store the output 
 * @returns Directory path
 */
export function selectOutputDir(targetDomain: string, selectedOutputDir: string = 'output_sites') {
  const outputDir = path.join(__dirname, '..', '..', selectedOutputDir, targetDomain);

  fs.ensureDir(outputDir);

  return outputDir;
}