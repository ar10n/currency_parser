import axios from "axios";

interface Pair {
    [key:string]: string;
}

interface NewPair {
    pair: string;
    lastPrice: number;
}

export async function getExmo() {
    const availSymbols = ["ALGO","BTC","ETH","LTC","NEO","SHIB","USDT","WAVES","XRP"];

    let configExmo = {
        method: 'post',
        url: 'https://api.exmo.com/v1.1/ticker',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const pairs = await axios(configExmo).then((res) => {
        const data = [];
        for (let element of Object.entries(res.data)) {
            const firstSymbol = element[0].split('_')[0];
            const secondSymbol = element[0].split('_')[1];
            if (secondSymbol === 'RUB' && availSymbols.includes(firstSymbol)) {
                const ticker = {
                    pair: firstSymbol + secondSymbol,
                };
                Object.assign(ticker, element[1])
                data.push(ticker);
            }
        }
        return data;
    });

    const pairsWithPrices: NewPair[] = [];
    pairs.forEach((obj: Pair) => {
        const newPair: NewPair = {
            pair: '',
            lastPrice: 0
        };
        newPair.pair = obj.pair;
        newPair.lastPrice = Number(Number.parseFloat(obj.last_trade).toFixed(2));
        pairsWithPrices.push(newPair);
    });
    return pairsWithPrices;
}