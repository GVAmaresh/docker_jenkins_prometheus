import express, { Application } from "express";
import userRoutes from "./routes/userRouter";
import client from "prom-client"
import responseTime from "response-time"
import { Request, Response } from "express";

import { createLogger, Logger, transports } from "winston";
import LokiTransport from "winston-loki";

const app = express();

const options = {
    labels: { appName: "express" },
    transports: [
        new LokiTransport({
            host: "http://127.0.0.1:3100"
        })
    ]
};

const logger: Logger = createLogger(options);

const getRandom = (array: any) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const collectDefaultMetricss = client.collectDefaultMetrics
collectDefaultMetricss({ register: client.register })

const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "This tells how much time it has taken",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 50, 100, 200, 300, 400, 500, 800, 1000, 2000]
})

const totalReqCounter = new client.Counter({
    name: "total_req",
    help: "Tells total Request"
})

app.use(
    responseTime((req: Request, res: Response, time: number) => {
        totalReqCounter.inc()
        reqResTime.observe(
            {
                method: req.method,
                route: (req as any).route ? (req as any).route.path : req.url,
                status_code: res.statusCode,
            },
            time / 1000
        );
    })
);
app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType)
    const metrics = await client.register.metrics()
    res.send(metrics)
})


app.use(express.json());

app.use("/api/users", userRoutes);

export default app;