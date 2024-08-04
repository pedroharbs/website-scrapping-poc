import type { Link } from "@/types";
import { fetchData } from "@/utils/fetch";
import fs from "fs-extra";
import path from "path";
import { processFile } from "@/core/process-file";
 
/**
 * Retrieve and process all assets from a list of links.
 * @param assets Collection of links to be retrieved.
 * @param outputDir Output directory to save the files.
 * @param targetDomain hostname of the target website used to identify it on paths.
 */
export async function retrieveAssets(assets: Link[], outputDir: string, targetDomain: string) {
  let promises = [];

  assets = assets.filter(asset => asset.domain !== '' && asset.domain !== 'https://fonts.googleapis.com')

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    promises.push(fetchData(asset.url(), 'arrayBuffer').then(async data => {
      const filePath = path.join(outputDir, asset.path);

      fs.ensureDirSync(path.dirname(filePath));
      await processFile(filePath, data, asset, targetDomain, outputDir);
    }));
  }

  await Promise.all(promises);
}