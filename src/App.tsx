import { useEffect, useRef, useState } from 'react';

const photos = ['원본-1.jpg', '원본-110.jpg', '원본-173.jpg', '원본-188.jpg', '원본-195.jpg', '원본-24.jpg', '원본-375.jpg', '원본-495.jpg', '원본-530.jpg', '원본-536.jpg'];
const venueMapImageUrl = 'https://houseoftheraum.co.kr/wp-content/uploads/images/house_of_the_raum_map.jpg';
const naverVenueUrl = 'https://naver.me/GbDMwi5B';
const days = Array.from({ length: 31 }, (_, index) => index + 1);

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
      const totalSeconds = Math.max(0, Math.floor((weddingDay.getTime() - Date.now()) / 1000));
      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };
    updateCountdown();
    const countdown = window.setInterval(updateCountdown, 1000);
    const startMusic = () => audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => undefined);
    startMusic();
    document.addEventListener('pointerdown', startMusic, { once: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.14 });
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
      <section className="screen opening">
        <img className="opening-image" src={`${import.meta.env.BASE_URL}${photos[0]}`} alt="박민균과 김희연" />
        <div className="opening-wash" />
        <div className="petals" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
        <button className={`music-button ${isPlaying ? 'is-playing' : ''}`} type="button" onClick={toggleMusic} aria-label="배경음악 재생"><i /><i /><i /></button>
        <h1>Min Gyun <em>&amp;</em> Hee Yeon</h1>
      </section>

      <section className="screen story reveal">
        <p className="eyebrow">OUR STORY</p><p className="hand">With all our hearts</p>
        <h2>서로의 계절이 되어<br />함께 걷고 싶습니다.</h2>
        <p className="body-copy">처음 만난 순간부터 지금까지,<br />우리의 모든 장면을 사랑으로 기억합니다.<br />소중한 분들을 모시고 새로운 시작을 약속합니다.</p>
        <div className="couple-names"><span>주효정의 아들<br /><b>박민균</b></span><i>그리고</i><span>김정호 이상숙의 딸<br /><b>김희연</b></span></div>
      </section>

      <section className="screen wedding-day reveal">
        <p className="eyebrow">WEDDING DAY</p>
        <h2>2027년 1월 17일 일요일 <span>|</span> 오후 1시</h2>
        <p className="date-en">Sunday, January 17, 2027 | PM 1:00</p>
        <div className="calendar">
          <div className="weekdays"><b>일</b><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
          <div className="calendar-days">{Array.from({ length: 5 }, (_, index) => <span className="empty-day" key={`empty-${index}`} />)}{days.map((day) => <span className={day === 17 ? 'selected' : (day + 5) % 7 === 0 ? 'sunday' : ''} key={day}>{day}</span>)}</div>
        </div>
        <div className="countdown">{[['days', 'DAYS'], ['hours', 'HOURS'], ['minutes', 'MINUTES'], ['seconds', 'SECONDS']].map(([key, label]) => <div className="time-box" key={key}><strong key={String(timeLeft[key as keyof typeof timeLeft])}>{String(timeLeft[key as keyof typeof timeLeft]).padStart(key === 'days' ? 3 : 2, '0')}</strong><small>{label}</small></div>)}</div>
      </section>

      <section className="screen contact reveal"><p className="eyebrow">CONGRATULATIONS</p><h2>축하의 마음을<br /><i>전해주세요.</i></h2><p className="body-copy">두 사람의 새로운 시작을<br />따뜻한 마음으로 축복해주세요.</p><a href="tel:01000000000">축하 연락하기 <span>↗</span></a></section>

      <section className="screen couple reveal"><p className="eyebrow">ABOUT US</p><h2>우리 커플을<br /><i>소개합니다.</i></h2><div className="couple-cards"><article><img src={`${import.meta.env.BASE_URL}${photos[5]}`} alt="신랑 박민균" /><b>신랑 · 박민균</b><p>주효정의 아들<br />다정한 마음으로 오늘을 준비했습니다.</p></article><article><img src={`${import.meta.env.BASE_URL}${photos[6]}`} alt="신부 김희연" /><b>신부 · 김희연</b><p>김정호 이상숙의 딸<br />함께라서 더 따뜻한 내일을 꿈꿉니다.</p></article></div></section>

      <section className="screen gallery reveal"><p className="eyebrow">OUR MOMENTS</p><h2>우리의<br /><i>photographs</i></h2><div className="gallery-grid">{photos.slice(1).map((photo, index) => <img key={photo} className={`gallery-photo photo-${index + 1}`} src={`${import.meta.env.BASE_URL}${photo}`} alt={`우리의 사진 ${index + 1}`} loading="lazy" />)}</div></section>

      <section className="screen location reveal"><p className="eyebrow">LOCATION</p><h2>우리 결혼식에<br /><i>놀러 오세요.</i></h2><p className="body-copy">서울특별시 광진구 능동로 81, B1<br />하우스 오브 더 라움 벨루스홀</p><a className="map-card" href={naverVenueUrl} target="_blank" rel="noreferrer"><img src={venueMapImageUrl} alt="하우스 오브 더 라움 약도" /><span>네이버 지도에서 길찾기 ↗</span></a><div className="directions"><div><b>지하철</b><span>2호선 · 7호선 건대입구역 5번 출구</span></div><div><b>버스</b><span>240 · 2222 · 2224 · 3500 · 6013 · 광진05</span></div><div><b>자동차</b><span>“하우스 오브 더 라움” 검색 · 건물 내 지하 주차장</span></div></div></section>

      <section className="screen accounts reveal"><p className="eyebrow">WITH LOVE</p><h2>마음 전하실<br /><i>곳</i></h2><div className="account-list">{[['신랑', '박민균', '국민은행', '024802-04-248253', 'groom'], ['신부', '김희연', '신한은행', '110-536-892857', 'bride'], ['혼주 · 신랑측', '주효정', '계좌 준비 중', '0000', 'groom-parent'], ['혼주 · 신부측', '김정호 · 이상숙', '계좌 준비 중', '0000', 'bride-parent']].map(([role, name, bank, account, owner]) => <div className="account" key={owner}><span><b>{role}</b> {name}<small>{bank}</small></span><strong>{account}</strong><button type="button" onClick={() => copyAccount(account, owner)}>{copiedAccount === owner ? '복사됨' : '복사'}</button></div>)}</div></section>
      <footer><p className="hand">See you there</p><span>MIN GYUN &amp; HEE YEON · 17 JAN 2027</span></footer>
    </main>
  );
}

export default App;
