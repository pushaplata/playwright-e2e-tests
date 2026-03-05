
import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config.ts" ;
import { EnvConfig } from "../tests/helpers/config-fixtures.ts"
import path from "path";

console.log(`--LOADING TEST ENV SETTING--`)

export default defineConfig<EnvConfig>({
    ...baseConfig, // loads all existing config vallues

    testDir: path.resolve(process.cwd(), "tests"),

    use: {
        ...baseConfig.use, // loading the existing use object

         envName: "test",
         appURL: "https://katalon-demo-cura.herokuapp.com/",
         nopcommerceWeb: "https://admin-demo.nopcommerce.com/",
         apiURL: "https://reqres.in/api",
         dbConfig:{

            server: "",
            dbName: "",
            connectStr: "",
         },

         },

});