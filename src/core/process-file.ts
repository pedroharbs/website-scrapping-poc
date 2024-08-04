import type { Link } from "@/types";
import fs from "fs-extra";
import path from "path";
import { getPathToFileFromUrl } from "@/utils/regex";
import { fetchData } from "@/utils/fetch";

/**
 * Process a file and save it to the output directory.
 * @param filePath Path to the file
 * @param content File content
 * @param asset link being retrieved
 * @param targetDomain hostname of the target website used to identify it on paths.
 * @param outputDir Output directory to save the files.
 */
export async function processFile(filePath: string, content: string | Buffer, asset: Link, targetDomain: string, outputDir: string) {
  let fileContent = content;
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.css') {
    fileContent = content.toString('utf-8');
    let promises: Promise<string | void | Buffer>[] = [];

    const fontFacePattern = /\s*url\(['"]?([^'")]+)['"]?\)/g;
    fileContent = fileContent.replace(fontFacePattern, (match, fontUrl) => {
      const fontPath = path.join(path.dirname(filePath), fontUrl);
      const fontRelativePath = fontPath.split(`output_sites/${targetDomain}`)[1];
      
      const finalFontUrl = getPathToFileFromUrl(`${asset.domain}${fontRelativePath}`)
      
      if (!finalFontUrl.url().match(/data:[a-zA-Z0-9+.-]+\/[a-zA-Z0-9+.-]+(?:;[^,]*)?(?:,[^"]*)/)) {
        promises.push(fetchData(finalFontUrl.url(), 'arrayBuffer').then(async data => {
          const filePath = path.join(outputDir, finalFontUrl.path);
          
          fs.ensureDirSync(path.dirname(filePath));
          await fs.writeFile(filePath, data);
        }));
      }

      return match;
    });


    await Promise.all(promises);
  }

  await fs.writeFile(filePath, fileContent);
}