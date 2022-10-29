import {appendFileSync} from "fs";
import {getExmo} from './getters/getExmo';
import {getBinance} from './getters/getBinance';

// interface DiffPair {
//     pair: string;
//     binancePrice: number;
//     exmoPrice: number;
//     diff: number;
//     timestamp: number;
// }

async function getData() {
    const exmo = await getExmo();
    const binance = await getBinance();
//     const diffArray: DiffPair[] = [];
    const diffArray: string[] = [];
    exmo.forEach((exmoPair) => {
        if (exmoPair.lastPrice) {
            binance.forEach((binancePair) => {
                if (binancePair.pair === exmoPair.pair && binancePair.lastPrice) {
//                     const newArr = {
//                         pair: '',
//                         binancePrice: 0,
//                         exmoPrice: 0,
//                         diff: 0,
//                         timestamp: 0
//                     };
//                     newArr.pair = binancePair.pair;
//                     newArr.binancePrice = binancePair.lastPrice;
//                     newArr.exmoPrice = exmoPair.lastPrice;
//                     newArr.diff = newArr.binancePrice / exmoPair.lastPrice - 1;
//                     newArr.timestamp = Date.now();
                    const newString = `\r\n${binancePair.pair},${binancePair.lastPrice},${exmoPair.lastPrice},${binancePair.lastPrice / exmoPair.lastPrice - 1},${Date.now()}`;
                    diffArray.push(newString);
                }
            });
        }
    });
    return diffArray;
}

function main() {
    let timerId = setInterval(async () => {
        const strArr = await getData();
        strArr.forEach(str => appendFileSync('test.csv', str));
    }, 5000);
    setTimeout(() => clearInterval(timerId), 7200000);
}

main();