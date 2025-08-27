# Shopware 6

Docker project for Shopware 6

## Initialize project
`./init-project` - Initialize the Shopare 6 project; the given git repo will be clone in the code folder
- When the project doesn't have a `ddev.config.yaml`, please add one with
    - name
    - php_version
    - database: (if not mariadb)
      type: mariadb
      version: "10.11"
- Start Docker by running `./start`
- Import database by running `./import-db --file=.ddev/databases/dumpfile.sql.gz` or `./import-db` and then manually entering the path (from root to database file)
- Copy the .env, .env-local and auth.json to code/sources/ from a colleague or use the provided examples 
- Run `./build`
- The webshop should now be available under (projectname).ddev.site

## When Docker is running
- `./composer` - Run composer on apache container
- `./shopware` - Run all Magento commands on apache container
- `./build` - Runs these commands:
    - `composer install`
    - `bin/console system:install`
    - `bin/build-storefront.sh`
- `./xdebug` - Enable or disable xdebug
- `./shell` - Shell access to apache container (www-data user)
# PHPMyAdmin
Start phpmyadmin with ddev phpmyadmin