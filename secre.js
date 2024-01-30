// You can add more than 100 urls on setConfig.json, but it's not advisable :>
// Made by SaikiDesu (Mra1k3r0)
// https://github.com/Mra1k3r0

const fs = require("fs");
const { get } = require("snekfetch");
const serverless = require("aws-serverless-koa");
const axios = require("axios").default;
const logger = require("./log.js");
const Koa = require("koa");
const KoaRouter = require("koa-router");
const KoaJSON = require("koa-json");
const { koaBody } = require("koa-body");
const chalk = require("chalk");
/** */

let data = ["#DEADED", "#00ffa2", "#0092ff", "#ff8700", "#f2ff00", "#ff0000", "#9d00ff", "#00dcff"];

let col = data[Math.floor(Math.random() * data.length)];

const app = new Koa();
const router = new KoaRouter();
app.proxy = true;

const PORT = process.env.PORT || 3040 || 8080;

console.log("Made by SaikiDesu");

app.use(koaBody());
app.use(KoaJSON());

router.get("/", async (ctx, next) => {
    const start = Date.now();
    await next();
    let data2 = ["SelfPinger by SaikiDesu, enjoy!", "Powered by KoaJs", "Follow me on fb: https://www.facebook.com/saikidesu11", "Follow my github: https://github.com/Mra1k3r0", "Credits to all facebook and dc bot developers"];
    let mess = data2[Math.floor(Math.random() * data2.length)];
    const rt = ctx.response.get("X-Response-Time");
    console.log(chalk.hex(col)(`--->heartbeat<---\n↳ ${ctx.method} ${ctx.url} - ${rt}`));
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms.toFixed(2)}mbps`);
    ctx.body = { data: mess, ip: ctx.request.ip };
    console.log(chalk.hex(col)("↳ " + ctx.request.ip + "\n-----------------"));
});

router.get("/method2/add", async (ctx, next) => {
    let reg = new RegExp(/(https?:\/\/)?([\w\-]+\.)+(co|com|app|net)/gi);
    const { url } = ctx.query;

    if (!url) {
        ctx.response.status = 404;
        return (ctx.body = { status: ctx.response.status, message: "url is empty!" });
    } else if (reg.test(url)) {
        try {
            const data = JSON.parse(fs.readFileSync(__dirname + "/container/setConfig.json"));
            console.log(data);
            if (data.links.some((link) => url.match(link))) {
                ctx.response.status = 200;
                return (ctx.body = { status: ctx.response.status, message: "url was already included in the database!", url: url });
            } else {
                data.links.push(url);

                fs.writeFileSync(__dirname + "/container/setConfig.json", JSON.stringify(data));
                ctx.response.status = 200;
                return (ctx.body = { status: ctx.response.status, message: `successfully added url.`, url: url });
            }
        } catch (err) {
            console.error(err);
            ctx.response.status = 400;
            ctx.body = {
                status: ctx.response.status,
                message: `Something went wrong: ${err}`,
            };
        }
    } else {
        ctx.response.status = 400;
        ctx.body = {
            status: ctx.response.status,
            message: `Invalid url input!`,
        };
    }
    await next();
});

router.get("/method1/add", async (ctx, next) => {
    ctx.body = { status: ctx.response.status, message: `No parameter found!` };
    await next();
});

router.post("/method1/add", async (ctx, next) => {
    let reg = new RegExp(/(https?:\/\/)?([\w\-]+\.)+(co|com|app|net)/gi);

    if (!ctx.request.body.url) {
        ctx.response.status = 404;
        return (ctx.body = {
            status: ctx.response.status,
            message: `url is empty!`,
        });
    } else if (reg.test(ctx.request.body.url)) {
        const { url } = ctx.request.body;

        try {
            const data = JSON.parse(fs.readFileSync(__dirname + "/container/setConfig.json"));
            console.log(data);
            if (data.links.some((link) => url.match(link))) {
                ctx.response.status = 200;
                return (ctx.body = {
                    status: ctx.response.status,
                    message: "url was already included in the database!",
                    url: url,
                });
            } else {
                data.links.push(url);

                fs.writeFileSync(__dirname + "/container/setConfig.json", JSON.stringify(data));
                ctx.response.status = 200;
                return (ctx.body = { status: ctx.response.status, message: `successfully added url.`, url: url });
            }
        } catch (err) {
            console.error(err);
            ctx.response.status = 400;
            ctx.body = {
                status: ctx.response.status,
                message: `Something went wrong: ${err}`,
            };
        }
    } else {
        ctx.response.status = 400;
        ctx.body = {
            status: ctx.response.status,
            message: `Invalid url input!`,
        };
    }

    await next();
});

app.on("error", (err) => {
    console.error("server error", err);
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => console.log(`Server Started! Listening to localhost:${PORT}`));

function ensureExists() {
    if (!fs.existsSync(__dirname + "/container/setConfig.json")) {
        console.log(chalk.hex("#ff0800").bold("[ WARN ] » " + chalk.hex("#00ffc9").bold("setConfig.json is not found! please restart...")));

        var template = { interval: 1000, type: "json", links: ["https://selfpinger-saikidesu.saikidesu-web.repl.co/"] };
        fs.writeFileSync(__dirname + "/container/setConfig.json", JSON.stringify(template));
        return process.exit(1);
    }
}

ensureExists();

const config = require("./container/setConfig.json");
const configs = require("./container/setConfig.js");

if (config.type == "json") {
    setInterval(upTime1, config.interval);
} else if (config.type == "js") {
    setInterval(upTime2, config.interval);
} else {
    console.log(chalk.hex("#ff0800").bold("[ WARN ] » " + chalk.hex("#00ffc9").bold(`Invalid Type! "${config.type}"`)));
    process.exit(1);
}

const randomChromeVersion = () => {
    const majorVersion = Math.floor(Math.random() * 121);
    const minorVersion = Math.floor(Math.random() * 10);
    const buildVersion = Math.floor(Math.random() * 7000);
    const patchVersion = Math.floor(Math.random() * 300);
    return `${majorVersion}.${minorVersion}.${buildVersion}.${patchVersion}`;
};

function upTime1() {
    fs.readFile(__dirname + "/container/setConfig.json", "utf8", (err, data) => {
        if (err) return console.log(err.message);

        let allLinks = JSON.parse(data).links ? JSON.parse(data).links : configs.links; // process.env.URL.split(", ");
        let browserVersion = randomChromeVersion();

        allLinks.some((link) => {
            let headers = {
                "Transfer-Encoding": "chunked",
                Connection: "keep-alive",
                Host: link.replace(/^https?:\/\//, "").split("/")[0],
                "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu 18.04 CHromium/${browserVersion} Chrome/${browserVersion} Safari/537.36`,
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                //   "X-Requested-With": "XMLHttpRequest",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                "Accept-Language": "en-US",
                //  "X-Forwarded-For": "clientIPAddress",
            };

            axios
                .get(link, { headers })
                .then((res) => {
                    logger(`${link}`, ` is working`, "ok");
                    return console.log(chalk.hex("00CCCC").bold(`Status:`), chalk.hex("00CC00")(res.status));
                })
                .catch((err) => {
                    if (err.response) {
                        logger(`${link}`, ` is not working`, "err");
                        return console.log(chalk.hex("00CCCC").bold(`Status:`), chalk.hex("FF0000")(err.response.status));
                    }
                    logger(`${link}`, ` is not working`, "err");
                });
        });
    });
}

