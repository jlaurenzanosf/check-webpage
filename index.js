
const puppeteer = require('puppeteer');

const notifier = require('node-notifier');
function sendNotification(update) {
// String
    notifier.notify('EMBAJADA!!');

// Object
    notifier.notify({
        title: 'LUGAR EMBAJADA',
        message: update,
        sound: true
    });
}

var timeExecuted = 0;
async function doTheMagic(){
        const browser = await puppeteer.launch({ headless: false,slowMo: 10 });
        const page = await browser.newPage();
        await page.goto("https://ais.usvisa-info.com/en-ie/niv/users/sign_in");
        await page.type("#user_email","cafu1995@hotmail.com");
        await page.type("#user_password","windows95");
        await page.click("#policy_confirmed");
        await page.click("input.button.primary");
        await page.goto("https://ais.usvisa-info.com/en-ie/niv/schedule/33443399/payment");
        await page.waitForTimeout(4000);
        const found = await page.evaluate(() => window.find("No Appointments Available"));
        await console.log("HAY LUGARES?",!found);
        if(!found){
            sendNotification("HAY LUGAR")
        }
}
doTheMagic();
const schedule = require('node-schedule');
var job = schedule.scheduleJob('0 */4 * * *', function(){
    timeExecuted++;
    console.log('Times Executed: ',timeExecuted);
    doTheMagic();
});
job.nextInvocation();



