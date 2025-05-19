

import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const resources = [
    { id: 1, nome: '🌳🌳 Curso em Vídeo, HTML5 e CSS3, Módulo 1/5', imagem: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXU1M2Nxd2dwYzYzbmRqYzE2dWhrdDEwZG1wM3FoOHdjazE4czZndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L0NvsV1pBDRCcVQBGY/giphy.gif', tipo: 'normal', categoria: 'Curso', descricao: 'O primeiro módulo do melhor curso de front para iniciantes, pelo melhor professor do mundo.', link: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n&ab_channel=CursoemV%C3%ADdeo', tags: ['HTML', 'CSS', 'Curso', 'Youtube', 'Guanabara', 'CursoEmVídeo', 'SentaEAssiste', 'Obrigatório', 'Juninho'] },
    { id: 14, nome: '🌳 Dicionário do programador, do CódigoFonteTV', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Melhor oportunidade para ouvir falar das principais tecnologias do momento e acumlar aquele arsenal de argumentos para uma entrevista ou conversa de boteco.', link: 'https://www.youtube.com/watch?v=hlgm_1Bzt-4&list=PLVc5bWuiFQ8GgKm5m0cZE6E02amJho94o&ab_channel=C%C3%B3digoFonteTV', tags: ['CulturaDev'] },
    { id: 141, nome: 'Playlist do Bóson Lógica com Portugol (mais de 40 vídeos)', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Playlist de Lógica com muito vídeo usando o Portugol Studio!', link: 'https://www.youtube.com/watch?v=4IMr8PQa0WQ&list=PLucm8g_ezqNp_ubuH4XraJRwvUJogsyiF&ab_channel=B%C3%B3sonTreinamentos', tags: ['Lógica', 'Portugol Studio', 'Iniciante', 'Juninho', 'Reforço', 'Playlist'] },
    { id: 15, nome: 'Curso de lógica em JavaScript do CFBCursos', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Curso gigaaaaaante de lógica com JavaScript do Tio CFB.', link: 'https://www.youtube.com/watch?v=lcKo-ycLDNw&list=PLx4x_zx8csUj3IbPQ4_X5jis_SkCol3eC', tags: ['Curso', 'Lógica', 'JS', 'JavaScript', 'Juninho'] },
    { id: 1000, nome: '🍪AJUDA AÍ!!⭐', imagem: '', tipo: 'ad', categoria: 'Biscoitagem', descricao: '🍪 Se você gosta de explorar esta selva de vasto conhecimento do JAMANJO e quer mandar aquele carinho, entra ali no repositório e deixa uma estrelinha! É fácil, rápido, de graça e a gente adora! ⭐', link: 'https://github.com/rafaellindemann/rafaellindemann.github.io', tags: ['⭐', '🍪', 'ads', 'Biscoitagem', 'JAMANJO', '💪', '🙏', '🙌', '🤜🤛'] },
    { id: 7, nome: 'Curso em Vídeo, Git e GitHub', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O Curso de Git e Github do Guanabara, usando o GitHub Desktop (sem linha de comando)', link: 'https://www.youtube.com/watch?v=xEKo29OWILE&list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA&ab_channel=CursoemV%C3%ADdeo', tags: ['CursoEmVídeo', 'Guanabara', 'Git', 'GitHub', 'GitHubDesktop', 'Juninho'] },
    { id: 102, nome: '🌳🌳 Fernanda Kipper | Dev', imagem: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2ZwNzB0amg0MnNma3kwMjdlc3VjdWZheDVkdWllYnFtZ3NnNWpoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vND6hHLoZlNADU9eia/giphy.gif', tipo: 'destaque', categoria: 'Canal', descricao: 'Se joga! Ativa o sininho que ela é demais! Um dos pontos fortes é ela resolvendo desafios de entrevistas técnicas, mas tá longe de ser só isso. Aproveita e espia os vídeos que ela faz para os membros que pagam só 5 pila por mês...', link: 'https://www.youtube.com/@kipperdev', tags: ['Canal', 'Kipper', 'React', 'Node', 'Angular', 'Java', 'Spring', 'Projetos', 'Manja Muito', 'Carreira', 'Boas práticas', 'Produtividade', 'Arquitetura', 'PostgreSQL', 'Docker', 'Go'] },
    { id: 140, nome: 'Curso Completo Lógica com Portugol (8h30m)', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Baita cursão do Bóson - Lógica usando o Portugol Studio!', link: 'https://www.youtube.com/watch?v=XzkZO2qjgec&t=1771s&ab_channel=B%C3%B3sonTreinamentos', tags: ['Lógica', 'Portugol Studio', 'Iniciante', 'Juninho', 'Reforço'] },
    { id: 6, nome: '🌳 Curso em Vídeo, JavaScript para Iniciantes', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O basicão de JavaScript muito bem visto com o padrão Guanabara de qualidade', link: 'https://www.youtube.com/watch?v=1-w1RfGIov4&list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1&ab_channel=CursoemV%C3%ADdeo', tags: ['JS', 'Curso', 'Youtube', 'Guanabara', 'CursoEmVídeo', 'SentaEAssiste'] },
    // { id: 8, nome: 'Curso em Vídeo - Lógica de Programação', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O famoso curso de lógica de programação do Guanabara. Infelizmente ele usa o VisualG na maior parte, mas se abstrair isso super vale a pena! De bônus, o curso inicia com o maravitop Scratch!', link: 'https://www.youtube.com/watch?v=8mei6uVttho&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&ab_channel=CursoemV%C3%ADdeo', tags: ['Lógica', 'Scratch', 'Guanabara', 'VisualG'] },
    { id: 10, nome: '⚠ devSamurai', imagem: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3N2M3ZpbjRiYnFxcG5uZ252Z3dqMzMyc3ZwYWx5aDAyZW55NGloayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cjQoYeXvp2FH7grGGT/giphy.gif', tipo: 'destaque', categoria: 'Curso', descricao: 'Só até DEZEMBRO DE 2025: o devSamurai resolveu fechar a devSamurai e deixou disponível para download todos os cursos da plataforma devSamurai, mas é só até o final do ano. Corre lá pra conferir porque tem muita coisa!', link: 'https://class.devsamurai.com.br/', tags: ['Muitos cursos', 'tempoLimitado', 'NãoPerde', 'Lógica', 'React', 'React Native', 'Fluter', 'JS', 'JavaScript', 'Linux', 'Carreira', 'Python', 'Renda extra', 'TypeScript', 'NodeJS', 'Muitos cursos'] },
    { id: 9, nome: 'freeCodeCamp', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Muito curso da gringa, super completos e com uma galera muito forte. Os cursos são muito completos, grandes, gratuitos, com certificados gratuitos e em inglês. O site conta com tradução para o português. Chegou a hora de pedir desculpas ao Guanabara por dizer que ele “enrola demais” nas explicações e mostrar que tu tem o que precisa pra dominar a arte da programação. Não deixa de ver o canal do freeCodeCamp aqui no outro quadradinho.', link: 'https://www.freecodecamp.org/', tags: ['Muitos cursos', 'Certificados', 'Tutoriais', 'freeCodeCamp'] },
    { id: 11, nome: 'Canal do freeCodeCamp', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Muito curso da gringa, super completos e com uma galera muito forte. Os cursos são muito completos, grandes, gratuitos, com certificados gratuitos e em inglês. O próprio youtube gera legendas automáticas em português então o inglês não vai ser problema. Chegou a hora de pedir desculpas ao Guanabara por dizer que ele “enrola demais” nas explicações e mostrar que tu tem o que precisa pra dominar a arte da programação. Não deixa de ver o site do freeCodeCamp aqui no outro quadradinho.', link: 'https://www.youtube.com/@freecodecamp', tags: ["freeCodeCamp", 'Cursos', 'Tutoriais'] },
    { id: 13, nome: 'dpw', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Ótimo canal com curso, dicas e tutoriais sobre Frontend (HTML+CSS+JS)', link: 'https://www.youtube.com/channel/UCdHcHgSrWidiOg-mNFNB1Nw', tags: ['Frontend', 'Tutoriais', 'HTML', 'CSS', 'JS'] },
    { id: 16, nome: 'Javascript Essencial - Conceitos iniciais, RBtech', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Curso rapidão de JavaScript', link: 'https://www.youtube.com/watch?v=ipHuSfOYhwA&list=PLInBAd9OZCzxl38aAYdyoMHVg0xCgxrRx&ab_channel=RBtech', tags: ['Curso', 'JS'] },
    { id: 2, nome: 'Curso em Vídeo, HTML5 e CSS3, Módulo 2/5', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O segundo módulo do melhor curso de front para iniciantes, pelo melhor professor do mundo.', link: 'https://www.youtube.com/watch?v=vPNIAJ9B4hg&list=PLHz_AreHm4dlUpEXkY1AyVLQGcpSgVF8s&ab_channel=CursoemV%C3%ADdeo', tags: ['HTML', 'CSS', 'Curso', 'Youtube', 'Guanabara', 'CursoEmVídeo', 'SentaEAssiste'] },
    // { id: 2000, nome: '', imagem: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExczlleHRwZnNxemNmNW15bDh0cGg5MDBqcWNmZjJ4ZW00ejJidW83aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/azICCwJD3pi1pqimJg/giphy.gif', tipo: 'normal', categoria: '', descricao: '', link: 'https://github.com/rafaellindemann/jamanjo', tags: [] },
    { id: 3, nome: 'Curso em Vídeo, HTML5 e CSS3, Módulo 3/5', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O terceiro módulo do melhor curso de front para iniciantes, pelo melhor professor do mundo.', link: 'https://www.youtube.com/watch?v=ofFgnDtn_1c&list=PLHz_AreHm4dmcAviDwiGgHbeEJToxbOpZ&ab_channel=CursoemV%C3%ADdeo', tags: ['HTML', 'CSS', 'Curso', 'Youtube', 'Guanabara', 'CursoEmVídeo', 'SentaEAssiste'] },
    { id: 4, nome: 'Curso em Vídeo, HTML5 e CSS3, Módulo 4/5', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O quarto módulo do melhor curso de front para iniciantes, pelo melhor professor do mundo.', link: 'https://www.youtube.com/watch?v=zHKHMmEG9vE&list=PLHz_AreHm4dkcVCk2Bn_fdVQ81Fkrh6WT', tags: ['HTML', 'CSS', 'Curso', 'Youtube', 'Guanabara', 'CursoEmVídeo', 'SentaEAssiste'] },
    { id: 5, nome: 'Curso em Vídeo, HTML5 e CSS3, Módulo 5/5!!!', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Finalmente saiu o QUINTO módulo do melhor curso de front para iniciantes, pelo melhor professor do mundo. E a coisa já começa quente com Flexbox!', link: 'https://www.youtube.com/watch?v=rqvn_c2n9Eg&list=PLHz_AreHm4dn1bAtIJWFrugl5z2Ej_52d&ab_channel=CursoemV%C3%ADdeo', tags: ['HTML', 'CSS', 'Curso', 'Youtube', 'Guanabara', 'CursoEmVídeo', 'SentaEAssiste'] },
    { id: 17, nome: 'Cursinho de HTML e CSS, RBtech', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Cursinho antigo de HTML, mas ainda tem seu valor.', link: 'https://www.youtube.com/watch?v=iZ1ucWosOww', tags: ['HTML', 'Curso'] },
    { id: 18, nome: 'Curso Lógica de programação em VisualG, RBtech', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Curso de lógica em VisualG do RBtech', link: 'https://www.youtube.com/watch?v=Ds1n6aHchRU', tags: ['Curso', 'Lógica', 'VisualG'] },
    { id: 19, nome: 'Lucas Montano, do canal Lucas Montano ', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Baita canal do Lucas Montano, do canal Lucas Montano. Fala principalmente de carreira e desenvolvimento para dispositivos móveis e atualidades, mas muito mais também', link: 'https://www.youtube.com/@LucasMontano', tags: ['Variedades', 'CulturaDev', 'Mobile', 'Android', 'MuitaCoisa', 'Carreira'] },
    { id: 20, nome: 'Fabio Akita', imagem: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJ3M2V3eGs5eDF3d3h6aHgzdWhsODAwYXlzZTNjYnY1ZDJia3F0aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BTuoZOEfoqAQ8/giphy.gif', tipo: 'normal', categoria: 'Canal', descricao: 'Ciência da computação, tecnologia e puxões de orelha. Canal obrigatório, mesmo que não goste:', link: 'https://www.youtube.com/@Akitando', tags: ['Ciência da Computação', 'Tecnologia', 'Tudo', 'ManjaMuito', 'Obrigatório'] },
    { id: 21, nome: 'Filipe Deschamps', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Talvez o canal dev mais influente do Brasil. Mesmo que esteja em uma fase mais coach quântico, ainda tem seu valor.', link: 'https://www.youtube.com/@FilipeDeschamps', tags: ['Variedades', 'JS', 'Coach'] },
    { id: 22, nome: 'Gabriel Pato', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Ótimo canal sobre Segurança e Hacking', link: 'https://www.youtube.com/@GabrielPato', tags: ['Hacking', 'Segurança'] },
    { id: 23, nome: 'TecMundo', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Notícias do mundo da tecnologia, legal pra se manter atualizado', link: 'https://www.youtube.com/@tecmundo/featured', tags: ['Notícias', 'Tecnologia'] },
    { id: 24, nome: 'TecMundo - Playlist A história da Tecnologia', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Loucamente interessante saber de onde veio isso tudo aí que a gente brinca hoje.', link: 'https://www.youtube.com/playlist?list=PL7cCKVGMzqmbyaouQulXxUJLdwW4qBMpp', tags: ['História', 'Empresas', 'Tecnologias'] },
    { id: 25, nome: '8 jogos de CSS', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Artigo no dev.to apresentando 8 games pra aprender CSS brincandinho.', link: 'https://dev.to/devmount/8-games-to-learn-css-the-fun-way-4e0f', tags: ['Jogos', 'CSS', 'Aprender jogando'] },
    { id: 26, nome: 'Code Combat', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Baita plataforma para jogar aprendendo lógica, JavaScript, Python e muito mais...', link: 'https://codecombat.com/', tags: ['Curso', 'Game', 'Aprender jogando', 'JS', 'JavaScript', 'Python', 'Lógica'] },
    { id: 27, nome: 'spacecoding apresenta: 5 jogos para aprender programação', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Vídeo da Gi do spacecoding apresentando 5 jogos para aprender programação e afins.', link: 'https://www.instagram.com/p/CjbJmfSgG6X/', tags: ['Instagram', 'Aprender jogando', 'Jogos'] },
    { id: 12, nome: 'Futuro Dev - Jhon', imagem: '', tipo: 'normal', categoria: 'Canal', descricao: 'Em vez de um canal ensinando a programar, o que tu acha de um mostrando a história de alguém que tá na mesma que tu: aprendendo a programar!', link: 'https://www.youtube.com/@futuroDevJohn', tags: ['Iniciante', 'Carreira', 'Frontend', 'Backend', 'Choradeira'] },
    { id: 28, nome: 'code.clash: 3 free games to learn programming', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Vídeo no insta trazendo 3 games pra aprender programação.', link: 'https://www.instagram.com/p/Cg_0GgQjAna/', tags: ['Instagram', 'Aprender jogando', 'Jogos'] },
    { id: 29, nome: 'Fundação Bradesco', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Uma infinidade de cursos gratuitos sobre desenvolvimento', link: 'https://www.ev.org.br/areas-de-interesse/programacao', tags: ['Curso', 'Bradesco'] },
    { id: 30, nome: 'Rocketseat Discover', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'A amostra grátis da Rocketseat', link: 'https://www.rocketseat.com.br/discover?gclid=Cj0KCQjw2_OWBhDqARIsAAUNTTF4QGXDJwj_KJE-HxhSp_WKdUlF58ZFQ98TW8abc6vAOBvimKggUv4aAsgnEALw_wcB', tags: ['Curso', 'Rocketseat', 'Frontend', 'HTML', 'CSS', 'JS', 'Git', 'GitHub'] },
    { id: 31, nome: 'Dio', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Tem alguns cursos legais no plano gratuito. Te inscreve lá pra ver.', link: 'https://www.dio.me/', tags: ['Dio', 'Curso', 'AmostraGratis'] },
    { id: 32, nome: 'W3Schools', imagem: '', tipo: 'normal', categoria: 'Sites', descricao: 'Dá pra encarar como documentação (e curso) de várias linguagens de programação.', link: 'https://www.w3schools.com/', tags: ['HTML', 'JS', 'JavaScript', 'CSS', 'React', 'NodeJS', 'Java', 'Documentação', 'Curso', 'Tutorial', 'Exercícios'] },
    { id: 33, nome: 'MDN', imagem: '', tipo: 'normal', categoria: 'Sites', descricao: 'O velho testamento da programação. Pode assumir como a documentação nua e crua, impecável e implacável.', link: 'https://developer.mozilla.org/pt-BR/', tags: ['HTML', 'JS', 'JavaScript', 'CSS', 'Documentação', 'Curso', 'Tutorial', 'Exercícios'] },
    { id: 34, nome: 'MDN: Guia JavaScript', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O Guia de JavaScript preparado pela galera da Mozilla. Aprendizado garantido.', link: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide', tags: ['MDN', 'Mozilla', 'JS', 'JavaScript'] },
    { id: 35, nome: 'MDN: Aprendendo desenvolvimento web', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O cursão de frontend da Mozilla.', link: 'https://developer.mozilla.org/pt-BR/docs/Learn', tags: ['MDN', 'Mozilla', 'JS', 'JavaScript', 'HTML', 'CSS'] },
    { id: 36, nome: 'CSS Reference: A free visual guide to CSS', imagem: '', tipo: 'normal', categoria: 'Site', descricao: 'Baita referência para CSS. Simples, bonita, visual...', link: 'https://cssreference.io/', tags: ['CSS'] },
    { id: 37, nome: 'Minicurso grátis do Sujeito Programador', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Um minicurso oferecido pelo SujeitoProgramador com uma aula HTML, uma de CSS e uma de JS.', link: 'https://sujeitoprogramador.com/minicurso/?ref=D72629827B&hsrc=bWluaWN1cnNvcHJv', tags: ['Curso', 'HTML', 'CSS', 'JS', 'JavaScript', 'SujeitoProgramador', 'Juninho'] },
    { id: 38, nome: 'Curso Git e GitHub - Curso 100% Gratuito - Sujeito Programador', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Curso gratuito sobre Git e GitHub do Sujeito Programador.', link: 'https://sujeitoprogramador.com/curso-git/?ref=B12785145N', tags: ['Git', 'GitHub', 'SujeitoProgramador', 'Juninho'] },
    { id: 39, nome: 'Introdução a HTML/CSS na Khan Academy', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Ótimo curso de HTML e CSS', link: 'https://pt.khanacademy.org/computing/computer-programming/html-css#intro-to-html', tags: ['Frontend', 'HTML', 'CSS'] },
    { id: 40, nome: 'Um guia para iniciantes na área de web - Tableless', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Curso massa e muito completo contemplando o básico de web, HTML, CSS e JS. Tudo feito com carinho pela comunidade brasileira.', link: 'http://tableless.github.io/iniciantes/', tags: ['Web', 'HTML', 'CSS', 'JS', 'JavaScript', 'Frontend'] },
    { id: 41, nome: 'Cod3r', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Um monte de cursos massa, com vários importantes gratuitos pra gente aproveitar sem moderação.', link: 'https://www.cod3r.com.br/collections?category=cursos-gratuitos', tags: ['Curso', 'Amostra grátis'] },
    { id: 42, nome: 'Blog UX/UI', imagem: '', tipo: 'normal', categoria: 'Site', descricao: 'Blog criado pra caçar matrículas para um curso caro, mas tem muito material pra aprender sobre Interface de Usuário e Experiência de Usuário lá.', link: 'https://gabrielsilvestri.com.br/blog/', tags: ['UX/UI'] },
    { id: 43, nome: 'spacecoding: 1001 cursos online gratuitos de tecnologia no exterior', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Videozinho da Gi trazendo algumas possibilidades de estudar na gringa virtualmente', link: 'https://www.instagram.com/p/CjVR1RjAMx9/', tags: ['Curso', 'Instagram'] },
    { id: 44, nome: 'gui_dev_: 4 sites para aprender programação GRÁTIS', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'O cara mandou 4 sites pra aprender a zero real.', link: 'https://www.instagram.com/p/ChYAEbhPO_i/', tags: ['Curso', 'Instagram'] },
    { id: 45, nome: 'Tech Guide', imagem: '', tipo: 'normal', categoria: 'Carreira', descricao: 'Um guia da Alura que pretende mostrar o que você precisa aprender para ser um profissional "em T" nas mais diversas área da tecnologia.', link: 'https://techguide.sh/', tags: ['Profissional Em T', 'Alura', 'Guia de carreira', 'Roadmap', 'O que aprender', 'Onde aprender'] },
    { id: 46, nome: 'Roadmap.sh', imagem: '', tipo: 'normal', categoria: 'Carreira', descricao: 'O Roadmap original. A ideia é apresentar um mapa da sua jornada de aprendizado de uma carreira ou tecnologia. O mapa mostra onde tu vai chegar, o que tu precisa aprender e vai indicando diversos recursos pra te ensinar a cada etapa do teu desenvolvimento.', link: 'https://roadmap.sh/', tags: ['RoadMap', 'O que aprender', 'Onde aprender', 'Guia de carreira'] },
    { id: 47, nome: 'FreeFrontend', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Infinitos repositórios de lindos componentes (principalmente) CSS para usar nas suas criações.', link: 'https://freefrontend.com/', tags: ['CSS', 'HTML', 'Frontend', 'Componentes'] },
    { id: 48, nome: 'Pexels', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Fotos profissionais gratuitas', link: 'https://www.pexels.com/pt-br/', tags: ['Imagens', 'Galeria', 'Fotos'] },
    { id: 49, nome: 'Unsplash', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Fonte de recursos visuais da internet. Fornecidos por criadores de todo o mundo.', link: 'https://unsplash.com/pt-br', tags: ['Imagens', 'Galeria', 'Fotos'] },
    { id: 50, nome: 'Freepik', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Imagens grátis', link: 'https://br.freepik.com/', tags: ['Imagens', 'Galeria', 'Fotos'] },
    { id: 51, nome: 'Rawpixel', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Mais imagens grátis', link: 'https://www.rawpixel.com/?feed=creative-feed&page=1&sort=shuffle', tags: ['Imagens', 'Galeria', 'Fotos'] },
    { id: 52, nome: 'Pixabay', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Mais de 1 milhão de imagens, fotos e vídeos em alta qualidade para seus projetos.', link: 'https://pixabay.com/pt/', tags: ['Imagens', 'Galeria', 'Fotos'] },
    { id: 53, nome: 'Libreshot', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'I am Martin and you can download my photos for free.', link: 'https://libreshot.com/', tags: ['Imagens', 'Galeria', 'Fotos'] },
    { id: 54, nome: 'Icon Archive', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Over 800,000 free icons / 2,517 iconpacks. Without login, without subscription (ícones lindinhos)', link: 'https://iconarchive.com/', tags: ['Icons'] },
    { id: 55, nome: 'Favicon.cc', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Ferramenta para criar favicon', link: 'https://www.favicon.cc/', tags: ['Favicon', 'Gerador', 'Ferramenta'] },
    { id: 56, nome: 'Favicon.io', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Melhor ferramenta para criar favicon', link: 'https://favicon.io/', tags: ['Favicon', 'Gerador', 'Ferramenta'] },
    { id: 57, nome: 'lordicon', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Galeria de Ícones para usar em seus sites ou apps, ícones animados!', link: 'https://lordicon.com/', tags: ['Icons', 'React'] },
    { id: 58, nome: 'florinpop17: App ideas collection', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Quer praticar em algo real mas não sabe o que fazer? O florinpop17 resolve! Nesse repositório tu vai encontrar um monte de ideias para projetos reais. Tudo super completo, com requisitos, user histories e muito mais!', link: 'https://github.com/florinpop17/app-ideas', tags: ['Ideias', 'Projetos', 'Metodologia'] },
    { id: 59, nome: 'florinpop17: mais ideias curtas', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Ele foi desafiado a completar 10 projetos em uma hora :D', link: 'https://github.com/florinpop17/10-projects-1-hour', tags: ['Ideias', 'Projetos'] },
    { id: 60, nome: '3 projetos de nível iniciante que geram até $3000 por Mês', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Mais ideias pra projetos, desta vez com promessas de $$', link: 'https://www.youtube.com/watch?v=n3tMEOw9KGY', tags: ['Ideias', 'Projetos'] },
    { id: 61, nome: 'HTMLrev', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Galeria de templates de sites.', link: 'https://htmlrev.com/', tags: ['Templates', 'HTML', 'CSS', 'Bootstrap'] },
    { id: 62, nome: 'Flexplorer', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Um simulador de flexbox muito louco! (Na home tem mais coisa legal: https://bennettfeely.com/)', link: 'https://bennettfeely.com/flexplorer/', tags: ['Simulador', 'Flexbox', 'CSS'] },
    { id: 63, nome: 'Links sobre CSS', imagem: '', tipo: 'normal', categoria: 'Site', descricao: 'Um repositório (velho) cheio de links para recursos úteis relacionados ao CSS.', link: 'https://github.com/marcelabomfim/CSSEHFODA', tags: ['CSS'] },
    { id: 64, nome: '🌳🌳 FLEXBOX FROGGY', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Melhor maneira pra entender flexbox', link: 'https://flexboxfroggy.com/', tags: ['Jogos', 'CSS', 'flexbox'] },
    { id: 65, nome: 'Flexbox Defense', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Jogo estilo tower defense pra treinar flexbox. Muito bom!', link: 'http://www.flexboxdefense.com/', tags: ['Jogos', 'CSS', 'flexbox'] },
    { id: 66, nome: 'CSS Diner', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'Game pra treinar CSS e seletores.', link: 'https://flukeout.github.io/', tags: ['Jogos', 'CSS'] },
    { id: 67, nome: 'Grid Garden', imagem: '', tipo: 'normal', categoria: 'Jogos', descricao: 'O irmão grid do Flexbox Frog ', link: 'https://cssgridgarden.com/', tags: ['Jogos', 'CSS', 'Grid'] },
    { id: 68, nome: 'eBook Eloquent JavaScript', imagem: '', tipo: 'normal', categoria: 'Livros', descricao: 'Eloquent JavaScript (on line)', link: 'https://eloquentjavascript.net/', tags: ['Livro', 'eBook', 'JS', 'JavaScript'] },
    { id: 69, nome: 'eBook Eloquent JavaScript - Versão traduzida pt-br', imagem: '', tipo: 'normal', categoria: 'Livros', descricao: 'Eloquent JavaScript (on line)', link: 'https://github.com/braziljs/eloquente-javascript', tags: ['Livro', 'eBook', 'JS', 'BrazilJS', 'JavaScript'] },
    { id: 70, nome: 'Piskel', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Editor online de sprites animados e pixel art.', link: 'https://www.piskelapp.com/', tags: ['PixelArt', 'Imagens', 'Sprites'] },
    { id: 71, nome: 'Mixamo', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Criador de personagens 3d animados, para games, filmes ou seja lá o que tu imaginar...', link: 'https://www.mixamo.com/#/', tags: ['Sprites', 'Sprites3D'] },
    { id: 72, nome: 'VSCode online', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Um VSCode totalmente online pra usar quando for visitar a vó.', link: 'https://vscode.dev/', tags: ['IDE', 'VSCode'] },
    { id: 73, nome: 'GDB Online', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Editor e debugger online para um monte de linguagens novas e velhas.', link: 'https://www.onlinegdb.com/', tags: ['IDE'] },
    { id: 74, nome: 'replit', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Mistura marota de editor de códigos, IA e rede social.', link: 'https://replit.com/', tags: ['IDE'] },
    { id: 75, nome: 'Dcoder', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'IDE online muito legalzinha. Tem até desafios e exercícios. Tem app pra programar no celular, sincronizado com a conta da web.', link: 'https://code.dcoder.tech/', tags: ['IDE'] },
    { id: 76, nome: 'CODEPEN', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'The best place to build, test, and discover front-end code. CodePen is a social development environment for front-end designers and developers. Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.', link: 'https://codepen.io/', tags: ['IDE'] },
    { id: 77, nome: 'beecrowd', imagem: '', tipo: 'normal', categoria: 'Exercícios', descricao: 'Milhares de exercícios para praticar programação', link: 'https://www.beecrowd.com.br/', tags: ['Exercícios'] },
    { id: 78, nome: 'DevChallenge', imagem: '', tipo: 'normal', categoria: 'Exercícios', descricao: 'Um site de desafios para praticar Frontend, Backend, Mobile e Fullstack. Mais do que apenas exercícios', link: 'https://devchallenge-v2.vercel.app/', tags: ['Desafios', 'Comunidade', 'Projetos',] },
    { id: 79, nome: 'Dcoder Challenges', imagem: '', tipo: 'normal', categoria: 'Exercícios', descricao: 'Uma lista imensa de exercícios para praticar algoritmos clássicos. Estão divididos entre Fácil, Médio e Difícil.', link: 'https://code.dcoder.tech/challenges', tags: ['Exercícios', 'Dcoder', 'IDE'] },
    { id: 80, nome: 'HackerRank', imagem: '', tipo: 'normal', categoria: 'Exercícios', descricao: 'O mais conhecido dos sites de desafios de programação. Muito utilizado em entrevistas e, consequentemente, para praticar para elas também.', link: 'https://www.hackerrank.com/', tags: ['Exercícios'] },
    // { id: 81, nome: 'OsProgramadores/desafios', imagem: '', tipo: 'normal', categoria: 'Exercícios', descricao: 'Uma ótima lista de desafios bem complicadinhos...', link: 'https://osprogramadores.com/desafios/', tags: ['Exercícios'] },
    { id: 83, nome: 'StackOverflow', imagem: '', tipo: 'normal', categoria: 'Fóruns', descricao: 'A mãe dos programadores. Perdeu um pouco de relevância com o nascimento do chatGPT mas ainda é muito importante pra nós, principalmente nos problemas mais complexos.', link: 'https://stackoverflow.com/questions', tags: ['FullStackOverflow'] },
    { id: 84, nome: 'StackOverflow-pt', imagem: '', tipo: 'normal', categoria: 'Fóruns', descricao: 'O feudo em português da StackOverflow', link: 'https://pt.stackoverflow.com/', tags: ['FullStackOverflow'] },
    { id: 85, nome: 'GUJ', imagem: '', tipo: 'normal', categoria: 'Fóruns', descricao: 'Versão organizada e bonitinha da StackOverflow. Quase ninguém usa mais, mas todo o conhecimento que já foi compartilhado continua lá.', link: 'https://www.guj.com.br/', tags: ['Alura'] },
    { id: 86, nome: 'HipstersPontoTech', imagem: 'https://i.gifer.com/KwdQ.gif', tipo: 'normal', categoria: 'Podcasts', descricao: 'O  maior e mais badalado podcast de tecnologia do Brasil', link: 'https://hipsters.tech/', tags: ['Alura'] },
    { id: 87, nome: 'PodProgramar', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'Um dos melhores e feito somente por elas!', link: 'https://podprogramar.com.br/', tags: ['MulheresNaTecnologia'] },
    { id: 88, nome: 'devnaestrada', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'Galera gente boa e manja do que tá falando.', link: 'https://devnaestrada.com.br/', tags: ['PodcastDeGalera'] },
    { id: 89, nome: '<podTag/>', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'Muita coisa de carreira tech, principalmente no exterior. Mas muito mais que isso também. Depois do falecimento do plano free do heroku, o site saiu do ar. Vou deixar aqui o link do canal do Youtube, mas uma busca por podtag no google rapidamente leva a mais um monte de mídias.', link: 'https://www.youtube.com/@podtagpodcast5387/featured', tags: ['Carreira', 'DevNoExterior'] },
    { id: 90, nome: 'FalaDev da Rocketseat', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'A Rocketseat sempre traz conteúdo aprofundado e de qualidade.', link: 'https://open.spotify.com/show/3TNsKUGlP9YbV1pgy3ACrW', tags: ['Rocketseat'] },
    { id: 91, nome: 'QuebraDev', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'Um coletivo que tem como objetivo democratizar a informação para a periferia.', link: 'https://quebra.dev/', tags: ['DevDaQuebrada'] },
    { id: 92, nome: 'PodQuest', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'Um baita Podcast com uma galera muito forte da indústria mundial dos games. Falava de mercado, desenvolvimento, games... Acabou, mas seu legado continua lá e o servidor do discord continua ativo.', link: 'http://www.podquest.com.br/', tags: ['Games', 'GameDev', 'Discord'] },
    { id: 93, nome: 'Lambda-3 podcast', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'Podcast brabo!', link: 'https://www.lambda3.com.br/lambda3-podcast/', tags: ['TIVIT'] },
    { id: 94, nome: 'cabeça de lab', imagem: '', tipo: 'normal', categoria: 'Podcasts', descricao: 'O podcast do luizalabs. Super vale a pena conferir', link: 'https://www.cabecadelab.com.br/', tags: ['luizalabs', 'magalu'] },
    { id: 95, nome: 'Newsletter do Deschamps', imagem: '', tipo: 'normal', categoria: 'Balaio', descricao: 'Um belo compilado sobre tecnologia pra quem não tem tempo e/ou é preguiçoso mas tem consciência de que precisa se manter atualizado', link: 'https://filipedeschamps.com.br/newsletter', tags: ['Newsletter', 'Deschamps'] },
    { id: 96, nome: 'LIVE: Quando me tornei um Programador Profissional (A História de 16 Programadores)', imagem: '', tipo: 'normal', categoria: 'Balaio', descricao: 'Foi legal conhecer a história de vários dos programadores mais famosinhos da atualidade.', link: 'https://www.youtube.com/watch?v=eUwiTnK0EA0', tags: ['CDFTV', 'Alura', 'Cod3r', 'Akita', 'Loiane', 'LucasMontano', 'Balta', 'Branas', 'Attekita', 'NetoMarin'] },
    { id: 97, nome: 'UmÓtimo-artigo_sobre_ AsFormasMais- comuns_para-CombinarPalavras Em_programacao', imagem: '', tipo: 'normal', categoria: 'Balaio', descricao: 'Artigo apresentando as conveções de nomenclaturas mais comuns e suas principais aplicações.', link: 'https://visualdicas.blogspot.com/2021/05/quais-as-formas-mais-populares-para.html?fbclid=IwAR3A5IxqS3U_wZceDqjOpFVgFGlIAJCDKCNVbtgdpfXccZZl7U0LffOt8Js', tags: ['camelCase', 'PascalCase', 'snake_case', 'kebab-case'] },
    { id: 98, nome: 'perifacode/conteudo-gratuito', imagem: '', tipo: 'normal', categoria: 'Balaio', descricao: 'Um repositório no GitHub com o mesmo intuito desta página.', link: 'https://github.com/perifacode/conteudo-gratuito', tags: ['Cursos', 'Desafios', 'Dicas', 'Repositório'] },
    { id: 99, nome: 'Páginas/perfis/hashtags e afins interessantes aí pelas redes', imagem: '', tipo: 'normal', categoria: 'Redes Sociais', descricao: 'São vários então juntei estes links em uma página só. Vale a pena transformar suas redes em algo um pouco mais interessante do que fotos de pratos e pessoas com pouca roupa...', link: 'https://rafaellindemann.notion.site/P-ginas-perfis-hashtags-e-afins-interessantes-a-pelas-redes-2c2324b387cf40ddafc437fe331ad6cd?pvs=4', tags: ['Instagram'] },
    { id: 100, nome: 'tabnews', imagem: '', tipo: 'normal', categoria: 'Fóruns', descricao: 'Meio fórum de discussão, meio plataforma de artigos... ', link: 'https://www.tabnews.com.br/', tags: ['Fórum', 'Mídias', 'Deschamps'] },
    { id: 101, nome: 'dev.to', imagem: '', tipo: 'normal', categoria: 'Fóruns', descricao: 'Muito mais uma plataforma de divulgação de artigos na área de desenvolvimento do que um fórum, mas também dá pra enxergar o dev.to como um fórum :D', link: 'https://dev.to/', tags: ['Fórum', 'Mídias', 'Artigos', 'Discussão', 'Inglês', 'Português'] },
    { id: 103, nome: 'Repositório free-for-dev', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Mais ou menos 18 vidas são necessárias para só testar tudo que está listado lá: de hospedagem, ferramentas, softwares, plataformas, APIs, armazenamento... Tudo de GRÁTIS! ', link: 'https://github.com/ripienaar/free-for-dev', tags: ['Repositório', 'Ferramentas', 'Grátis', 'Free', 'MuitaCoisa'] },
    { id: 104, nome: 'Smart UI Studio', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Um site daqueles de influencers mostrando pequenas coisas de frontend pra te inspirar e abrilhantar teu projeto.', link: 'https://www.smartinfogl.com/', tags: ['Frontend', 'Tips', 'HTML', 'CSS', 'Dicas', 'Repositório', 'Animações'] },
    { id: 105, nome: 'shields.io', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Aqueles badgezinhos bunitinhos que a galera gosta de colocar no perfil do GitHub e nos repositórios de projetos.', link: 'https://shields.io/', tags: ['Badges', 'GitHub', 'Repositório'] },
    { id: 106, nome: 'Repositório: Badges4-README.md-Profile', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Uma seleção daqueles badgezinhos bunitinhos que a galera gosta de colocar no perfil do GitHub e nos repositórios de projetos.', link: 'https://github.com/alexandresanlim/Badges4-README.md-Profile', tags: ['Badges', 'GitHub', 'Repositório'] },
    { id: 107, nome: 'Wave - teste de acessibilidade', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Ajuda a encontrar problemas de acessibilidade em seu site.', link: 'https://wave.webaim.org/', tags: ['Acessibilidade', 'Teste'] },
    { id: 108, nome: 'Conversor de cores - HEX <-> RGB', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Converta as suas cores de rgb(223, 78, 57) para #DF4E39 rapidinho e sem tretas', link: 'https://www.rapidtables.com/convert/color/hex-to-rgb.html', tags: ['Cores', 'Design', 'Conversor', 'RGB', 'Hex'] },

    { id: 109, nome: 'Guia Extenso de Programação', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Quer aprender alguma coisa de tecnologia? Aqui tem praticamente tudo!', link: 'https://github.com/arthurspk/guiadevbrasil', tags: ['Repositório', 'Recursos', 'Aprender'] },
    { id: 110, nome: 'Brasil Code: Recursos gratuitos para criar sites', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Ótimo artigo em um ótimo blog. Tem muito mais coisa legal lá, vale a pena conferir!', link: 'https://www.brasilcode.com.br/melhores-recursos-gratuitos-para-criar-sites/', tags: ['Ferramentas', 'Recursos', 'Aprender', 'Grátis', 'Frontend'] },
    { id: 111, nome: 'Blog do Sujeito Programador', imagem: '', tipo: 'normal', categoria: 'Sites', descricao: 'Muita coisa boa no blog do Sujeito, principalmente sobre carreira', link: 'https://sujeitoprogramador.com/', tags: ['Blog', 'SujeitoProgramador', 'Carreira'] },
    { id: 112, nome: 'Discord da Comunidade He4rt Developers', imagem: '', tipo: 'normal', categoria: 'Redes Sociais', descricao: 'Se tu for obrigado a escolher uma única comunidade pra participar, fecha o olho e vai nessa. Confia...', link: 'https://discord.gg/uEayTyjd', tags: ['RedesSociais', 'Comunidade', 'Discord'] },
    { id: 113, nome: 'javascript.info', imagem: '', tipo: 'normal', categoria: 'Site', descricao: 'Um tutorial/guia bem interessante, completo e dinâmico para o JavaScript', link: 'https://javascript.info/', tags: ['JS', 'Documentação', 'Tutorial'] },
    { id: 114, nome: 'Render: Cloud Application Hosting for Developers', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Host de back end com delicioso free tier', link: 'https://render.com/', tags: ['Host', 'Provedor', 'Backend'] },
    { id: 115, nome: 'Microsoft Learn', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Central de cursos gratuitos da Microsoft. Muita coisa sobre (principalmente, mas não só) C#, Azure, IA, BI, GitHub...', link: 'https://learn.microsoft.com/pt-br/training/?fbclid=IwAR0eu1oD2pFDhq5f0MIZ2MjXFyUdc2W9vMJsQTBogQt3p0bAozoDtJomFLk', tags: ['C#', 'Azure', 'IA', 'BI', 'GitHub', 'Microsoft'] },
    { id: 116, nome: 'eu CAPACITO', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Seleção de cursos gratuitos de tecnologia oferecidos por aí.', link: 'https://www.eucapacito.com.br/todos-os-cursos/', tags: ['euCAPACITO', 'Cursos', 'IBM', 'Google', 'FIAP', 'Microsoft', 'Cisco', 'Oracle'] },
    { id: 117, nome: 'FontAwesome', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Ícones para usar no front', link: 'https://fontawesome.com/icons', tags: ['Icons', 'Ícones'] },
    { id: 118, nome: '🌳 storyset', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Um repositório de imagens muito legal. Lá dá pra escolher imagens com um mesmo estilo pra enfeitar teu projeto. Dá pra customizar um monte de coisas nelas também.', link: 'https://storyset.com/', tags: ['Imagens', 'Repositório', 'SVG', 'PNG',] },
    { id: 119, nome: 'Iconbuddy', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Meio repositório de Icons, meio ferramenta de busca e edição. Super vale a pena conferir... ', link: 'https://iconbuddy.app/', tags: ['Icons', 'Repositório', 'Icon', 'Imagens'] },
    { id: 120, nome: 'Prompt Engineering Guide', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Ótimo curso de propting de IA para desenvolvedores. Em inglês, mas tu pode traduzir com IA :P.', link: 'https://learnprompting.org/docs/intro', tags: ['IA', 'Prompt', 'InteligenciaArtificial'] },
    { id: 121, nome: 'Neumorphism.io', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Gerador de CSSs maneiros e supimpas!', link: 'https://neumorphism.io/#e0e0e0', tags: ['Frontend', 'CSS', 'Ferramentas', 'Repositórios', 'Gerador'] },
    { id: 122, nome: '🌳 Iconify', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Repositório de Ícones, simplão e completão e super organizado.', link: 'https://icon-sets.iconify.design/', tags: ['Icons', 'Repositório', 'Icon', 'Imagens'] },
    { id: 123, nome: 'Flexbox Guia Completo - Origamid', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Tutorial/ferramenta de simulação sobre Flexbox da afamada Origamid', link: 'https://origamid.com/projetos/flexbox-guia-completo/', tags: ['Ferramenta', 'Tutorial', 'Frontend', 'CSS'] },
    { id: 124, nome: 'Grid layout Guia Completo - Origamid', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Tutorial/ferramenta de simulação sobre Grid CSS da afamada Origamid', link: 'https://www.origamid.com/projetos/css-grid-layout-guia-completo/', tags: ['Ferramenta', 'Tutorial', 'Frontend', 'CSS'] },
    { id: 125, nome: 'JS antes do framework - Origamid', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Excelente playlist com revisão de 10 ítens de JS', link: 'https://www.youtube.com/watch?v=j6iSONAO6sQ&list=PL9rc_FjKlX39T78CUANwmdta_d1CgUtMt&ab_channel=Origamid', tags: ['Curso', 'Origamid', 'Frontend', 'JS', 'Revisão'] },
    { id: 126, nome: ' Cheatsheets da codecademy', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Enorme e organizada coleção das famosas Cheatsheets, mas num nível mais macro, quase um bebê de uma cheatsheet com um roadmap com alguns traços do vizinho tutorial', link: 'https://www.codecademy.com/resources/cheatsheets/all', tags: ['Ferramenta', 'cheatsheet', 'codecademy'] },
    { id: 127, nome: 'Awesome Cheatsheets', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Cheatsheets simples e poderosas, hospedadas no GitHub', link: 'https://lecoupa.github.io/awesome-cheatsheets/', tags: ['Ferramenta', 'cheatsheet'] },
    { id: 128, nome: ' Devhints Cheatsheets', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'A mais oldshool das coleções de cheatsheets, super completa e pormenorizada. Acho a ferramenta de pesquisa deles muito confusa, mas um ctrl+f resolve qualquer coisa.', link: 'https://devhints.io/', tags: ['Ferramenta', 'cheatsheet'] },
    { id: 129, nome: '🌳 VS Code Cheatsheets', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Cheatsheet de atalhos de teclado do VS Code', link: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf', tags: ['Ferramenta', 'cheatsheet', 'VSCode'] },
    { id: 130, nome: 'javascriptcheatsheet.org', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Se apresenta como cheatsheet do Javascript, mas eu colocaria tranquilamente como livro ou curso de tão completo e bem feito', link: 'https://www.javascriptcheatsheet.org/', tags: ['Ferramenta', 'cheatsheet', 'curso'] },
    { id: 131, nome: 'project-based-learning', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Repositório com uma coleção gigante de projetos guiados em dezenas de linguagens diferentes.', link: 'https://github.com/practical-tutorials/project-based-learning', tags: ['repositório', 'projetos', 'praticar'] },
    { id: 132, nome: 'uiverse.io', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Repositório de elementos (botão, input, card...) para abrilhantar qualquer frontend.', link: 'https://uiverse.io/', tags: ['repositório', 'elementos', 'frontend'] },
    { id: 133, nome: 'ui-snippets', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Mais um repositório de elementos (botão, input, card...) para abrilhantar qualquer frontend.', link: 'https://app.ui-snippets.com/', tags: ['repositório', 'elementos', 'frontend'] },
    { id: 134, nome: '🌳 Coolors', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Paletas de cores (gerador, seletor, extrator), testador de contraste, gradientes...', link: 'https://coolors.co/', tags: ['Ferramenta', 'cores', 'design', 'paletaDeCores'] },
    { id: 135, nome: 'freesets', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Uma versão mais curta, visual e bonita deste progHub. Tem muita ferramenta legal lá, vale a pena a visita!', link: 'https://freesets.dev/', tags: ['repositório', 'elementos', 'frontend', 'links', 'copiaDoProgHub'] },
    { id: 136, nome: '🌳 App Algoritmos', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Incrível simulador de algoritmos para android. Perfeito para entender como os algoritmos mais comuns funcionam!', link: 'https://play.google.com/store/apps/details?id=wiki.algorithm.algorithms', tags: ['Ferramenta', 'algoritmos', 'testeDeMesa', 'simulacao'] },
    { id: 137, nome: '🌳 VisuAlgo.net', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Incrível simulador de algoritmos para android. Perfeito para entender como os algoritmos mais comuns funcionam!', link: 'https://visualgo.net/en', tags: ['Ferramenta', 'algoritmos', 'testeDeMesa', 'simulacao'] },
    { id: 138, nome: 'Raycast Icon Maker', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Ferramenta muito legal para personalizar ícones.', link: 'https://ray.so/icon', tags: ['Icons', 'Repositório', 'Icon', 'Imagens', 'ferramenta', 'editor'] },
    { id: 139, nome: 'Pattern Monster', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Ótima ferramenta para criar padrões possivelmente bonitos para usar como background. Aprecie muito, mas com cuidado!', link: 'pattern.monster', tags: ['Ferramenta', 'Patterns', 'Background', 'Imagens'] },
    { id: 142, nome: 'Curso Lógica com Javascript - Serliv', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Playlist do Curso de Lógica de Programação com Javascript do canal Serliv', link: 'https://www.youtube.com/watch?v=lxb567HEn8k&list=PL1dUY2RYa2RidB3B134ywckDyf-FOwbv7&ab_channel=Serliv', tags: ['Lógica', 'Javascript', 'JS', 'Iniciante', 'Juninho', 'Reforço', 'Playlist'] },
    { id: 143, nome: 'Pensar Cursos', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Mais de 2k cursos online gratuitos e com possibilidade de certificado. Tem desde lógica de programação, passando por HTML, CSS e Javascript, React e, para os fortes, Java! Fora da área tec também tem muita coisa, inclusive idiomas. Vale a pena conferir', link: 'https://www.pensarcursos.com.br/', tags: ['CursosGratuitos', 'Lógica', 'Javascript', 'JS', 'React', 'Reforço', 'Java', 'BancoDeDados', 'MuitaCoisa'] },
    { id: 144, nome: 'Coursera', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Coursera é utilizado por muitas empresas para disponibilizar cursos para a comunidade. Este link mostra filtrados por gratuitos/computação/pt-BR, mas tem muito mais coisa por lá...', link: 'https://www.coursera.org/search?query=free%2Fl%C3%B3gica&topic=Computer%20Science&language=Portuguese%20%28Brazil%29&sortBy=BEST_MATCH', tags: ['CursosGratuitos', 'Lógica', 'Javascript', 'JS', 'React', 'Reforço', 'Java', 'BancoDeDados', 'MuitaCoisa', 'IA'] },
    { id: 146, nome: 'Geralzão de Git/GitHub', imagem: '', tipo: 'normal', categoria: 'Da Casa', descricao: 'Documento índice com meus materiais a respeito de Git/GitHub, versionamento e tals...', link: 'https://rafaellindemann.notion.site/Git-GitHub-19dd393ff68e8096b69ce12ca44d4f7f?pvs=4', tags: ['Git', 'GitHub', 'Colaboração', 'Versionamento', 'MaterialDoRafa'] },
    { id: 147, nome: 'Geralzão de Lógica e frontend', imagem: '', tipo: 'normal', categoria: 'Da Casa', descricao: 'Documento índice com meus materiais a respeito de Lógica de programação e frontend vanilla', link: 'https://rafaellindemann.notion.site/L-gica-e-frontend-vanilla-2d626512d4e849c88aa12597d8f2872c?pvs=4', tags: ['Lógica', 'JS', 'HTML', 'CSS', 'portugol', 'MaterialDoRafa'] },
    { id: 148, nome: 'Repo nasRedes', imagem: '', tipo: 'normal', categoria: 'Redes Sociais', descricao: 'Repositório onde salvo coisas legais que achei aí pelas redes sociais. Cada link é uma issue no repositório então explora lá que tem muita coisa supimpa!', link: 'https://github.com/rafaellindemann/nasRedes/issues', tags: ['Instagram', 'TikTok', 'Dev.to', 'Threads', 'Sociais', 'LinkedIn'] },
    { id: 149, nome: 'Pesquisa ACATE 2025', imagem: '', tipo: 'normal', categoria: 'Carreira', descricao: '4º Mapeamento de demandas e perfil de talentos para o setor de tecnologia em Santa Catarina', link: 'https://sc.acate.com.br/mapeamento-tecnologia-sc-2025', tags: ['Pesquisa', 'Mercado', 'Tecnologias', 'Emprego', 'Oportunidades', 'Soft Skills', 'Acate', 'Sebrae'] },
    { id: 155, nome: 'Geralzão de React', imagem: 'https://i.gifer.com/JXA0.gif', tipo: 'normal', categoria: 'Da Casa', descricao: 'Documento índice com meus materiais sobre React JS', link: 'https://rafaellindemann.notion.site/React-JS-e4cf31e0fc1e465190610e0c440571b2', tags: ['React', 'JS', 'CSS', 'MaterialDoRafa'] },
    { id: 156, nome: 'Geralzão de Node e Banco de dados', imagem: '', tipo: 'normal', categoria: 'Da Casa', descricao: 'Documento índice com meus materiais sobre Node JS e um pouco de banco de dados PostgreSQL também', link: 'https://rafaellindemann.notion.site/Banco-de-Dados-e-NodeJS-883a4ad5f9f449bbabd176ad53ff48c2', tags: ['Node', 'BD', 'PostgreSQL', 'MaterialDoRafa'] },
    { id: 157, nome: 'PESQUISA DO CÓDIGO FONTE TV 2025', imagem: '', tipo: 'normal', categoria: 'Carreira', descricao: 'O Canal Código Fonte TV tem feito todos os anos uma pesquisa entre os devs pra mapear o mercado. Taí tua chance de participar! As edições anteriores estão lá pra consultar também. Botei o link do vídeo que explica a parada, se quiser ir direto pra pesquisa pega este: https://pesquisa.codigofonte.com.br ', link: 'https://www.youtube.com/watch?v=Fb9D2cIcMMc&ab_channel=C%C3%B3digoFonteTV', tags: ['Pesquisa', 'Carreira', 'CDF TV'] },
    { id: 158, nome: '500 recursos e ferramentas gratuitas - IG', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Post do @codewithnikhill no instagram listando 500 recursos gratuitos pra devs', link: 'https://www.instagram.com/p/DE40CNaPhb6/?img_index=5&igsh=eXFpM2ZtcjNxaTky', tags: ['Insta', 'Cursos', 'Exercícios', 'Ferramentas', 'Cheatsheets', 'Imagens', 'Design', 'Chrome', 'VS Code', 'Carreira', 'Games', 'libs'] },
    { id: 159, nome: 'Curso/playlist de React Hora de Codar', imagem: '', tipo: 'normal', categoria: 'Curso', descricao: 'Curso/playlist free do Matheus Battisti - Hora de Codar sobre React JS, tem coisa antiga mas tem muita coisa boa!', link: 'https://www.youtube.com/playlist?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO', tags: ['React', 'Hora de Codar'] },
    { id: 160, nome: 'Repo react4noobs da he4rt', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Documentos e tutoriais criados no repositório react4noobs da comunidade he4rt ', link: 'https://github.com/he4rt/react4noobs/tree/master/docs', tags: ['React', 'he4rt', 'Comunidade'] },
    { id: 161, nome: 'Chuva de vagas de trampo', imagem: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGl1Zmt2bDh4azFvMWlkbDVvYmpoaWViMmdheHYwcHoyZ21vOHJzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/69EjftQol6uErqVZc7/giphy.gif', tipo: 'normal', categoria: 'Vagas', descricao: 'Listinha de vagas de trampo que eu encontro por aí. Tem também muita coisa sobre onde encontrar vagas, freelas, experiência, conselhos e mais vagas', link: 'https://rafaellindemann.notion.site/Vagas-ec299aa10e3d4ee497f9386a0f060f6a?pvs=4', tags: ['Vagas', 'Trampo', 'Discord', 'LinkedIn', 'Carreira', 'Freelas', 'Experiência'] },
    { id: 162, nome: 'Eventos Tech em Floripa', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Calendário de eventos tech, de inovação e empreendedorismo que acontecem na Ilha do Silício', link: 'https://tech.floripa.br/', tags: ['Eventos', 'Tech', 'Inovação', 'Empreendedorismo', 'Networking'] },
    { id: 163, nome: 'Undraw', imagem: '', tipo: 'normal', categoria: 'Imagens', descricao: 'Estilo o StorySet com imagens svg customizáveis, mas também tem uns ícones tipo handmade e outras ferramentinhas...', link: 'https://undraw.co/illustrations', tags: ['Ferramentas', 'Desenhos', 'Ícones', 'SVG'] },
    { id: 164, nome: 'CWE (Common Weakness Emunaration)', imagem: '', tipo: 'normal', categoria: 'Site', descricao: 'Biblioteca (em inlês) de fraquesas de software e problemas comuns de cybersegurança', link: 'https://cwe.mitre.org/index.html', tags: ['Documentação', 'Cybersegurança'] },
    { id: 165, nome: 'devChallenges', imagem: 'https://i.gifer.com/EQv3.gif', tipo: 'normal', categoria: 'Exercícios', descricao: 'Uma coleção de projetos propostos com descrição completa, requisitos, user stories, detalhes técnicos... Toda a descrição do que tu tem que fazer como se tivesse um cliente de verdade e quase um arquiteto de software projetando pra tu programar! Tem até tutoriais das coisas que tu vai precisar pra implementar {em inglês}', link: 'https://devchallenges.io/projects/front-end', tags: ['Desafios', 'Projetos', 'FullStack', 'Frontend', 'HTML', 'CSS', 'Javascript'] },
    { id: 166, nome: 'Owasp', imagem: '', tipo: 'normal', categoria: 'Sites', descricao: 'Um site que lista as vulnerabilidades cibernéticas mais comuns atualmente', link: 'https://owasp.org/Top10/', tags: ['Documentação', 'Cybersegurança'] },
    { id: 167, nome: 'Hackerone', imagem: '', tipo: 'normal', categoria: 'Carreira', descricao: 'Site onde se pode achar empregos relacionados a cibersegurança e hacking de dados', link: 'https://www.hackerone.com/', tags: ['Cybersegurança', 'Carreira', 'Mercado', 'Emprego'] },
    { id: 168, nome: 'Codecademy', imagem: '', tipo: 'normal', categoria: 'Sites', descricao: 'Um site onde se aprende a programar de forma prática, dividida em módulos, cursos e treinamentos', link: 'https://www.codecademy.com/', tags: ['Documentação', 'Cursos', 'Aprendizagem', 'Programação'] },
    { id: 169, nome: 'GitZip for github', imagem: '', tipo: 'normal', categoria: 'Ferramentas', descricao: 'Sabe quando tu quer baixar um arquivo ou pasta de um repositório, mas o GitHub te obriga a baixar o repo inteiro? Então, esta extensão para o Chrome te dá a liberdade de escolher o que tu quiser baixar ou não. Super simples de usar, basta marcar o checkbox do que deve ser baixado e clicar no botão de download que vai aparecer. 🏅', link: 'https://chromewebstore.google.com/detail/gitzip-for-github/ffabmkklhbepgcgfonabamgnfafbdlkn?utm_source=ext_app_menu', tags: ['Chrome', 'GitHub'] },
    { id: 170, nome: 'Free-for.dev', imagem: '', tipo: 'normal', categoria: 'Repositórios', descricao: 'Mais um daqueles compiladões que coisas gratuitas que nos copiaram :P Ele pode ser muito útil na hora de procurar onde hospedar sua coisa, achar uma API pra consultar coisa... (Foco em DevOps)', link: 'https://free-for.dev/#/', tags: ['Coisas gratuitas', 'DevOps', 'Hospedagens'] },
    { id: 171, nome: 'IG: Vitor Lostada', imagem: '', tipo: 'normal', categoria: 'Redes Sociais', descricao: 'O Vitor é dev Frontend Senior e compartilha muita coisa sobre a área, carreira e rotina de um dev mágico. Ele faz umas palestras muito massa também. Não deixa de conferir as outras plataformas listadas no linktree dele. Ele foi meu aluno e eu sou fã dele :D ', link: 'https://www.instagram.com/vitor.lostada/', tags: ['Frontend', 'Carreira'] },
    { id: 172, nome: 'IG: Paulinho Prado', imagem: '', tipo: 'normal', categoria: 'Redes Sociais', descricao: 'O Paulinho é demais. Meu colega de profissão e casa, Software Engineer na Globo.com e é um fofo de tão legal. Ele tá fazendo conteúdo SUPER legal no instagram. Confere lá!!', link: 'https://www.instagram.com/paulinhoprado.dev/', tags: ['Frontend', 'Boas práticas', 'Algoritmos'] },
    { id: 173, nome: 'IG: rammcodes', imagem: '', tipo: 'normal', categoria: 'Redes Sociais', descricao: 'Eu não consigo imaginar de onde esse cara doido tira tanta coisa legal pra indicar o dia inteiro!!! Sem bait, sem migué, só coisa massa mesmo, principalmente ferramentas úteis pra devs e libs frontend.', link: 'https://www.instagram.com/rammcodes_/?g=5', tags: ['Frontend', 'Ferramentas', 'India!!'] },


    // EVENTOS
    // { id: 1145, nome: 'Desafio DevOps & Cloud | 3ª edição #05 - 18 a 23 de março/2025', imagem: '', tipo: 'destaque', categoria: 'Eventos', descricao: 'Imersão de DevOps, com WSL, Docker, CI/CD e muito mais...', link: 'https://rafaellindemann.notion.site/Desafio-DevOps-Cloud-3-edi-o-05-1b4d393ff68e80ad94a3d99a883d2c23?pvs=4', tags: ['Eventos', 'DevOps', 'Docker', 'Portfólio'] },
    // { id: 1151, nome: 'Workshop Gratuito | Agentes de IA na Prática - 20/3/25', imagem: '', tipo: 'destaque', categoria: 'Eventos', descricao: 'Do Zero à Integração com Langflow e Python, da Trybe', link: 'https://betrybe.com/programacao/workshop-gratuito-agentes-ia-langflow-python?utm_term=&utm_campaign=Leads+Workshop+Langflow&utm_source=adwords&utm_medium=ppc&hsa_acc=1466424558&hsa_cam=22308286947&hsa_grp=&hsa_ad=&hsa_src=&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjw1um-BhDtARIsABjU5x7vi2DLgnG3zhmapeKQQwB7Qj782zyqAmbJS1ZX1VG_VISqANQ2vTwaAhxJEALw_wcB', tags: ['Eventos', 'IA', 'Python', 'Portfólio'] },
    // { id: 1154, nome: 'Multicloud DevOps & AI - 24 A 28 DE MARÇO/25', imagem: '', tipo: 'destaque', categoria: 'Eventos', descricao: 'Desafio de 5 dias para descobrir como dominar AWS, Microsoft Azure, Google Cloud, DevOps, Terraform, Docker, Kubernetes, Inteligência Artificial, dentre outras', link: 'https://thecloudbootcamp.com/pt/pc-mdac/?utm_source=google-pmax&utm_campaign_id=22159381432&utm_medium_id=6548321865&utm_content_id=&gc_id=22159381432&g_special_campaign=true&gad_source=1&gclid=Cj0KCQjwhMq-BhCFARIsAGvo0KcUlLEvO-d-kNtkgwOgbS3tu00IYOBjosx1cz6ZXfW7GxuFt13b2NMaAuIHEALw_wcB', tags: ['Eventos', 'Imersão', 'AWS', 'IA', 'Docker', 'Azure', 'GCP'] },
    // { id: 1150, nome: 'EBAC Workshop: Full Stack com Java - 25 e 26 de março de 2025', imagem: '', tipo: 'destaque', categoria: 'Eventos', descricao: 'Imersão de dois dias da EBAC focada em Spring', link: 'https://rafaellindemann.notion.site/Desafio-DevOps-Cloud-3-edi-o-05-1b4d393ff68e80ad94a3d99a883d2c23?pvs=4', tags: ['Eventos', 'Java', 'Spring', 'Full Stack', 'Portfólio'] },
    // { id: 1152, nome: 'imersão dev - Alura - 31 de março a 04 de abril / 2025', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'A tradicional imersão para iniciantes da Alura, desta vez parece que será pra construir joguinhos em JS!', link: 'https://imersao.dev/?utm_source=google&utm_medium=cpc&utm_campaign=imersao-dev-9_inscricoes&utm_term=rmkt-alura-verso&utm_content=ad12-imagem-ugly-ads&utm_term=&utm_campaign=&utm_source=google&utm_medium=cpc&utm_id=22314860525_176941019918_737285739579&hsa_acc=1780349768&hsa_cam=&hsa_grp=176941019918&hsa_ad=737285739579&hsa_src=&hsa_tgt=aud-1636998483065&hsa_kw=&hsa_mt=&hsa_net=google&hsa_ver=3&gad_source=1&gclid=Cj0KCQjws-S-BhD2ARIsALssG0Zbpd9kRMQdaSjmVdRXDpwZYAJNZvT1pVj6gLiWSHWJ9Ce8k3h_ES0aAjBdEALw_wcB', tags: ['Eventos', 'Imersão', 'Alura', 'Frontend', 'Juninho', 'Portfólio'] },
    // { id: 1153, nome: 'BOOTCAMP IMERSÃO AWS - 31/03 à 06/04', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Primeiros passos usando AWS com um projeto real e 100% prático', link: 'https://pages.formacaoaws.com.br/bootcamp-imersao-aws-ga-fr-form/?%7Blpurl%7D?utm_source=google-ads&utm_campaign=22328999192&utm_medium=&utm_term=&creative=&device=m&placement=&utm_term=FRIO&gad_source=1&gclid=Cj0KCQjwkN--BhDkARIsAD_mnIqx2vMf4Ic_Ky66bNFPZdSQzKwO44sY55SzFptz4QLSznMg_9D0eqoaAgR7EALw_wcB', tags: ['Eventos', 'Imersão', 'AWS',] },
    // { id: 1155, nome: 'EBAC: Jornada UX edição #4 - 1 a 8 abril de 2025', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Imersão de UX pela EBAC', link: 'https://ebaconline.com.br/webinars/product-jornada-2025-04-01-02-03-04-05-06-07-08?utm_source=facebook&utm_medium=cpc&utm_campaign=workshop_2981_ux-immersion-2025-04-01-08_fb_interest_all_all&utm_content=c_120218674133890263%7Cadg_120218674134140263%7Cad_120218674826240263%7Ccname_%5BPPTCH%5D%20%5BGAB%5D%20UX%20Design%20%7C%20Free%20event%20%7C%202981%20%7C%2001-08.04.2025%20%7C%20Cross%20Price%7Cadgname_ux%7Call%7Cwebinar%7Cwebdesign%7Cgoal%7Cadname_ux%7Cimg%7Call%7C3%7Cinnovative%7Cprice%7Cplace_Instagram_Feed&fbclid=PAZXh0bgNhZW0BMABhZGlkAasaP3saQbcBpknCS5wVDu09OnkPwdNjS8lAhPW4SQ7U-7GP-bENcocKztLv_-O-Fe6D5g_aem_V5MBgjhodLyrBxwYcNGb8g', tags: ['Eventos', 'Imersão', 'UX'] },
    // { id: 1156, nome: 'Jornada Python da Hashtag - 07 a 10 de Abril/2025', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: '4 dias, 4 Projetos Completos e Passo a Passo: Análise de Dados, Automação, Criação de Sites e Inteligência Artificial', link: 'https://lp.hashtagtreinamentos.com/inscricao-intensivao-de-python-display?conversion=lcto-lpy22-abr25&origemurl=176073294683&origemads=739474250590&utm_source=google-ads&utm_campaign=22334257362&utm_medium=176073294683&utm_content=739474250590&utm_term=%7Bkey%20word%7D&gad_source=1&gclid=Cj0KCQjwqIm_BhDnARIsAKBYcmtuENDvv-bz-7KCm1beos9hfTDm8BPDbA6TKYZ8mF_i2QSbDNnRv4kaAktMEALw_wcB', tags: ['Eventos', 'Imersão', 'Python', 'Dados', 'Automação'] },
    // { id: 1157, nome: 'Web3 Week - LuizTools - 7 a 13/4/25', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Aprenda em uma semana como programar aplicações para blockchain do zero', link: 'https://www.luiztools.com.br/w3w.html?utm_source=fb&utm_medium=social&utm_campaign=Web3+Week+06&utm_content=Programadores+Feed&utm_term=Imagem+Tweet&fbclid=IwZXh0bgNhZW0BMABhZGlkAasZhkqUiLoBHY9jF7v5wql_VUU140xNhnL7HjoA1smrbXbjAlYjWD6-_IpDSul_A2rohg_aem__Hnjmj0Vq7tUf0sSQ2NFxQ&sfnsn=wiwspmo', tags: ['Imersão', 'Blockchain', 'Web3', 'Automação'] },
    // { id: 1158, nome: 'Gestor de Automações com Nocode e IA - OneBitCode - 7/4/25', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Evento gratuito e ao vivo: Aprenda a criar automações poderosas com NOCODE e IA', link: 'https://gestor.onebitcode.com/v2?utm_source=MetaAds&utm_medium=1-%5BVisitSite180D%5D+LP2&utm_campaign=%5BSales%5D%5BEventoNoCode%5D&utm_content=ad+eventonocode4+LP2&fbclid=IwY2xjawJQ2opleHRuA2FlbQEwAGFkaWQBqxnqgTjhvwEd-sEs0MTpeyPKK2JI4U7KwEzHpaFCNhZ2_trRyNIeb7m7iRw9PvNg1iy1_aem_IvUuY2bSg4gOSJUOI5HxBQ', tags: ['Imersão', 'Nocode', 'IA', 'Automação'] },
    // { id: 1159, nome: 'Webinar de Observabilidade - Datadog - 9/4/25', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Crie experiências digitais perfeitas com monitoramento de ponta a ponta', link: 'https://www.datadoghq.com/pt/dg/webinars/uxdem-pt-2025/?utm_source=facebook&utm_medium=paid-social&utm_campaign=dg-dem-latam-webinar-pt-202504-uxdemwebinarmeta-rt&utm_content=0425webinaruxdemptmintgreencubesplitillustrationimg&utm_id=120220476822010092_v2_s06&utm_term=120220476821860092&fbclid=PAZXh0bgNhZW0BMABhZGlkAasb4y2pqgwBpkvKjpex3p0_9e9AgmbUgOC_NNSssRwY_DqWxMEgUbjZvK3zr0-OvB0Daw_aem_Phr-wADMp69jqpCFYXtphg', tags: ['Imersão', 'Observabilidade'] },
    { id: 1160, nome: 'Jornada Full Stack, Hashtag, 5 a 8/5/25', imagem: '', tipo: 'destaque', categoria: 'Eventos', descricao: 'Aprenda React, Javascript, Node, HTML, CSS, MongoDB e muito mais', link: 'https://lp.hashtagtreinamentos.com/full-stack/jornada/inscricao?fonte=igfb-25&origemurl=%7B%7Badset.id%7D%7D&origemads=%7B%7Bad.id%7D%7D&utm_source=facebook-ads&utm_medium=%7B%7Badset.name%7D%7D&utm_campaign=%7B%7Bcampaign.name%7D%7D&utm_content=%7B%7Bad.name%7D%7D&conversion=lcto-lfs02-mai25&fbclid=IwY2xjawJ0YB5leHRuA2FlbQIxMQABHvCQ4alniBDhKa72HEctRtkQIalLL60b9RWp66DlZ-Zs68vG4NaHFeSvUnrd_aem_tmauyLQ1MylIm1I8HpGx8g&curso=fullstack&sfnsn=wiwspmo', tags: ['Full Stack', 'React', 'Javascript', 'Node', 'HTML', 'CSS', 'MongoDB', 'Hashtag'] },
    { id: 1161, nome: 'Imersão IA, Alura+Google, 12 a 16/5/25', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'A Alura e o Google se uniram para te ajudar a impulsionar sua carreira com o Gemini na prática. Em 5 aulas gratuitas, você vai aprender a construir prompts poderosos, automatizar tarefas e criar um sistema com agentes que atuam de forma autônoma.', link: 'https://www.alura.com.br/imersao-ia-google-gemini-ii?utm_source=facebook&utm_medium=cpc&utm_campaign=imersao-ia-google-gemini-ii_inscricoes&utm_content=ad13-imagem-lote3-arte2-noticia-v2-b&utm_term=visitantes-site-alura-180d&utm_id=120222538610120357_120222546494580357_120222810621640357&fbclid=PAZXh0bgNhZW0BMABhZGlkAaseAnTvCKUBp7bzHZ-JVabnueiaXNwUxfKZ3_NwKwDyVzinbp6OMi1batM6guJ1OQgxeBaD_aem_ZzYG1edStxsURE8-_BP-mw', tags: ['Imersão', 'Alura', 'Google', 'Gemini'] },
    { id: 1162, nome: 'Impacta Tech Summit, 14 a 19/5/25', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Seja o protagonista da grande mudança na área de tecnologia e saia na frente da concorrência para crescer na carreira e garantir os melhores salários.', link: 'https://digital.impacta.com.br/lp/aula-gratuita/aula-inscricao?utm_source=facebook&utm_medium=cpc&utm_campaign=FB_PRF_CONV-LEAD_IMPACTA_POS-GRADUACAO_CAPTACAO-LIVES_ASC_EVENT-NEW2&utm_content=FB_PRF_CONV-LEAD_IMPACTA_POS-GRADUACAO_CAPTACAO-LIVES_ASC&utm_term=IMPACTA_CAPTACAO-LIVES_006&hsa_acc=290914519438832&hsa_cam=120224731471810220&hsa_grp=120224731471800220&hsa_ad=120224731471820220&hsa_src=fb&hsa_net=facebook&hsa_ver=3&utm_id=120224731471810220_v2_s11&sfnsn=wiwspmo', tags: ['Imersão', 'Carreira'] },
    { id: 1163, nome: 'Semana da transformação digital SEBRAE - 12 a 16/5/25', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: 'Menos esforços, mais resultados: conheça o poder da transformação digital. Gratuito com certificado. ', link: 'https://cloud.divulga.sebraesc.com.br/semana-td?utm_source=META&amp;utm_medium=CPC&amp;utm_campaign=SEMANA_TD&amp;utm_id=120219430235140390&amp;utm_content=120219546789780390&amp;utm_term=120219439635', tags: ['Imersão', 'Carreira', 'Negócios', 'Biscoitagem', 'Tráfego', 'Google Ads', 'Criação de conteúdo', 'IA', 'Marketing Digital'] },
    { id: 1164, nome: 'MEETUP CODECON FLN - 13/5/25 - Presencial', imagem: '', tipo: 'destaque', categoria: 'Eventos', descricao: 'Duas palestras muito massa com o Fofo do Paulinho Prado e a galática Fernanda Kipper!!', link: 'https://eventos.codecon.dev/floripa-meetup-codecon-11-567161/?fbclid=PAZXh0bgNhZW0CMTEAAacY3vPlEI4dUftGOYYnLasE4BjQ4ZhToB-gfBTWZES0qIX6snOrhw1wCgQyNA_aem_vK5G4o0njE8vCdNiduUEcQ', tags: ['Meetup', 'Floripa', 'Palestra'] },


    // { id: 1157, nome: '', imagem: '', tipo: 'normal', categoria: 'Eventos', descricao: '', link: '', tags: ['Imersão', 'Python', 'Dados', 'Automação'] },




    // FOOTER
    { id: 1001, nome: 'Pull Request no JAMANJO', imagem: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG9jNWh1aHNmZDBjOTVkMmxseWZ6c2RwaTA5NDR5MmlzNnV5a3NnbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vc3c5SgfF42e1ZTpGP/giphy.gif', tipo: 'ad', categoria: 'Colaboragem', descricao: 'Se quiser uma experiência de contribuição em um projeto real e lindo, nesse link tem a descrição do processo para contribuir com o Jamanjo 💚', link: 'https://github.com/rafaellindemann/jamanjo/blob/main/contributing.md', tags: ['Pull Request', 'PR', 'ads', 'Colab', 'JAMANJO', '💪', '🙏', '🙌', '🤜🤛'] },
    { id: 1002, nome: '💥Instagram do Jamanjo', imagem: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZrYzF3Y2RqdHpjNW9iaW1sdjN4azJycndpbTlzNDVmY3UyaXlzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VDAmNs8nmksyQE5qLG/giphy.gif', tipo: 'ad', categoria: 'Biscoitagem', descricao: '💌📰 Segue lá se você quer saber em primeira mão das novidades, principalmente vagas de trampo e eventos!', link: 'https://www.instagram.com/jamanjo.4devs/', tags: ['📰', '💌', 'ads', 'JAMANJO', '💪', '🙏', 'Instagram', '🙌', 'Novidades', '🤜🤛', 'Veja primeiro'] },
  ]


  const categories = [
    "Curso", "Canal", "Sites", "Carreira", "Jogos",
    "Repositórios", "Imagens", "Ferramentas", "Livros", "Exercícios", "Fóruns",
    "Podcasts", "Redes Sociais", "Balaio", "Eventos", "Da Casa", 'Vagas'
  ];

  const [filteredResources, setFilteredResources] = useState(resources);
  const [filteredBySearch, setFilteredBySearch] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchValue, setSearchValue] = useState('');



  // useEffect(() => {
  //   console.log(filters);
  //   console.log(filteredResources.length);
  // }, [filters]);

  // Função para limpar todos os filtros
  const clearFilters = (overrideSearch) => {

    setFilters([]);
    setSelectedTag(null);

    let searchText = '';

    // Verifica se overrideSearch é uma string
    if (typeof overrideSearch === 'string') {
      searchText = overrideSearch.trim();
    }
    // Se não for string e for um objeto com target.value (ex: SyntheticEvent), tenta extrair o valor
    else if (typeof overrideSearch === 'object' && overrideSearch?.target?.value) {
      searchText = overrideSearch.target.value.toString().trim();
    }

    //Caso a searchbar tenha alguma informação, faz a busca automaticamente após a remoção dos filtros
    if (searchText) {
      const searchResults = applySearchFilter(resources, searchText);
      setFilteredResources(searchResults);
    } else {
      setFilteredResources(resources);
    }

  };

  // Função para aplicar filtro de categoria
  const handleFilter = (category, overrideSearch) => {
    if (category) {
      let filtered = resources.filter((resource) =>
        resource.categoria === category || resource.tipo === 'ad'
      );

      /** Define o termo de pesquisa como overrideSearch, se fornecido, ou searchValue como padrão.
       Aplica o filtro de busca somente se o termo não for vazio após remover espaços. */
      const searchText = overrideSearch ?? searchValue;

      if (searchText?.trim()) {
        filtered = applySearchFilter(filtered, searchText);
      }

      setFilteredResources(filtered);
      setFilters([category]);
      setSelectedTag(null); // Limpa a tag ao aplicar filtro de catgegoria
    } else {
      clearFilters(); // Limpa todos os filtros
    }
  };

  // Função para aplicar filtro de tag
  const handleTagFilter = (tag, overrideSearch) => {
    if (tag) {
      let filtered = resources.filter((resource) =>
        resource.tags && resource.tags.includes(tag) || resource.tipo === 'ad'
      );

      /** Define o termo de pesquisa como overrideSearch, se fornecido, ou searchValue como padrão.
       * Aplica o filtro de busca somente se o termo não for vazio após remover espaços. */
      const searchText = overrideSearch ?? searchValue;

      if (searchText?.trim()) {
        filtered = applySearchFilter(filtered, searchText);
      }

      setFilteredResources(filtered);
      setFilters([]); // Limpa o filtro de categoria ao aplicar filtro de tag
      setSelectedTag(tag);
    } else {
      clearFilters(); // Limpa todos os filtros
    }
  };

  /** 
 * Debounce em JavaScript puro.
 * Garante que a função search só seja executada após o usuário parar de digitar 
 * por um período específico (definido dentro da própria função search).*/
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  /**
 * Aplica um filtro de busca textual a uma lista de recursos.
 * A busca considera os campos: nome, descrição e tags (se existirem),
 * desconsiderando acentuação, caracteres especiais e capitalização.*/
  const applySearchFilter = (lista, text) => {
    /**Função auxiliar que normaliza o texto:
     - remove espaços extras
     - remove acentos (unicode NFD)
     - remove caracteres especiais
     - transforma em minúsculas */
    const normalizar = (text) =>
      text
        ?.trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")//Remove acentos
        .replace(/[^\w\s]/gi, "")//Remove caracteres especiais
        .toLowerCase();

    // Texto digitado pelo usuário, já normalizado
    const normalizedSearch = normalizar(text);

    /**Filtra os recursos que contenham o termo de busca em:
    - nome
    - alguma das tags
    - descrição */
    return lista.filter(resource =>
      normalizar(resource.nome).includes(normalizedSearch) ||
      (Array.isArray(resource.tags) && resource.tags.some(tag =>
        normalizar(tag).includes(normalizedSearch)
      )) ||
      normalizar(resource.descricao).includes(normalizedSearch)
    );
  };

  const search = debounce((searchText) => {

    /** Armazena o texto digitado pelo usuário em um useState.  
 * Esse valor é utilizado quando o usuário digita algo na searchbar,  
 * aplicando automaticamente um filtro sobre os itens que já foram filtrados por categoria ou tag. */
    setSearchValue(searchText)

    if (searchText.trim()) { // Verifica se o usuário digitou algum texto (ignora espaços em branco)

      let base = resources; // Começa com a lista completa de recursos como base

      if (filters.length > 0) {
        // Se houver filtros ativos, filtra a base por categoria (primeiro filtro) ou tipo "ad"
        base = base.filter(r => r.categoria === filters[0] || r.tipo === 'ad');
      } else if (selectedTag) {
        // Se não houver filtro de categoria, mas houver uma tag selecionada,
        // filtra por recursos que contenham essa tag ou que sejam do tipo "ad"
        base = base.filter(r => r.tags?.includes(selectedTag) || r.tipo === 'ad');
      }

      // Aplica a função de busca textual sobre a base filtrada
      const searchResults = applySearchFilter(base, searchText);

      // Atualiza os recursos filtrados com os resultados da busca
      setFilteredResources(searchResults);

    } else {// Se o texto de busca estiver vazio...
      if (filters.length > 0) {
        // Aplica somente o filtro de categoria
        handleFilter(filters[0], searchText);
      } else if (selectedTag) {
        // Aplica somente o filtro por tag
        handleTagFilter(selectedTag, searchText);
      } else {
        // Se não houver filtros nem texto de busca, limpa todos os filtros
        clearFilters();
      }
    }


  }, 300);


  return (
    <GlobalContext.Provider value={{
      resources, categories,
      filteredResources, setFilteredResources, filteredBySearch, setFilteredBySearch,
      filters, setFilters,
      handleFilter, handleTagFilter, selectedTag, clearFilters,
      search, searchValue
    }}>
      {children}
    </GlobalContext.Provider>
  );
};


