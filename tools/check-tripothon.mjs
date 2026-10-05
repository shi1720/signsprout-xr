import {chromium} from 'playwright';
const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const base=process.env.TEST_URL||'http://localhost:8093/signsprout-xr/';
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const route of ['', '#/dictionary/hello', '#/dashboard?sample=1','tripothon/']){
 await page.goto(base+route);await page.locator('h1').first().waitFor();
 if(route.includes('dictionary'))await page.locator('.stage-canvas.is-ready').waitFor();
 await page.screenshot({path:'out/check-'+(route.replace(/[^a-z]/g,'')||'home')+'.png',fullPage:false});
 console.log('PASS',route||'landing');
}
if(errors.length)throw new Error(errors.join('\n'));
await browser.close();
