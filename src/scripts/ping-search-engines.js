const https = require('https');

/**
 * This script can be run as part of your build or deployment process
 * to notify search engines that your sitemap has been updated.
 * 
 * Example usage in package.json:
 * "scripts": {
 *   "build": "next build",
 *   "postbuild": "node src/scripts/ping-search-engines.js"
 * }
 */

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lumoraai.in';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const searchEngines = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  }
];

async function pingSearchEngine(engine) {
  return new Promise((resolve, reject) => {
    https.get(engine.url, (res) => {
      console.log(`Pinged ${engine.name}: Status Code: ${res.statusCode}`);
      
      res.on('data', () => {});
      res.on('end', () => {
        resolve({
          engine: engine.name,
          status: res.statusCode,
          success: res.statusCode === 200
        });
      });
    }).on('error', (err) => {
      console.error(`Error pinging ${engine.name}:`, err.message);
      reject(err);
    });
  });
}

async function pingAllSearchEngines() {
  console.log(`\nNotifying search engines about sitemap: ${SITEMAP_URL}\n`);
  
  const results = [];
  
  for (const engine of searchEngines) {
    try {
      const result = await pingSearchEngine(engine);
      results.push(result);
    } catch (error) {
      results.push({
        engine: engine.name,
        success: false,
        error: error.message
      });
    }
  }
  
  console.log('\nPing results:');
  console.table(results);
  
  const successCount = results.filter(r => r.success).length;
  console.log(`\nSuccessfully notified ${successCount}/${searchEngines.length} search engines.\n`);
}

pingAllSearchEngines().catch(console.error); 