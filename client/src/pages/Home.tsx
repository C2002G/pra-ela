import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import '../styles/Home.css';

/**
 * DESIGN PHILOSOPHY: Luxe Minimalism
 * - Espaço respirável com muito whitespace
 * - Tipografia elegante como protagonista
 * - Animações suaves e delicadas
 * - Paleta reduzida: vermelho vinho + ouro rose
 * 
 * INSTRUÇÕES DE EDIÇÃO:
 * 1. Fotos do carrossel: Procure por "CAROUSEL_IMAGES" e substitua os URLs
 * 2. Fotos do caminho: Procure por "JOURNEY_PHOTOS" e substitua os URLs
 * 3. Textos: Procure por "EDITAR:" para encontrar todos os textos editáveis
 * 4. Músicas locais: Procure por "LOCAL_SONGS" e adicione os caminhos dos seus MP3s
 * 5. Data de início: Procure por "RELATIONSHIP_START_DATE" para o contador
 */

// ============================================================================
// CONFIGURAÇÕES EDITÁVEIS
// ============================================================================

// EDITAR: Data de início do relacionamento (para o contador de tempo)
const RELATIONSHIP_START_DATE = new Date('2022-01-03'); // EDITAR: Mude para a data que vocês começaram

// EDITAR: URLs das fotos do carrossel (substitua com suas fotos)
const CAROUSEL_IMAGES = [
  'fotos/foto4.jpeg',
  'fotos/foto5.jpeg',
  'fotos/foto12.jpeg',
  
  // Adicione mais URLs de fotos aqui
];

// EDITAR: Fotos do caminho de história (com títulos e datas)
const JOURNEY_PHOTOS = [
  {
    id: 1,
    photo: 'fotos/foto10.jpeg',
    title: 'LAMBIDA NA CARA',
    date: '01/01/2022',
    description: 'Aqui foi a primeira vez que a gente se olhou bebados, esqueço de tudo... Menos desse tcha que tivemos, primeiro de muitos',
  },
  {
    id: 2,
    photo: 'fotos/foto9.jpeg',
    title: '1ª ANO',
    date: '01/01/2023',
    description: 'Eu ja estava infinitamente feliz que estavamos juntos e se vendo todo dia, mal sabia que um tempo depois iriamos ter nossa casinha',
  },
  {
    id: 3,
    photo: 'fotos/foto7.jpeg',
    title: '2ª ANO',
    date: '01/01/2024',
    description: 'Cada ano novo, cada ritual dessa foto. Sempre melhor que anterior. Não sou religioso mas amo esse ritual, e tu é minha religião OH GLORIA',
  },
  {
    id: 4,
    photo: 'fotos/foto8.jpeg',
    title: 'KKKKKKKKKKKKKKKKKK essa a gente tava loko',
    date: '01/01/2025',
    description: 'O que eu amei essa viagem não ta escrito, obrigado por tudo tudo mesmo. Primeira viagem de muitas, e eu amo que tu me ensinou muita coisa nessa indiada. Te amando mais ainda a cada segundo que passava',
  },
  {
    id: 5,
    photo: 'fotos/foto11.jpeg',
    title: 'A carinha de cansado dos dois KKKKK',
    date: '01/01/2026',
    description: 'A gente tava derrotado essa hora, mas eu mesmo derrotado cansado, amo fazer esse ritual e viajar contigo meu amor. Aqui me mostrou muito que idependente do lugar e como, ainda vou amar muito por estar contigo',
  },
  ];

// EDITAR: Músicas locais (MP3)
// Instruções:
// 1. Baixe os áudios do YouTube em MP3 (use: https://www.y2mate.com/)
// 2. Coloque os arquivos MP3 na pasta: public/musicas/
// 3. Adicione cada música aqui com: { name: 'Nome da Música', artist: 'Artista', file: 'musicas/arquivo.mp3' }
const LOCAL_SONGS = [
  { name: 'Outro Verão', artist: 'Chimarruts', file: 'musicas/outro-verao.mp3' },
  { name: 'Camisa 10', artist: 'Turma do pagode', file: 'musicas/camisa-10.mp3' },
  { name: 'Estou Mal', artist: 'Raça Negra', file: 'musicas/estou-mal.mp3' },
  { name: 'Oi, Estou Te Amando', artist: 'Raça Negra', file: 'musicas/oi-estou-te-amando.mp3' },
  { name: 'Biquíni', artist: 'Stome', file: 'musicas/biquini.mp3' },
  { name: 'Te Esperando', artist: 'Luan Santana', file: 'musicas/te-esperando.mp3' },
  { name: 'Sogrão Caprichou', artist: 'Luan Santana', file: 'musicas/sograo-caprichou.mp3' },
];

