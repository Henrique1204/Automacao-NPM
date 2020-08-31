const Jimp = require("jimp");
const fs = require("fs");

const imagens = fs.readdirSync("./imagens/");

imagens.forEach(function (img) {
    Jimp.read(`imagens/${img}`)
    .then(function (imagem) {
        imagem.cover(400, 400)
        .grayscale()
        .write(`otimizadas/${img}`);
    }).catch(function (erro) {
        console.log(erro);
    });
});
