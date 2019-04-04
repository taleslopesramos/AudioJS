# AudioJS
Elemento de audio personalizado com vanilla javascript(zero jquery e outros frameworks).

# Como usar
* Importe o js no html: <script type="text/javascript" src="audio.js"></script>  
* Importe o css no html: <link rel="stylesheet" type="text/css" href="style.css">  
* Utilize a classe **"audio-player"** em uma div e adicione um atributo **"src"** sendo o valor deste o caminho para o arquivo de audio.
  * Ex: <div class="audio-player" src="teste.mp3"></div>

# Código
## AudioElem::createChildren(playerObj) 
Cria todos os componentes filhos do player. Ex: Botão de iniciar, Barra de progresso, Barra de Volume, Display de Tempo, etc.  

## AudioElem::listenEvents  
Começa a escutar os eventos do player. Ex: Click no botão iniciar, Click na barra de progresso, etc.

## AudioElem::update
Atualiza a barra de progresso e o contador de duração, se terminar de reproduzir o audio reseta o player.

## AudioElem static searchAndCreateAll(selector)
Procura todos os elementos no DOM que correspondam ao seletor passado de parâmetro (**selector**) e os crias como elementos de audio.
