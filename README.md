# Setup to make typeorm 0.3.6 migrations work for nestjs

> Take note:
> 
> You must always compile to your typescript file make this work, because it targets javascript file
>
> Your typeorm must always target javascript file in your scripts

1. In package.json add this line

   ```json
     "resolutions": {
       "glob": "7.2.0"
     }
   ```

2. install

   > npm install typeorm pg @nestjs/typeorm --save

3. reference to

   > typeorm.config.ts - config() function
   >
   > typeorm.config-migrations.ts

4. add this properties to script property of package.json

   ```json
       "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
       "migration:generate": "npm run typeorm -- migration:generate -d dist/src/config/typeorm/typeorm.config-migrations.js -o dist/src/migrations/migrations",
       "migration:sync": "npm run typeorm -- schema:sync -d dist/src/config/typeorm/typeorm.config-migrations.js ",
       "migration:create": "npm run typeorm -- migration:create  -o ./dist/src/migrations/migrations",
       "migration:up": "npm run typeorm -- migration:run -d ./dist/src/config/typeorm/typeorm.config-migrations.js",
       "migration:down": "npm run typeorm -- migration:revert -d ./dist/src/config/typeorm/typeorm.config-migrations.js"
   ```

# Added support for typescript migrations

1. In package.json add this line

   > not tested if this truly fix the problem

   ```json
     "resolutions": {
       "glob": "7.2.0"
     }
   ```

2. configure typeorm.config.ts
   - in enitity and migration property, modify filename paths
   - filename with "{ .ts, .js }" is not working in typescript
   - only (filename|glob pattern).ts works - example: **/migrations/*.ts

3. Add this in package.json

   ```json
       "tsorm": "ts-node ./node_modules/typeorm/cli.js",
       "m:generate": "npm run tsorm -- migration:generate -d ./src/config/typeorm/typeorm.config-migrations.ts ./src/migrations/migrations",
       "m:sync": "npm run tsorm -- schema:sync -d ./src/config/typeorm/typeorm.config-migrations.ts ",
       "m:create": "npm run tsorm -- migration:create  ./src/migrations/migrations",
       "m:up": "npm run tsorm -- migration:run -d ./src/config/typeorm/typeorm.config-migrations.ts",
       "m:down": "npm run tsorm -- migration:revert -d ./src/config/typeorm/typeorm.config-migrations.ts",
       "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
   ```