// EDITAR: Imagem de capa padrão para o player (quando não há capa do álbum)
// Você pode usar uma URL de imagem ou deixar vazio para mostrar apenas o ícone de música
const DEFAULT_ALBUM_ART = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663748134247/fihQ7MrsgNLsrs3sQCFq57/spotify-card-background-H7dSR99vRKmMj95NZdbfzz.webp';

// ============================================================================
// COMPONENTES
// ============================================================================

/**
 * Componente de Corações Flutuantes
 * Animação delicada de corações que aparecem ao mover o mouse
 */
function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const heartIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Cria um coração a cada movimento (com limite de frequência)
      if (Math.random() > 0.95) {
        const newHeart = {
          id: heartIdRef.current++,
          x: e.clientX,
          y: e.clientY,
        };
        setHearts((prev) => [...prev, newHeart]);

        // Remove o coração após a animação (3 segundos)
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 3000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}

/**
 * Componente do Contador de Tempo
 * Mostra quantos dias, horas e minutos estamos juntos
 */
function TimeCounter() {
  const [timeData, setTimeData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = now.getTime() - RELATIONSHIP_START_DATE.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeData({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-counter">
      <div className="time-item">
        <span className="time-value">{timeData.days}</span>
        <span className="time-label">Dias</span>
      </div>
      <div className="time-separator">:</div>
      <div className="time-item">
        <span className="time-value">{String(timeData.hours).padStart(2, '0')}</span>
        <span className="time-label">Horas</span>
      </div>
      <div className="time-separator">:</div>
      <div className="time-item">
        <span className="time-value">{String(timeData.minutes).padStart(2, '0')}</span>
        <span className="time-label">Minutos</span>
      </div>
    </div>
  );
}

/**
 * Componente do Player de Áudio Local
 * Reproduz arquivos MP3 locais com controles de reprodução
 */
function AudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = LOCAL_SONGS[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error('Erro ao reproduzir:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % LOCAL_SONGS.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? LOCAL_SONGS.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      {/* Capa do álbum */}
      <img
        src={DEFAULT_ALBUM_ART}
        alt={currentTrack.name}
        className="player-album-art"
      />

      {/* Informações da música */}
      <div className="player-info">
        <h4 className="player-track-name">{currentTrack.name}</h4>
        <p className="player-artist">{currentTrack.artist}</p>
      </div>

      {/* Barra de progresso */}
      <div className="player-progress" onClick={handleProgressClick}>
        <div
          className="progress-bar"
          style={{
            width: duration ? `${(currentTime / duration) * 100}%` : '0%',
          }}
        ></div>
      </div>

      {/* Tempo */}
      <div className="player-time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controles */}
      <div className="player-controls">
        <button className="player-button" onClick={playPrevious}>
          ⏮️
        </button>
        <button className="player-button player-play" onClick={togglePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button className="player-button" onClick={playNext}>
          ⏭️
        </button>
      </div>

      {/* Elemento de áudio oculto */}
      <audio ref={audioRef} src={currentTrack.file} />
    </div>
  );
}

/**
 * Componente do Carrossel de Fotos
 * Exibe fotos em slides com navegação
 */
function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <img
          src={CAROUSEL_IMAGES[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>

      {/* Botões de navegação */}
      <button className="carousel-button carousel-button-prev" onClick={goToPrevious}>
        <ChevronLeft size={24} />
      </button>
      <button className="carousel-button carousel-button-next" onClick={goToNext}>
        <ChevronRight size={24} />
      </button>

      {/* Indicadores de slide */}
      <div className="carousel-indicators">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Componente do Caminho de História
 * Exibe fotos em uma linha vertical com títulos e descrições
 */
function JourneyPath() {
  return (
    <div className="journey-container">
      <h2 className="journey-title">Nossa História</h2>
      
      {/* Linha decorativa de ouro rose */}
      <div className="divider-gold"></div>

      <div className="journey-timeline">
        {JOURNEY_PHOTOS.map((item, index) => (
          <div key={item.id} className="journey-item">
            {/* Foto */}
            <div className="journey-photo-wrapper">
              <img src={item.photo} alt={item.title} className="journey-photo" />
            </div>

            {/* Conteúdo */}
            <div className={`journey-content ${index % 2 === 0 ? 'left' : 'right'}`}>
              <p className="journey-date">{item.date}</p>
              <h3 className="journey-item-title">{item.title}</h3>
              <p className="journey-description">{item.description}</p>
            </div>

            {/* Ponto na linha */}
            {index < JOURNEY_PHOTOS.length - 1 && (
              <div className="journey-connector">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663748134247/fihQ7MrsgNLsrs3sQCFq57/journey-path-decoration-38qktAsifokNxNEc2KJCGd.webp"
                  alt="Caminho decorativo"
                  className="journey-path-decoration"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Componente do Card com Lista de Músicas
 * Exibe a lista de músicas locais
 */
function MusicListCard() {
  const [selectedTrack, setSelectedTrack] = useState(0);

  return (
    <div className="music-list-container">
      <h2 className="music-list-title">Nossas Músicas Favoritas</h2>
      
      <div className="divider-gold"></div>

      <div className="music-list-card">
        {/* Fundo decorativo */}
        <div className="music-list-background">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663748134247/fihQ7MrsgNLsrs3sQCFq57/spotify-card-background-H7dSR99vRKmMj95NZdbfzz.webp"
            alt="Fundo de Músicas"
            className="music-list-bg-image"
          />
        </div>

        {/* Conteúdo do card */}
        <div className="music-list-content">
          <div className="music-list-header">
            <h3 className="music-list-card-title">Para Você, Com Amor</h3>
            <p className="music-list-subtitle">Nossas Músicas Especiais</p>
          </div>

          {/* Lista de músicas */}
          <div className="music-list-tracks">
            {LOCAL_SONGS.length > 0 ? (
              LOCAL_SONGS.map((song, index) => (
                <div key={index} className="music-list-track">
                  <span className="track-number">{index + 1}</span>
                  <div className="track-info">
                    <p className="track-name">{song.name}</p>
                    <p className="track-artist">{song.artist}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-tracks">Nenhuma música configurada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente Principal da Home
 */
export default function Home() {
  return (
    <div className="home-container">
      {/* Corações Flutuantes */}
      <FloatingHearts />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Para o Meu Amor</h1>
          <p className="hero-subtitle">Minha linda, veio por meio do meu artesanto WEB KKKKK</p>
          <p>Te presentear com um simples gesto, mas que foi feito com muito amor e carinho meu amor</p>
          <p>Te amo demais minha linda, quero que você use esse site para lembrar de como somos um casal foda</p>
          <p>Use sem moderação, minha princesa</p>
        </div>
      </section>

      {/* Contador de Tempo */}
      <section className="section-time-counter">
        <h2 className="counter-title">Estamos Juntos Há:</h2>
        <TimeCounter />
      </section>

      {/* Carrossel de Fotos */}
      <section className="section-carousel">
        <PhotoCarousel />
      </section>

      {/* Caminho de História */}
      <section className="section-journey">
        <JourneyPath />
      </section>

      {/* Player de Áudio Local */}
      <section className="section-audio-player">
        <h2 className="audio-player-title">Toque Nossas Músicas</h2>
        <AudioPlayer />
      </section>

      {/* Lista de Músicas */}
      <section className="section-music-list">
        <MusicListCard />
      </section>

      {/* Mensagem Final */}
      <section className="final-message">
        <h2>Feliz dias dos Namorados</h2>
        <p>Miha Princesa Linda. Obrigado por todos esse anos juntos. Não tenho como agradecer e explicar o quão grato sou por ter você minha vida.
        </p>
        <p>Tu sabe melhor que níguem que a minha vida melhorou 99999999% com a sua presença, eu aprendi muita coisa, desculpe por tu ter me pegado muito na planta, mas juro que vou ser uma baita investimento KKKKKK</p>
        <p>Minha vida, minha paixão. Desculpe ser esse meu mero presente, mas te juro que foi de coração e eu vou assumir que eu amo fazer isso pra ti (te acostuma que vou fazer mais vezes KKK)</p>
        <p>Te amo demais minha linda, obrigado por mais um dias dos namorados ao seu lado, sei que vou passar todos meus dias dos namorados contigo, mas sempre cada um vai ser mais especial que o outro.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Com amor, teu homem que te am muito. Feliz dias dos namorados minha lindona 💕</p>
      </footer>
    </div>
  );
}
