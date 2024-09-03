import { getPathToFileFromUrl } from "@/utils/regex";
import { load as cheerIoLoad } from "cheerio";
import { fetchData } from "@/utils/fetch";
import fs from "fs";
import path from "path";
import { links } from "@/core/index";
import { isValidURL } from "@/utils/url";

/**
 * Retrieve all JS, CSS, images and other assets.
 * @param targetUrl Url to be retrieved.
 * @param outputDir Output directory to save the files.
 */
export async function retrieveTargetPage(targetUrl: string, outputDir: string) {
  const response = await fetchData(targetUrl);

  const $ = cheerIoLoad(response);

  // Retrieve all JS links.
  const jsSources = $('script[src]');
  if (jsSources.length) {
    jsSources.each((_, element) => {
      let src = $(element).attr('src');
  
      if (src) {
        const isRelative = !isValidURL(src);
        if (isRelative) src = new URL(src, targetUrl).href;
        const asset = getPathToFileFromUrl(src);
        links.js.push(asset);
        $(element).attr('src', `.${asset.path}`);
      }
    });
  }

  // Retrieve all CSS links.
  const cssSources = $('link[rel="stylesheet"]');
  if (cssSources.length) {
    cssSources.each((_, element) => {
      let href = $(element).attr('href');
  
      if (href) {
        const isRelative = !isValidURL(href);
        if (isRelative) href = new URL(href, targetUrl).href;
        const asset = getPathToFileFromUrl(href);
        links.css.push(asset);
        $(element).attr('href', `.${asset.path}`);
      }
    });
  }
  
  // Retrieve all image links including the ones from srcset prop.
  const imageSources = $('img[src]');
  if (imageSources.length) {
    imageSources.each((_, element) => {
      let src = $(element).attr('src');
  
      if (src) {
        const isRelative = !isValidURL(src);
        if (isRelative) src = new URL(src, targetUrl).href;

        const asset = getPathToFileFromUrl(src);
        links.images.push(asset);
        $(element).attr('src', `.${asset.path}`);
      }

      const srcSet = $(element).attr('srcset');

      if (srcSet) {
        const srcSetArray = srcSet.split(',').map((srcSet) => {
          const [src, size] = srcSet.trim().split(' ');
          const asset = getPathToFileFromUrl(src);
          links.images.push(asset);
          return `.${asset.path} ${size}`;
        });

        $(element).attr('srcset', srcSetArray.join(', '));
      }
    });
  }

  // Retrieve all video and audio sources.
  const videoAndAudioSources = $('video source, audio source, source, lottie-player');
  if (videoAndAudioSources.length) {
    videoAndAudioSources.each((_, element) => {
      let src = $(element).attr('src');
  
      if (src) {
        console.log(src)
        const isRelative = !isValidURL(src);
        if (isRelative) src = new URL(src, targetUrl).href;
        const asset = getPathToFileFromUrl(src);
        links.others.push(asset);
        $(element).attr('src', `.${asset.path}`);
      }
    });
  }

  // Save the HTML file with the new assets paths.
  fs.writeFileSync(path.join(outputDir, 'index.html'), $.html());
}