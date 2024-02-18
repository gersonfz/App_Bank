import dotenv from 'dotenv';
import { EnvConfig } from './utils/types.utils';

dotenv.config();

export const ENV_CONFIG_PROCES: EnvConfig = {
    MONGO_URI: process.env.MONGO_URI || "",
    PORT: parseInt(process.env.PORT || "8080", 10),
    JWT_SECRET: process.env.JWT_SECRET || ""
};