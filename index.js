
const puppeteer = require('puppeteer');

const notifier = require('node-notifier');
function sendNotification(update) {
// String
    notifier.notify('SURAA!!');

// Object
    notifier.notify({
        title: 'Update taller',
        message: update,
        sound: true
    });
}

var timeExecuted = 0;
var failures = 0;
async function doTheMagic(){
    const browser = await puppeteer.launch({ headless: true,slowMo: 10 });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "-" + (currentdate.getMonth()+1)
    + "-" + currentdate.getFullYear() + "@" 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    try{
        await page.goto("https://www.segurossura.com.uy/mi-escritorio/login");
        await page.type("#email","laurenzanoster@gmail.com");
        await page.type("#password","Vamonosotros1995!");
        const loginButtn = await page.$x('//*[@id="rootEscritorio"]/div/div[2]/div/div/div/div[3]/button');
        await loginButtn[0].click(); 
        await page.waitForTimeout(2000);
        await page.goto("https://www.segurossura.com.uy/mi-escritorio/sinisters/1577903");
        await page.waitForSelector('.InsuranceSinister-titleWrap');

        const sinHitos =  await page.evaluate(() => window.find("Sin hitos registrados"));
        console.log("Nuevo hito?",!sinHitos);
        if(!sinHitos){
            sendNotification("Nuevo Hito!!")
        }
        await page.screenshot({ path: `${!sinHitos ? 'novedades' : 'nada'}/sura-screenshot-${datetime}.png` });
    } catch(e){
        await page.screenshot({ path: `crash/crash-sura-screenshot-${datetime}.png` });
        failures++;
        console.log("Well it failed, times filed:",failures);
    }
}
doTheMagic();
const schedule = require('node-schedule');
var job = schedule.scheduleJob('*/5 * * * *', function(){
    timeExecuted++;
    console.log('Times Executed: ',timeExecuted);
    doTheMagic();
});
job.nextInvocation();



