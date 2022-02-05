const { program } = require('commander');
const { connection } = require('./db')
const Transactions = require('./models/Transactions')
const Contracts = require('./controllers/contract')
const Users = require('./controllers/user')
const Transaction = require('./controllers/transaction')


program.version("1.0.0").description("A command line tool to view database data")

program.command("users")
    .option('-f, --file <filename>', 'prueba')
    .option('-u, --user <wallet>', 'prueba')
    .action(async (options) => {
        async function isfile() {
            if (options.file) {
                await Users.info_f(options.file);
            } else {
                await Users.view();
            }
        }
        if (options.user) {
            await Users.info_u(options.user);
            isfile()
        } else {
            await Users.info();
            isfile()
        }
        await connection.close()
        process.exit(0)
    })
    .description("View all users")

program.command("contracts")
    .option('-f, --file <filename>', 'prueba')
    .option('-c, --contract <hash>', 'prueba')
    .action(async (options) => {
        async function isfile() {
            if (options.file) {
                await Contracts.info_f(options.file);
            } else {
                await Contracts.view();
            }
        }
        if (options.contract) {
            await Contracts.info_c(options.contract);
            isfile()
        } else {
            await Contracts.info();
            isfile()
        }
        await connection.close()
        process.exit(0)

    })
    .description("View all contracts")

program.command("txn")
    .option('-f, --file <filename>', 'prueba')
    .option('-t, --txn <txnid>', 'prueba')
    .option('-u, --user <wallet>', 'prueba')
    .option('-c, --contract <contractid>', 'prueba')
    .action(async (options) => {
        async function isfile() {
            if (options.file) {
                await Transaction.info_f(options.file);
            } else {
                await Transaction.view();
            }
        }
        if (options.user) {
            if (options.txn) {
                await Transaction.info_u(options.user, options.txn);
                isfile();
            } else {
                await Transaction.info_u(options.user);
                isfile();
            }
        } else if (options.contract) {
            if (options.txn) {
                await Transaction.info_c(options.contract, options.txn);
                isfile();
            } else {
                await Transaction.info_c(options.contract);
                isfile();
            }
        } else if (options.txn) {
            await Transaction.info_t(options.txn);
            isfile();
        } else {
            await Transaction.info();
            isfile();
        }
        await connection.close()
        process.exit(0)
    })
    .description("View all transacctions")

program.parse(process.argv)