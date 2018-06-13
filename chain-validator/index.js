const cp = require('child_process');
const os = require('os'),
    cpuCount = os.cpus().length;
const Eos = require('eosjs');
const ProgressBar = require('progress');
<<<<<<< HEAD
=======
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
let eos = null;
let bar = null;
const chunks = [];
let totalBlocks = null;
<<<<<<< HEAD
let processedBlocks = 0;
let tempBlocks = 0;
const progress_bar = false;
initEOSJS();

function initEOSJS() {
    const config = {
        keyProvider: [],
        httpEndpoint: 'http://aurora.eosrio.io:28888',
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: false
    };
    eos = Eos.Localnet(config);
    eos['getInfo']({}).then(result => {

        // Get last irreversible block
        const lib_num = result['last_irreversible_block_num'];
        console.log('Starting at block: ' + lib_num);
=======
let totalRAM_alloc = 0;
let processedBlocks = 0;
let tempBlocks = 0;
const progress_bar = true;

const TokenHolderSchema = new Schema({
    eth: {type: String, unique: true},
    acc: {type: String, unique: true},
    eos: {type: String},
    bal: String,
    proof: Schema.Types.Mixed,
    created: Boolean,
    balanceValid: Boolean,
    stakedBalance: Number,
    freeBalance: Number,
    creationBlock: String
});
const TokenHolder = mongoose.model('tokenholder', TokenHolderSchema);

let checkCalled = false;
function checkNonValidated() {
    if (checkCalled === false) {
        checkCalled = true;
        setTimeout(() => {
            TokenHolder.find({balanceValid: {"$ne": true}}).then((invalidAcc) => {
                console.log("\n\n" + ' >> Found ' + invalidAcc.length + " invalid accounts!" + "\n");
            });
        }, 1000);
    }
}

function initEOSJS() {
    const config = {
        keyProvider: [''],
        httpEndpoint: 'http://localhost:8888',
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: false,
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    };
    eos = Eos(config);
    eos['getInfo']({}).then(result => {
        // Get last irreversible block
        const lib_num = result['last_irreversible_block_num'];
        console.log(' >> Starting at block: ' + lib_num);
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
        const chunkSize = Math.ceil(lib_num / cpuCount) * 4;
        let b = lib_num;
        totalBlocks = lib_num;
        while (b > 1) {
            let low = b - chunkSize;
            if (low < 1) {
                low = 1;
            }
            chunks.push({
                high_block: b,
                high_id: "",
                low_block: low,
                low_id: ""
            });
            b = low;
        }
<<<<<<< HEAD

        if (progress_bar) {
            bar = new ProgressBar('  reading blocks [:curr/:total] [:bar] :rate/bps :percent :etas', {
=======
        if (progress_bar) {
            bar = new ProgressBar(' >> reading blocks [:curr/:total] [:bar] :rate/bps :percent :etas - :ram bytes', {
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
                complete: '=',
                incomplete: ' ',
                width: 50,
                total: lib_num
            });
        } else {
            setInterval(() => {
                const blocksPerSec = processedBlocks - tempBlocks;
                const percentage = processedBlocks / totalBlocks;
                console.log("Speed: " + blocksPerSec + "blocks/sec | " + Math.round(percentage * 100 * 100) / 100 + "%");
                tempBlocks = processedBlocks;
            }, 1000);
        }
<<<<<<< HEAD

=======
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
        chunks.forEach((chunk, index) => {
            setTimeout(() => {
                const subNode = cp.fork(`${__dirname}/worker.js`);
                subNode.on('message', (msg) => {
                    if (msg.status === "end") {
                        chunk['low_id'] = msg['data']['id'];
                    }
                    if (msg.status === "recover") {
                        if (progress_bar) {
                            bar.interrupt("Recovered at block -> " + msg.data['blk_num']);
                        } else {
                            console.log("Recovered at block -> " + msg.data['blk_num'])
                        }
                    }
                    if (msg.status === "block") {
                        processedBlocks = processedBlocks + msg.count;
                        if (progress_bar) {
                            bar.tick(msg.count, {
<<<<<<< HEAD
                                curr: processedBlocks
=======
                                curr: processedBlocks,
                                ram: totalRAM_alloc
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
                            });
                        }
                    }
                    if (msg.status === "ready") {
                        subNode.send({
                            high: chunk.high_block,
                            low: chunk.low_block,
                            index: index
                        });
                    }
<<<<<<< HEAD
=======
                    if (msg.status === "buyrambytes") {
                        totalRAM_alloc += msg.bytes;
                    }
                    if (msg.status === "finishScan") {
                        checkNonValidated();
                    }
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
                });
            }, index * 100);
        });
    });
<<<<<<< HEAD
}
=======
}

mongoose.connect('mongodb://localhost/mainnet').then(() => {
    initEOSJS();
}, (err) => {
    console.log(err);
});
>>>>>>> e8afa966359ff5aa6893c308f7072fb1ba8eeb24
