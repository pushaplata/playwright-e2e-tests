
import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config.ts" ;
import { EnvConfig } from "../tests/helpers/config-fixtures.ts"
import path from "path";

console.log(`--LOADING TEST ENV SETTING--`) // to check which config file is being executed

export default defineConfig<EnvConfig>({
    ...baseConfig, // loads all existing config vallues

    testDir: path.resolve(process.cwd(), "tests"),

    use: {
        ...baseConfig.use, // loading the existing use object

         envName: "dev",
         appURL: "https://papertradehyd.com/",
         dbConfig:{

            server: "",
            dbName: "",
            connectStr: "",
         },

         },

});