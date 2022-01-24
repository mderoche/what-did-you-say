/**
 * Temporary data generator. Eventually data will be sourced through
 * some sort of UI, or automated tools that accompany plugins.
 *
 * Data from https://owlcation.com/humanities/400-Alternative-words-for-said
 */

const { join } = require('path');
const { readFileSync, writeFileSync } = require('jsonfile');

const syns = readFileSync(join(__dirname, 'syns.json'));

const randomScore = () => Math.floor(Math.random() * 5 + 1);

const makeRandomizedToneRanking = () => {
    return {
        attitude: {
            friendly: randomScore(),
            hostile: randomScore(),
            apathetic: randomScore()
        },
        emotion: {
            fear: randomScore(),
            anger: randomScore(),
            joy: randomScore(),
            sadness: randomScore(),
            disgust: randomScore(),
            contempt: randomScore(),
            surprise: randomScore(),
            shame: randomScore(),
            shyness: randomScore(),
            guilt: randomScore(),
            confusion: randomScore(),
            confidence: randomScore()
        },
        intent: {
            declaritive: randomScore(),
            imperative: randomScore(),
            interrogative: randomScore(),
            exclamatory: randomScore()
        },
        purpose: {
            information: randomScore(),
            observation: randomScore(),
            suggestion: randomScore(),
            command: randomScore(),
            question: randomScore(),
            scold: randomScore(),
            laud: randomScore(),
            mock: randomScore()
        },
        volume: {
            loud: randomScore(),
            quiet: randomScore(),
            shaky: randomScore(),
            normal: randomScore()
        }
    };
};

const words = [];
for (let syn of syns) {
    words.push({
        id: Buffer.from(syn).toString('base64'),
        word: syn,
        toneRankings: [makeRandomizedToneRanking()]
    });
}

writeFileSync(join(__dirname, 'output.json'), words);
