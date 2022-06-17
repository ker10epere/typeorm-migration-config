# Setup to make typeorm 0.3.6 migrations work for nestjs

> ## Take note that you must always typescript compile to make this work, because it targets js compiled file
>
> ## And also you typeorm must always target js compiled file in your scripts

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
