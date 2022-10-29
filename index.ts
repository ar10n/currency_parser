import {getExmo} from "./getters/getExmo";
import {getBinance} from "./getters/getBinance";

interface DiffPair {
    pair: string;
    binancePrice: number;
    exmoPrice: number;
    diff: number;
    timestamp: number;
}

async function main() {
    const exmo = await getExmo();
    const binance = await getBinance();
    console.log(exmo);
    console.log(binance);
    const diffArray: DiffPair[] = [];
    exmo.forEach((exmoPair) => {
        if (exmoPair.lastPrice) {
            binance.forEach((binancePair) => {
                if (binancePair.pair === exmoPair.pair && binancePair.lastPrice) {
                    const newArr = {
                        pair: '',
                        binancePrice: 0,
                        exmoPrice: 0,
                        diff: 0,
                        timestamp: 0
                    };
                    newArr.pair = binancePair.pair;
                    newArr.binancePrice = binancePair.lastPrice;
                    newArr.exmoPrice = exmoPair.lastPrice;
                    newArr.diff = newArr.binancePrice / exmoPair.lastPrice - 1;
                    newArr.timestamp = Date.now();
                    diffArray.push(newArr);
                }
            });

        }
    });
    console.log(diffArray);
}

main();