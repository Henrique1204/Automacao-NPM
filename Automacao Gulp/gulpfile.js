// import do gulp
const gulp = require("gulp");
// Import da biblioteca de sass do gulp
const sass = require("gulp-sass");
// Import da biblioteca de autoprefixer do gulp
const autoprefixer = require("gulp-autoprefixer");
// Import e ativação do browser sync
const browserSync = require("browser-sync").create();
// Import da biblioteca concat
const concat = require("gulp-concat");
// Import do babel do gulp
const babel = require("gulp-babel");
// Import do uglify do gulp
const uglify = require('gulp-uglify-es').default;;

function compilarSass() {
    /*
    .src -- é pra definir o caminho onde tu vai pegar os arquivos
    .pipe(sass()) -- é pra ativar o sass e processar os arquivos
    sass({outputstyle: "compressed"}) -- compressa o arquivo
    autroprefixer(...) -- Implementação padrão da biblioteca
    .pipe(gulp.dest()) -- é pra definir onde os arquivos processados vão
    browserSync.stream() -- faz o navegador recarregar quando alterar o sass
    */
    return gulp.src("css/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer({ browsers: ['last 2 version'], cascade: false }))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

/*
Isso cria a tarefa para ser usada no termial
o primeiro parâmetro é como você vai chamar a tarefa
o segundo é a função que vai executar
gulp sass -- executa a tarefa no termial
*/
// gulp.task("sass", compilarSass); -- Sintaxe antiga
exports.compilarSass = compilarSass;

// Função para juntar o JavaScript
function mainjs() {
    /*
    concat("nomeDoArquivoFinal") -- Junta os arquivos
    babel({ presets: ["@babel/env"] }) -- Faz o plyfil do javascript, presets define ao que ele vai dar suporte
    */
    return gulp.src("js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

// gulp.task("mainjs", mainjs); -- Sintaxe antiga
exports.mainjs = mainjs;

// Iniciar um servidor local na porta 3000
function browser() {
    // Basedir -- define o diretório raiz onde o servidor vai rodar
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

// gulp.task("browser-sync", browser); -- Sintaxe antiga
exports.browser = browser;

// Função para ficar de olho quando o arquivo é salvo
function watch() {
    /*
    watch(caminha, exe)
    caminho  -- O caminho dos arquivos que é pra ser observados.
    exe -- O que é pra ser executado, só pode uma função, porém várias tarefas.
    gulp.series -- executa em série.
    gulp.parallel -- executa paralelamente.
    */
    
    gulp.watch("css/scss/**/*.scss", compilarSass);
    gulp.watch("js/**/*.js", mainjs);
    gulp.watch("*.html").on("change", browserSync.reload);
}

// gulp.task("watch", watch); -- Sintaxe antiga
exports.watch = watch;

// Default é a tarefa padrão que é executa apenas ao digitar gulp
exports.default = gulp.parallel(compilarSass, watch, browser, mainjs);