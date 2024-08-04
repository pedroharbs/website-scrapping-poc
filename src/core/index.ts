import { selectOutputDir } from "@/utils/file-system";
import type { Links } from "@/types";
import { retrieveTargetPage } from "@/core/retrieve-page";
import { retrieveAssets } from "@/core/retrieve-assets";
import { formatDate, formatDuration } from "@/utils/date";
import { isValidURL } from "@/utils/url";

export let links: Links = { js: [], css: [], images: [], others: [] };

async function main(url: string) {
  if (!isValidURL(url)) return console.error('Invalid URL provided!');

  const startDate = new Date();
  const startTime = startDate.getTime();
  console.log('[] - Process started at:', formatDate(startDate));

  const targetUrl = url;
  const targetDomain = new URL(targetUrl).hostname;

  console.log('[] - Cloning website: ', targetUrl);
  
  // Select and ensure the output directory exists!
  const outputDir = selectOutputDir(targetDomain, 'output_sites');

  // Retrieve page links.
  await retrieveTargetPage(targetUrl, outputDir);

  const assetsQuantity = Object.entries(links).reduce((acc, [_, value]) => {
    acc = acc + value.length;
    return acc;
  }, 0);

  console.log('[] - Retrieved links: ', assetsQuantity);

  // Download images, css, js and others.
  await retrieveAssets(links.images, outputDir, targetDomain);
  await retrieveAssets(links.css, outputDir, targetDomain);
  await retrieveAssets(links.js, outputDir, targetDomain);
  await retrieveAssets(links.others, outputDir, targetDomain);

  const endDate = new Date();
  const endTime = endDate.getTime();
  console.log('[] - Process finished at:', formatDate(endDate), 'and took: ', formatDuration(endTime - startTime));
}

main('https://example.com/');