// Funcao principal do jogo. TUDO acontece nela ;D

function start() {
  // Inicio da funcao start()

  // O CIFRÃO É UM ALIAS(APLEIDO) UTILIZADO PELO JQUERY. DIGAMOS QUE É UM "USING NAMESPACE" DO C++
  // Exemplo: jQuery("#inicio").hide()
  $("#inicio").hide();

  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
  $("#fundoGame").append("<div id='placar'></div>");
  $("#fundoGame").append("<div id='energia'></div>");

  //Variaveis globais para o jogo funcionar

  // Controlador do fim do jogo; false = nao acabou e true = acabou;
  var fimdejogo = false;
  //Controlador do tiro; false = não pode atirar e true = pode atirar
  var podeAtirar = true;
  // Contador dos pontos ganhos
  var pontos = 0;
  // Controlador da quantidade de amigos que o usuário salvou
  var salvos = 0;
  // Contador dos pontos perdidos
  var perdidos = 0;
  // Estabelece a energia atual inicialmente como 3
  var energiaAtual = 3;
  // Isso aqui é um dicionário, ou seja, um objeto que contém várias variáveis dentro dele. Basicamente é uma forma de agrupar variáveis.
  // Dentro dele temos: pressionou e timer. Os itens de dicionários podem ser adicionados dinamicamente
  var jogo = {};
  // Estabelece a velocidade das entidades do jogo
  var velocidade = 5;
  // Posicao do helicoptero INIMIGO em relcao ao eixo Y (Em pé, vertical). Basicemnte uma conta que randomiza a posição.
  var posicaoY = parseInt(Math.random() * 334);
  // Lista de teclas que serao usadas pelo usuario para movimentar seu helicopetro.
  var TECLA = {
    W: 87, // Para Cima
    S: 83, // Para Baixo
    D: 68, // Tiro
  };

  jogo.pressionou = [];

  // Atribuindo os sons do jogo a variaveis para serem usados posteriormente.
  // Note que o Id Não é o nome do arquivo contido dentro da pasta "sons", mas sim o HTMl id do elemento <audio> que contem o arquivo de som.
  var somDisparo = document.getElementById("somDisparo");
  var somExplosao = document.getElementById("somExplosao");
  var musica = document.getElementById("musica");
  var somGameover = document.getElementById("somGameover");
  var somPerdido = document.getElementById("somPerdido");
  var somResgate = document.getElementById("somResgate");
  // Vale ressaltar que o document é um objeto que tem acesso a toda árvore DOM do navegador WEB,
  // perimitindo que o Java Scrpt atualize uma página HTML dinamicamente, sem precisar recarregar a página.

  // Toca a música tema do jogo. musica é uma variável definida aneteriormente que faz referência ao elemento <audio> com o id "musica" contido no HTML
  musica.play();

  //Função que faz a música ser executada em loop infinito
  musica.addEventListener(
    "ended", // "ended" é um evento que é disparado quando a música termina de tocar.
    function () {
      // Função anônima que é executada quando o evento "ended" é disparado.
      musica.currentTime = 0;
      musica.play(); // Toca a música
    },
    false,
  );

  //Verifica se o usuario pressionou alguma tecla

  // Usando o document para capturar e atualizar o HTML da página, teclas "para baixo" e "para cima"
  $(document).keydown(function (e) {
    // which é uma propriedade do objeto evento (e) que retorna o código da tecla pressionada.
    jogo.pressionou[e.which] = true;
  });

  $(document).keyup(function (e) {
    jogo.pressionou[e.which] = false;
  });

  //ABAIXO ESTÁ O LOOP DO JOGO

  // A função setInterval() é uma função nativa do JavaScript que executa uma função em um intervalo de tempo definido.
  // A função loop() é a função que será executada a cada 30 milissegundos.
  jogo.timer = setInterval(loop, 30);

  // Função de loop, pega tudo do jogo e executa em loop com 30 milisegundos de "Tick", tipo um clock ou atualização de FPS em jogos.
  function loop() {
    movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
    placar();
    energia();
  }

  //Funcao que movimenta o fundo do jogo
  function movefundo() {
    // Esta variavel recebe a tag fundoGame do CSS e pega a propriedade background-position,
    // que é a posição do fundo do jogo, e transforma em um número inteiro.
    esquerda = parseInt($("#fundoGame").css("background-position"));
    // Como tudo está em loop, basta subtrair 1 da posição do fundo para que ele se mova para a esquerda, sem precisar de WHILE ou FOR.
    // Objetivo de dar a impressão de que o jogador está se movendo para frente, quando está, na verdade, parado.
    // Malandragens ;D
    $("#fundoGame").css("background-position", esquerda - 1);
  }

  // Função que movimenta o jogador
  function movejogador() {
    // Se a tecla W for pressionada, o jogador sobe 10 pixels
    // Note que pressionou é uma lista, declarada anteriormente, que armazena as teclas pressionadas pelo usuário.
    // TECLA é uma lista com as teclas W, A e S, que é passada como um item para a lista pressinou. Isso deixa mais organizado.
    if (jogo.pressionou[TECLA.W]) {
      // topo recebe a posição do jogador no eixo Y, via CSS, transformando em um número inteiro.
      var topo = parseInt($("#jogador").css("top"));
      // Puxa o jogador para cima, subtraindo 10 pixels da posição do jogador no eixo Y.
      $("#jogador").css("top", topo - 10);

      // Se o topo for menor ou igual a 0, o jogador não pode subir mais, então ele é "puxado" para baixo,
      // somando 10 pixels à posição do jogador no eixo Y.
      // Isso é na verdada a distância entre o jogador e o topo da tela, que é 0. Se o jogador estiver na posição 0, ele não pode subir mais.
      // por isso vamos adicionando 10 pixels à posição do jogador no eixo Y, para que ele não ultrapasse o limite da tela.
      if (topo <= 0) {
        $("#jogador").css("top", topo + 10);
      }
    }

    // Se a tecla S for pressionada, o jogador desce 10 pixels
    if (jogo.pressionou[TECLA.S]) {
      // Lógica inversa em relação a tecla W, mas com a diferença de que o limite inferior da tela é 434 pixels, que é a altura do fundo do jogo.
      var topo = parseInt($("#jogador").css("top"));
      // Vai somando 10 pixels à posição do jogador no eixo Y, fazendo com que ele desça.
      // uma vez que descer soma pixels e subir subtrai pixels.
      $("#jogador").css("top", topo + 10);

      //Limite da tela do jogo é 434 de altura, logo vamos "subindo" ele sempre que chega na borda inferior.
      if (topo >= 434) {
        $("#jogador").css("top", topo - 10);
      }
    }

    if (jogo.pressionou[TECLA.D]) {
      //Chama função Disparo
      disparo();
    }
  }

  // Move o inimigo1 (helicóptero inimigo)
  function moveinimigo1() {
    // Pega a posição do inimigo1 no eixo X, via CSS, transformando em um número inteiro.
    posicaoX = parseInt($("#inimigo1").css("left"));
    // JQuery CSS para mover o inimigo1 para a esquerda, subtraindo a velocidade da posição do inimigo1 no eixo X.
    $("#inimigo1").css("left", posicaoX - velocidade);
    // Atualza a posição do inimigo1 no eixo Y, nem precisa.
    //$("#inimigo1").css("top", posicaoY);

    // Se o inimigo chegou na borda esquerda da tela.
    if (posicaoX <= 0) {
      // Atribui uma nova possição aleatória para o inimigo1 no eixo Y, entre 0 e 334 pixels.
      posicaoY = parseInt(Math.random() * 334);
      // Volta o inimigo1 para a borda direita da tela, na posição 694 pixels no eixo X.
      $("#inimigo1").css("left", 694);
      // Atualza a posição do inimigo1 no eixo Y. Aqui precisa
      $("#inimigo1").css("top", posicaoY);
    }
  }

  // Move o inimigo2 (Caminhão inimigo)
  function moveinimigo2() {
    // Pega a posição do inimigo2 no eixo X, via CSS, transformando em um número inteiro.
    posicaoX = parseInt($("#inimigo2").css("left"));
    // Descresce em 3 pixels a posição do inimigo2 no eixo X, fazendo com que ele se mova para a esquerda.
    $("#inimigo2").css("left", posicaoX - 3);

    // Se chega na borda esquerda da tela
    if (posicaoX <= 0) {
      // Volta o inimigo2 para a borda direita da tela.
      $("#inimigo2").css("left", 775);
    }
  }

  // Move amigo (menino amigo que fica andando no chão do mapa)
  function moveamigo() {
    // Pega a posição do amigo no eixo X, via CSS, transformando em um número inteiro.
    posicaoX = parseInt($("#amigo").css("left"));
    // Move o amigo para direita, somando 1 pixel à posição do amigo no eixo X.
    $("#amigo").css("left", posicaoX + 1);
    // SE o amigo chega na borda direita
    if (posicaoX > 906) {
      // Volta o amigo para a borda esquerda da tela.
      $("#amigo").css("left", 0);
    }
  }

  // Disparo do jogador
  function disparo() {
    // Se o Controlador de tiro estiver como true
    if (podeAtirar == true) {
      // Aciona o som de disparo
      somDisparo.play();
      // Controlador de tiro passa a ser false, para que o jogador não possa atirar novamente até que o tiro anterior seja removido da tela.
      podeAtirar = false;

      topo = parseInt($("#jogador").css("top")); // Pega o topo do jogador
      posicaoX = parseInt($("#jogador").css("left")); // Pega a posição do jogador no eixo X
      // O tiro faz uma trajetória retilínea horizontal que parte da frente do jogador,
      // então a posição do tiro no eixo X é a posição do jogador + 190 pixels, que é a largura do jogador.
      tiroX = posicaoX + 190;
      // Aqui estebelce a altura do tiro em relação ao topo do jogador.
      // Como o tiro deve partir do meio do jogador, pegamos o valor do topo (Distância do jogador até o teto da tela) e somamos 45 pixels
      topoTiro = topo + 45;
      $("#fundoGame").append("<div id='disparo'></div"); // Atualiza a tela com o tiro
      $("#disparo").css("top", topoTiro); // Atualiza a distância do tiro até o teto da tela, que é a altura do tiro.
      $("#disparo").css("left", tiroX); // Atualiza a posição do tiro no eixo X, que é a posição do jogador + 190 pixels, que é a largura do jogador.

      // Estebelce o intervalo de tempo entre um disparo e outro, que é de 10 milisegundos. A cada 10 milisegundos a função executaDisparo() é chamada.
      var tempoDisparo = window.setInterval(executaDisparo, 30);
    }

    // Isso executa o disparo
    function executaDisparo() {
      // Pega a posição do tiro no eixo X, via CSS, transformando em um número inteiro.
      posicaoX = parseInt($("#disparo").css("left"));
      // Atualiza a posição do tiro no eixo X, somando 15 pixels à posição do tiro no eixo X, fazendo com que ele se mova para a direita.
      // São 15 pixel a cada 30 milisegundos, ou seja, 500 pixels por segundo. Isso é a velocidade do tiro.
      $("#disparo").css("left", posicaoX + 20);

      // Se o tiro chega na borda direita da tela
      if (posicaoX > 900) {
        // limpa o intervalo de tempo entre um disparo e outro, que é de 10 milisegundos. A cada 10 milisegundos a função executaDisparo() é chamada.
        window.clearInterval(tempoDisparo);
        // Atribui null à variável tempoDisparo
        tempoDisparo = null;
        // Atualiza a tela, removendo o tiro
        $("#disparo").remove();
        // Libera o jogador para atirar novamente, atribuindo true à variável podeAtirar
        podeAtirar = true;
      }
    }
  }

  // Função que trata as colisões do jogo, ou seja, quando o jogador colide com inimigos ou amigos, ou quando o tiro colide com inimigos.
  function colisao() {
    // Estabelcendo todas as colisões do jogo possíveis.
    // A função collision() é uma função do jQuery que verifica se dois elementos colidiram, ou seja, se eles estão sobrepostos na tela.
    var colisao1 = $("#jogador").collision($("#inimigo1"));
    var colisao2 = $("#jogador").collision($("#inimigo2"));
    var colisao3 = $("#disparo").collision($("#inimigo1"));
    var colisao4 = $("#disparo").collision($("#inimigo2"));
    var colisao5 = $("#jogador").collision($("#amigo"));
    var colisao6 = $("#inimigo2").collision($("#amigo"));

    // Não é um código bonito, mas trata todas as colisões
    // Basciamente sempre valida se duas entidades estão sobrepostos na tela,
    // e se estiverem, executa uma ação, como diminuir a energia do jogador, aumentar a pontuação, etc.
    // jogador com o inimigo1

    if (colisao1.length > 0) {
      energiaAtual--;
      inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao1(inimigo1X, inimigo1Y);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    // jogador com o inimigo2
    if (colisao2.length > 0) {
      energiaAtual--;
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      explosao2(inimigo2X, inimigo2Y);

      $("#inimigo2").remove();

      reposicionaInimigo2();
    }

    // Disparo com o inimigo1

    if (colisao3.length > 0) {
      // Cada kill aumenta a velocidade do próximo inimigo1 em 0.3 pixels
      velocidade = velocidade + 0.3;
      pontos = pontos + 100;
      inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));

      explosao1(inimigo1X, inimigo1Y);
      $("#disparo").css("left", 950);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    // Disparo com o inimigo2

    if (colisao4.length > 0) {
      pontos = pontos + 50;
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      $("#inimigo2").remove();

      explosao2(inimigo2X, inimigo2Y);
      $("#disparo").css("left", 950);

      reposicionaInimigo2();
    }

    // jogador com o amigo

    if (colisao5.length > 0) {
      salvos++;
      somResgate.play();
      reposicionaAmigo();
      $("#amigo").remove();
    }

    //Inimigo 2 com o amigo

    if (colisao6.length > 0) {
      perdidos++;
      amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      explosao3(amigoX, amigoY);
      $("#amigo").remove();

      reposicionaAmigo();
    }
  }

  // Isso trata a animação da explosão do inimigo1, que é o helicóptero inimigo.
  // Essa função precisa da posição exata do inimigo1, para então colocar a explosão na frente do inimigo1
  function explosao1(inimigo1X, inimigo1Y) {
    somExplosao.play();
    // Atualiza o HTML da tela, adicionando a div da explosão, que é uma imagem estática
    $("#fundoGame").append("<div id='explosao1'></div");
    // Atualiza o CSS da div da explosão, adicionando a imagem da explosão
    $("#explosao1").css("background-image", "url(imgs/explosao.png)");
    // Passa a posição a altura do inimigo1 em relação ao teto e a posição do inimigo1 em relação à esquerda da tela, ]
    // para que a explosão seja exibida na frente do inimigo1
    var div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({ width: 200, opacity: 0 }, "slow");

    // Estabelece um intervalo de tempo para remover a explosão da tela, que é de 1 segundo.
    var tempoExplosao = window.setInterval(removeExplosao, 1000);

    // Remove a explosão da tela, limpando o intervalo de tempo e removendo a div da explosão do HTML.
    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    }
  }

  // Se o inimigo2 for removido da tela
  function reposicionaInimigo2() {
    var tempoColisao4 = window.setInterval(reposiciona4, 5000);

    function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;

      // Se o jogo ainda está rolando, adiciona o inimigo2 novamente na tela, para que o jogador possa atirar nele novamente.
      if (fimdejogo == false) {
        $("#fundoGame").append("<div id=inimigo2></div");
      }
    }
  }

  // Isso trata a animação da explosão do inimigo2, que é o tanque inimigo.
  // Essa função precisa da posição exata do inimigo2, para então colocar a explosão na frente do inimigo2
  function explosao2(inimigo2X, inimigo2Y) {
    somExplosao.play();
    $("#fundoGame").append("<div id='explosao2'></div");
    $("#explosao2").css("background-image", "url(imgs/explosao.png)");
    var div2 = $("#explosao2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;
    }
  } //

  // Reposiciona o amigo com a mesma lógica do inimigo2
  function reposicionaAmigo() {
    var tempoAmigo = window.setInterval(reposiciona6, 6000);

    function reposiciona6() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;

      if (fimdejogo == false) {
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
      }
    }
  }

  // Trata a explosão do amigo, que é o menino que o jogador deve salvar.
  // Essa função precisa da posição exata do amigo, para então colocar a explosão na frente do amigo.
  function explosao3(amigoX, amigoY) {
    somPerdido.play();
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top", amigoY);
    $("#explosao3").css("left", amigoX);
    var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
    function resetaExplosao3() {
      $("#explosao3").remove();
      window.clearInterval(tempoExplosao3);
      tempoExplosao3 = null;
    }
  }

  // Atualiza o placar
  function placar() {
    $("#placar").html(
      "<h2> Pontos: " +
        pontos +
        " Salvos: " +
        salvos +
        " Perdidos: " +
        perdidos +
        "</h2>",
    );
  } //

  // Atualiza a energia do jogador
  // Código feio, mas vai
  function energia() {
    if (energiaAtual == 3) {
      $("#energia").css("background-image", "url(imgs/energia3.png)");
    }

    if (energiaAtual == 2) {
      $("#energia").css("background-image", "url(imgs/energia2.png)");
    }

    if (energiaAtual == 1) {
      $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    // Se a energia é 0, game over!
    if (energiaAtual == 0) {
      $("#energia").css("background-image", "url(imgs/energia0.png)");

      gameOver();
    }
  }

  // Função do Fim de Jogo, para o loop do jogo, remove os elementos da tela e exibe a tela de game over.
  function gameOver() {
    fimdejogo = true;
    musica.pause();
    somGameover.play();

    window.clearInterval(jogo.timer);
    jogo.timer = null;

    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();

    $("#fundoGame").append("<div id='fim'></div>");

    $("#fim").html(
      "<h1> Game Over </h1><p>Sua pontua��o foi: " +
        pontos +
        "</p>" +
        "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>",
    );
  }
}

//Reinicia o Jogo
function reiniciaJogo() {
  somGameover.pause();
  $("#fim").remove();
  start();
}
