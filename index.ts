import { Corona } from './corona';
import { writeFileSync } from 'fs';

const addTri = (index: number, tri:string[], trigrams:Map<string, number[]>) => {
    const key = tri.join("");
    if (!trigrams.has(key)) trigrams.set(key, []);
    const arr = trigrams.get(key);
    if (arr !== undefined) arr.push(index);
};

const trigrams = new Map<string, number[]>();

let tri:string[] = [' ', ' ', ' '];

for (let i = -tri.length+1; i < Corona.length; i++) {
    tri.shift();
    if (i < Corona.length-2) tri.push(Corona[i+2]);
    else tri.push(' ');
    addTri(i, tri, trigrams);
}

const trigramArray = [];
for (const v of trigrams.entries()) trigramArray.push(v);
trigramArray.sort((a,b) => b[1].length - a[1].length);

console.log(trigramArray.map(([s,a]) => [s, a.length].join(": ")).join("\n"));

const bases:{[index: string]:number} = {};
for (let i = 0; i < Corona.length; i++) {
    bases[Corona[i]] = (bases[Corona[i]] || 0) + 1;
}
console.log(bases, (bases.g+bases.c)/Corona.length);
{
    const byteLength = Corona.length / 4;
    const bytes = new Uint8Array(byteLength);
    const encodings:{[i:string]:number} = {
        t: 0,
        a: 1,
        g: 2,
        c: 3
    };
    for (let i = 0; i < Corona.length; i += 4) {
        let pairs = 0;
        for (let j = 0; j < 4; j++) {
            pairs |= encodings[Corona[i+j]] << ((3-j)*2);
        }
        bytes[i/4] = pairs;
    }
    writeFileSync('corona.u8', bytes);
}

{
    const byteLength = Corona.length / 2;
    const bytes = new Uint8Array(byteLength);
    const encodings:{[i:string]:number} = {
        t: 0,
        a: 1,
        g: 2,
        c: 3
    };
    for (let i = 0; i < Corona.length; i += 2) {
        let pairs = 0;
        for (let j = 0; j < 2; j++) {
            pairs |= encodings[Corona[i+j]] << ((3-j)*2);
        }
        bytes[i/2] = pairs;
    }
    writeFileSync('corona.u82', bytes);
}

for (let tokenSize = 1; tokenSize < 16; tokenSize++) {
    const tokens = [];
    const encodings:{[i:string]:number} = {
        t: 0,
        a: 1,
        g: 2,
        c: 3
    };
    const uniqueTokens = new Map();
    for (let i = 0; i < Corona.length; i += tokenSize) {
        let token = 0;
        for (let j = 0; j < tokenSize; j++) {
            if (i+j >= Corona.length) break;
            token += encodings[Corona[i+j]] * 4**(tokenSize-j-1);
        }
        tokens.push(token);
        uniqueTokens.set(token, 1);
    }
    console.log("Token size", tokenSize);
    console.log("Unique tokens", uniqueTokens.size);
    console.log("Number of tokens", Corona.length / tokenSize);
    if (tokenSize === 6) {
        writeFileSync('corona6.json', JSON.stringify(tokens));
    }
    if (tokenSize === 10) {
        writeFileSync('corona10.json', JSON.stringify(tokens));
    }
    if (tokenSize === 11) {
        writeFileSync('corona11.json', JSON.stringify(tokens));
    }
    if (tokenSize === 12) {
        writeFileSync('corona12.json', JSON.stringify(tokens));
    }
}

writeFileSync('corona.txt', Corona);