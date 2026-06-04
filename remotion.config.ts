import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(20); // 18-23 is a good range; 20 keeps the file small but sharp
Config.setEntryPoint("remotion/index.ts");
Config.setPublicDir("public");
