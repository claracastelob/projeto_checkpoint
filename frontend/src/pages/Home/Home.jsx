import Header from "../../components/Header";
import Highlight from "./Highlight";
import Footer from "../../components/Footer"
import img1 from "../../assets/Dishonored_capa.png"
import img2 from "../../assets/TW3_Wild_Hunt.png"
import img3 from "../../assets/Grand_Theft_Auto_V_capa.png"
import img4 from "../../assets/red_dead.jpg"
import img5 from "../../assets/sh.jpg"
import img6 from "../../assets/hades.jpg"
import img7 from "../../assets/cupHead.jpg"

export default function Home() {
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <Highlight
        img={img1} 
        gameName="Dishonored"
        gameCategory="Category: Stealth"
        gameDuration="Duration (main history): 37 hours"
        gameDescription="Dishonored é um jogo de ação imersivo em primeira pessoa que coloca você como um assassino sobrenatural movido por vingança. Com o sistema de combate flexível de Dishonored, elimine seus alvos criativamente enquanto combina habilidades sobrenaturais, armas e dispositivos incomuns à sua disposição. Persiga seus inimigos sob o manto da escuridão ou ataque-os implacavelmente de frente com armas em punho. O resultado de cada missão se desenrola com base nas escolhas que você faz."
      />
      <Highlight 
        img={img2}
        gameName="The Witcher: Winld Hunt"
        gameCategory="Category: RPG"
        gameDuration="Duration (main history): 51 hours"
        gameDescription="Você é Geralt de Rívia, mercenário matador de monstros. O lugar é um continente devastado pela guerra e infestado de monstros que você pode explorar à vontade. Seu contrato atual? Encontrar Ciri, a Criança da Profecia — uma arma viva que pode alterar a forma do mundo."
      />
      <Highlight 
        img={img3}
        gameName="GTA V"
        gameCategory="Category: Shooter"
        gameDuration="Duration (main history): 32 hours"
        gameDescription="Quando um malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se envolvem com alguns dos criminosos mais assustadores e loucos do submundo, o governo dos EUA e a indústria do entretenimento, eles devem realizar golpes ousados para sobreviver nessa cidade implacável onde não podem confiar em ninguém, nem mesmo um no outro."
      />
      <Highlight 
        img={img4}
        gameName="Red Dead Redemption"
        gameCategory="Category: Open-World, Shooter"
        gameDuration="Duration (main history): 50 hours"
        gameDescription="Estados Unidos, 1899. Arthur Morgan e a gangue Van der Linde são bandidos em fuga. Com agentes federais e os melhores caçadores de recompensas no seu encalço, a gangue precisa roubar, assaltar e lutar para sobreviver no impiedoso coração dos Estados Unidos. Conforme divisões internas profundas ameaçam despedaçar a gangue, Arthur deve fazer uma escolha entre os seus próprios ideais e a lealdade à gangue que o criou."
      />
      <Highlight 
        img={img5}
        gameName="Silent Hill 2 (Remake)"
        gameCategory="Category: Horror, Survival"
        gameDuration="Duration (main history): 15 hours"
        gameDescription="Tendo recebido uma carta de sua falecida esposa, James dirige-se ao local onde compartilharam muitas lembranças, na esperança de vê-la mais uma vez: Silent Hill. Lá, à beira do lago, ele encontra uma mulher estranhamente parecida com ela... 'Meu nome... é Maria,' a mulher sorri. Seu rosto, sua voz... Ela é exatamente como ela. Vivencie uma aula magistral de terror psicológico — elogiado como o melhor da série."
      />
      <Highlight 
        img={img6}
        gameName="Hades"
        gameCategory="Category: Action"
        gameDuration="Duration (main history): 23 hours"
        gameDescription="Desafie o deus dos mortos enquanto você batalha para sair do Submundo neste jogo roguelike dos mesmos criadores de Bastion, Transistor e Pyre."
      />
      <Highlight 
        img={img7}
        gameName="Cup Head"
        gameCategory="Category: Action"
        gameDuration="Duration (main history): 10 hours"
        gameDescription="Cuphead é um jogo de ação e tiros clássico, com enorme ênfase nas batalhas de chefes. Inspirado nas animações infantis da década de 1930, os visuais e efeitos sonoros foram minuciosamente recriados com as mesmíssimas técnicas dessa era, com destaque para desenhos feitos à mão, fundos em aquarela e gravações originais de jazz. Jogue como Cuphead ou Mugman (nos modos um só jogador ou cooperativo) e atravesse mundos estranhos, adquira novas armas, aprenda supergolpes potentes e descubra segredos ocultos, tudo isso enquanto tenta pagar a dívida que você fez com o diabo!"
      />
      <Footer scrollToTop={scrollToTop}/>
    </>
  )
}