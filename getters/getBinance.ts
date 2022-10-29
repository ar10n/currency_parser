import axios from 'axios';

interface Pair {
    [key:string]: string;
}

interface NewPair {
    pair: string;
    lastPrice: number;
}

export async function getBinance() {
    const availPairs = '["ALGORUB","BTCRUB","ETHRUB","LTCRUB","NEORUB","SHIBRUB","USDTRUB","WAVESRUB","XRPRUB"]';
    const pairs = await axios.get(`https://api1.binance.com/api/v3/ticker/24hr?symbols=${availPairs}`)
        .then(res => {
            return res.data;
        });
    const pairsWithPrices: NewPair[] = [];
    pairs.forEach((obj: Pair) => {
        const newPair = {
            pair: '',
            lastPrice: 0
        };
        newPair.pair = obj.symbol;
        newPair.lastPrice = Number(obj.lastPrice);
        pairsWithPrices.push(newPair);
    });
    pairsWithPrices.sort((a, b) => {
        const pairOne = a.pair;
        const pairTwo = b.pair;
        if (pairOne < pairTwo) {
            return -1;
        }
        if (pairOne > pairTwo) {
            return 1;
        }
        return 0;
    });
    return pairsWithPrices;
}
