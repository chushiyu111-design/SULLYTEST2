const fs = require('fs');
const ttf2woff2 = require('ttf2woff2');

const fonts = ['shouxie6.ttf', 'huanghun-shouxie.ttf', 'zhaixinglou-cn.ttf'];

fonts.forEach(f => {
    try {
        console.log(`Converting ${f}...`);
        const input = fs.readFileSync(`public/fonts/${f}`);
        const result = ttf2woff2(input);
        fs.writeFileSync(`public/fonts/${f.replace('.ttf', '.woff2')}`, result);
        console.log(`Successfully saved ${f.replace('.ttf', '.woff2')}`);
    } catch(e) {
        console.error(`Failed to convert ${f}:`, e);
    }
});
