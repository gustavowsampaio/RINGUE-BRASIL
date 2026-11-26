// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

// Carrega as configurações do ambiente.
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

// Rotas utilizadas pelo Ringue Brasil.
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avaliacoesRouter = require("./src/routes/avaliacao");
// Rotas antigas de aquários, medidas, avisos e empresas estão em arquivos-nao-utilizados.


// Prepara a leitura dos dados enviados pelos formulários.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Disponibiliza os arquivos da dashboard.
app.use("/dashboard", express.static(path.join(__dirname, "dashboard")));

// Disponibiliza as páginas e os arquivos da pasta public.
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
// Registra os endereços da API.
app.use("/usuarios", usuarioRouter);
app.use("/avaliacoes", avaliacoesRouter);

// Inicia o servidor do site.
app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
