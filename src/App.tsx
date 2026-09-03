import { useEffect, useRef, useState } from 'react';

const photos = [
  '원본-1.jpg', '원본-110.jpg', '원본-173.jpg', '원본-188.jpg',
  '원본-195.jpg', '원본-24.jpg', '원본-375.jpg', '원본-495.jpg',
  '원본-530.jpg', '원본-536.jpg', '원본-587.jpg', '원본-601.jpg',
];
const venueImageUrl = 'https://houseoftheraum.co.kr/wp-content/uploads/2025/08/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80_%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C_%EA%B0%80%EB%A1%9C29.jpg';
const venueMapImageUrl = 'https://houseoftheraum.co.kr/wp-content/uploads/images/house_of_the_raum_map.jpg';
const naverVenueUrl = 'https://naver.me/GbDMwi5B';

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedAccount, setCopiedAccount] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const copyAccount = async (account: string, owner: string) => {
    await navigator.clipboard.writeText(account);
    setCopiedAccount(owner);
    window.setTimeout(() => setCopiedAccount(''), 1800);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const weddingDay = new Date('2027-01-17T13:00:00+09:00');
    const updateCountdown = () => {
      const remaining = Math.max(0, weddingDay.getTime() - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };
    updateCountdown();
    const countdown = window.setInterval(updateCountdown, 1000);
    const startMusic = () => {
      if (!audioRef.current || !audioRef.current.paused) return;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => undefined);
    };
    startMusic();
    document.addEventListener('pointerdown', startMusic, { once: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      window.clearInterval(countdown);
      document.removeEventListener('pointerdown', startMusic);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="invitation">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}MUSIC.mp3`} loop />
      <section className="opening">
        <img className="opening-image" src={`${import.meta.env.BASE_URL}${photos[0]}`} alt="박민균과 김희연" />
        <div className="opening-wash" />
        <div className="opening-top"><span>OUR WEDDING</span><span>17 / 01 / 2027</span><button className={`music-button ${isPlaying ? 'is-playing' : ''}`} type="button" onClick={toggleMusic} aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}><i /><i /><i /><em>{isPlaying ? 'SOUND ON' : 'SOUND OFF'}</em></button></div>
        <div className="opening-copy">
          <p className="eyebrow">A LITTLE FOREVER</p>
          <h1>Min Gyun<br /><i>&amp;</i> Hee Yeon</h1>
          <p className="opening-date">SUNDAY · ONE O'CLOCK</p>
        </div>
        <div className="opening-bottom"><span>SCROLL TO BEGIN</span><b>↓</b></div>
      </section>

      <section className="story reveal">
        <p className="eyebrow">01 / OUR STORY</p>
        <p className="hand">With all our hearts</p>
        <h2>서로의 계절이 되어<br />함께 걷고 싶습니다.</h2>
        <p className="body-copy">처음 만난 순간부터 지금까지,<br />우리의 모든 장면을 사랑으로 기억합니다.<br />소중한 분들을 모시고 새로운 시작을 약속합니다.</p>
        <div className="couple-names"><span>주효정의 아들<br /><strong>박민균</strong></span><i>그리고</i><span>김정호 이상숙의 딸<br /><strong>김희연</strong></span></div>
      </section>

      <section className="portrait reveal">
        <img src={venueImageUrl} alt="하우스 오브 더 라움" />
        <div className="portrait-label"><span>THE PLACE<br />WE BEGIN</span><strong>02</strong></div>
      </section>

      <section className="date-section reveal">
        <p className="eyebrow">02 / SAVE THE DATE</p>
        <div className="date-display"><span>JAN<br /><b>2027</b></span><strong>17</strong><span>SUN<br /><b>1:00 PM</b></span></div>
        <p className="venue-name">하우스 오브 더 라움<br /><em>벨루스홀</em></p>
        <div className="countdown" aria-label="결혼식까지 남은 시간">
          <div><strong>{String(timeLeft.days).padStart(3, '0')}</strong><small>DAY</small></div>
          <b>:</b>
          <div><strong>{String(timeLeft.hours).padStart(2, '0')}</strong><small>HOUR</small></div>
          <b>:</b>
          <div><strong>{String(timeLeft.minutes).padStart(2, '0')}</strong><small>MIN</small></div>
          <b>:</b>
          <div><strong>{String(timeLeft.seconds).padStart(2, '0')}</strong><small>SEC</small></div>
        </div>
      </section>

      <section className="gallery reveal">
        <p className="eyebrow">03 / IN BETWEEN</p>
        <h2>우리의 작은<br /><i>moments</i></h2>
        <div className="gallery-grid">
          {photos.slice(1).map((photo, index) => <img key={photo} className={`gallery-photo photo-${index + 1}`} src={`${import.meta.env.BASE_URL}${photo}`} alt={`박민균과 김희연의 순간 ${index + 1}`} loading="lazy" />)}
        </div>
      </section>

      <section className="location reveal">
        <p className="eyebrow">04 / JOIN US</p>
        <h2>우리 결혼식에<br /><i>놀러 오세요.</i></h2>
        <p className="body-copy">서울특별시 광진구 능동로 81, B1<br />2027년 1월 17일 일요일 오후 1시</p>
        <a className="map-card" href={naverVenueUrl} target="_blank" rel="noreferrer">
          <img src={venueMapImageUrl} alt="하우스 오브 더 라움 약도" />
          <span>네이버 지도에서 길찾기 <b>↗</b></span>
        </a>
        <div className="directions">
          <p className="directions-title">Getting there</p>
          <div><b>지하철</b><span>2호선 · 7호선 건대입구역 5번 출구</span></div>
          <div><b>버스</b><span>240 · 2222 · 2224 · 3500 · 6013 · 광진05</span></div>
          <div><b>자동차</b><span>“하우스 오브 더 라움” 검색 · 건물 내 지하 주차장</span></div>
        </div>
        <div className="accounts">
          <p className="directions-title">마음 전하실 곳</p>
          {[
            ['신랑', '박민균', '국민은행', '024802-04-248253', 'groom'],
            ['신부', '김희연', '신한은행', '110-536-892857', 'bride'],
            ['혼주 · 신랑측', '주효정', '계좌 준비 중', '0000', 'groom-parent'],
            ['혼주 · 신부측', '김정호 · 이상숙', '계좌 준비 중', '0000', 'bride-parent'],
          ].map(([role, name, bank, account, owner]) => (
            <div className="account" key={owner}><span><b>{role}</b> {name}<small>{bank}</small></span><strong>{account}</strong><button type="button" onClick={() => copyAccount(account, owner)}>{copiedAccount === owner ? '복사됨' : '복사'}</button></div>
          ))}
        </div>
      </section>

      <footer><p className="hand">See you there</p><span>MIN GYUN &amp; HEE YEON · 17 JAN 2027</span></footer>
    </main>
  );
}

export default App;