function upTime2() {
    let allLinks = configs.links; // process.env.URL.split(", ");
    let browserVersion = randomChromeVersion();

    allLinks.some((link) => {
        let headers = {
            "Transfer-Encoding": "chunked",
            Connection: "keep-alive",
            Host: link.replace(/^https?:\/\//, "").split("/")[0],
            "User-Agent": `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu 18.04 CHromium/${browserVersion} Chrome/${browserVersion} Safari/537.36`,
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            //   "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "Accept-Language": "en-US",
            //  "X-Forwarded-For": "clientIPAddress",
        };

        axios
            .get(link, { headers })
            .then((res) => {
                logger(`${link}`, ` is working`, "ok");
                return console.log(chalk.hex("00CCCC").bold(`Status:`), chalk.hex("00CC00")(res.status));
            })
            .catch((err) => {
                if (err.response) {
                    logger(`${link}`, ` is not working`, "err");
                    return console.log(chalk.hex("00CCCC").bold(`Status:`), chalk.hex("FF0000")(err.response.status));
                }
                logger(`${link}`, ` is not working`, "err");
            });
    });
}

setInterval(selfPing, 1800000);

function selfPing() {
    let myurl = "";
    if (process.env.REPL_ID) {
        myurl = "https://fb3c4ba9-780d-48ae-9f4c-b4c83d4666c3-00-22pc1d12nvqoe.janeway.replit.dev/" || `http://127.0.0.1:${PORT}`; //`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/` 
    } else if (process.env.CODESANDBOX_HOST) {
        myurl = `https://${process.env.CODESANDBOX_HOST}`;
    } else {
        myurl = `http://127.0.0.1:${PORT}`;
    }
    get(myurl)
        .then((respo) => {
            return respo;
        })
        .catch((err) => {
            return err;
        });
}

//module.exports.handler = serverless(app);
