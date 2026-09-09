import { useEffect, useRef, useState } from 'react';

const photos = ['원본-1.jpg', '원본-110.jpg', '원본-173.jpg', '원본-188.jpg', '원본-195.jpg', '원본-24.jpg', '원본-375.jpg', '원본-495.jpg', '원본-530.jpg', '원본-536.jpg', '원본-601.jpg', '원본-659.jpg', '원본-834.jpg', '원본-87.jpg'];
const venueMapImageUrl = 'https://houseoftheraum.co.kr/wp-content/uploads/images/house_of_the_raum_map.jpg';
const naverVenueUrl = 'https://naver.me/GbDMwi5B';
const days = Array.from({ length: 31 }, (_, index) => index + 1);

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedAccount, setCopiedAccount] = useState('');
  const [accountSide, setAccountSide] = useState<'groom' | 'bride' | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
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
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.target.classList.contains('replay-reveal')) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      } else if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.25 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      window.clearInterval(countdown);
      document.removeEventListener('pointerdown', startMusic);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedPhoto(null);
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <main className="invitation">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}MUSIC.mp3`} loop />
      <section className="screen opening">
        <img className="opening-image" src={`${import.meta.env.BASE_URL}${photos[0]}`} alt="박민균과 김희연" />
        <div className="opening-wash" />
        <div className="petals" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
        <button className={`music-button ${isPlaying ? 'is-playing' : ''}`} type="button" onClick={toggleMusic} aria-label="배경음악 재생"><i /><i /><i /></button>
        <h1>Min Gyun <em className="ampersand">&amp;</em> Hee Yeon</h1>
        <div className="opening-details">
          <p>2027년 1월 17일 일요일 오후 13시</p>
          <p>하우스 오브 더 라움 벨루스홀</p>
        </div>
      </section>

      <section className="screen story reveal">
        <p className="eyebrow">OUR STORY</p><p className="hand">With all our hearts</p>
        <h2>서로의 계절이 되어<br />함께 걷고 싶습니다.</h2>
        <p className="body-copy">처음 만난 순간부터 지금까지,<br />우리의 모든 장면을 사랑으로 기억합니다.<br />소중한 분들을 모시고 새로운 시작을 약속합니다.</p>
        <div className="couple-names"><span>주효정의 아들<br /><b>박민균</b></span><i>그리고</i><span>김정호 · 이상숙의 딸<br /><b>김희연</b></span></div>
      </section>

      <section className="date-intro reveal replay-reveal" aria-label="예식 날짜">
        <div className="date-intro-content">
          <span className="date-line date-month">JAN 17</span>
          <span className="date-line date-year">2027</span>
        </div>
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

      <section className="screen couple reveal"><p className="eyebrow">ABOUT US</p><h2>우리 커플을<br /><i>소개합니다.</i></h2><div className="couple-cards"><article><img src={`${import.meta.env.BASE_URL}원본-312.jpg`} alt="신랑 박민균" /><b>신랑 · 박민균</b><p>#ISTP #도파민중독자 #죽어야끝남</p></article><article><img src={`${import.meta.env.BASE_URL}원본-269.jpg`} alt="신부 김희연" /><b>신부 · 김희연</b><p>#ENFP #음식한입충 #쿠키커터상어</p></article></div></section>

      <section className="screen gallery reveal"><h2>GALLERY</h2><p className="gallery-hint">사진을 클릭하시면 전체 화면 보기가 가능합니다</p><div className="gallery-grid">{photos.slice(1).map((photo, index) => <button className={`gallery-photo-button photo-${index + 1}`} type="button" key={photo} onClick={() => setSelectedPhoto(photo)} aria-label={`사진 ${index + 1} 크게 보기`}><img className="gallery-photo" src={`${import.meta.env.BASE_URL}${photo}`} alt={`우리의 사진 ${index + 1}`} loading="lazy" /></button>)}</div></section>

      <section className="screen location reveal"><h2>LOCATION</h2><p className="location-venue">하우스 오브 더 라움 벨루스홀</p><p className="location-address"><span>서울특별시 광진구 능동로 81, B1</span><button type="button" onClick={() => copyAccount('서울특별시 광진구 능동로 81, B1', 'location-address')}>{copiedAccount === 'location-address' ? '복사됨' : '복사'}</button></p><a className="map-card" href={naverVenueUrl} target="_blank" rel="noreferrer"><img src={venueMapImageUrl} alt="하우스 오브 더 라움 약도" /><span>네이버 지도에서 길찾기 ↗</span></a><div className="directions"><div className="direction-group"><h3>자동차</h3><p>내비게이션 : ‘하우스 오브 더 라움’ 검색</p><p>서울특별시 광진구 능동로 81</p></div><div className="direction-group"><h3>버스</h3><p className="bus-route"><b className="bus-badge blue">간선버스</b><span>240</span></p><p className="bus-route"><b className="bus-badge green">지선버스</b><span>2222, 2224</span></p><p className="bus-route"><b className="bus-badge red">직행버스</b><span>3500</span></p><p className="bus-route"><b className="bus-badge sky">공항버스</b><span>6013</span></p><p className="bus-route"><b className="bus-badge lime">마을버스</b><span>광진05</span></p></div><div className="direction-group"><h3>지하철</h3><p className="subway-route"><b className="subway-number line-2">2</b><span>2호선 건대입구역 5번 출구</span></p><p className="subway-route"><b className="subway-number line-7">7</b><span>7호선 건대입구역 5번 출구</span></p></div><div className="direction-group"><h3>주차</h3><p>건물 내 지하 주차장 이용</p><p>예식 참석 시 주차 2시간을 지원합니다.</p></div></div></section>

      <section className="screen accounts reveal"><p className="eyebrow">WITH LOVE</p><h2>마음 전하실 <i>곳</i></h2><p className="accounts-description">참석이 어려우신 분들을 위해 기재했습니다<br />너그러운 마음으로 양해 부탁드립니다</p><div className="account-accordions">{[['groom', '신랑측에게', [['신랑', '박민균', '국민', '024802-04-248253', 'groom'], ['혼주 · 신랑측', '주효정', '국민', '223-21-0623-371', 'groom-parent']]], ['bride', '신부측에게', [['신부', '김희연', '신한', '110-536-892857', 'bride'], ['혼주 · 신부측', '이상숙', '신한', '110-454-472913', 'bride-mother'], ['혼주 · 신부측', '김정호', '농협', '302-0147-1674-31', 'bride-father']]]].map(([side, label, accounts]) => <div className={`account-accordion ${accountSide === side ? 'open' : ''}`} key={side}><button className="account-accordion-toggle" type="button" onClick={() => setAccountSide(accountSide === side ? null : side as 'groom' | 'bride')} aria-expanded={accountSide === side}><span>{label}</span><i aria-hidden="true" /></button><div className="account-list">{(accounts as string[][]).map(([role, name, bank, account, owner]) => <div className="account" key={owner}><div className="account-info"><span><b>{role}</b> {name}</span><div className="account-meta"><small>{bank}</small><strong>{account}</strong></div></div><button type="button" onClick={() => copyAccount(account, owner)}>{copiedAccount === owner ? '복사됨' : '복사'}</button></div>)}</div></div>)}</div></section>
      {selectedPhoto && <div className="lightbox" role="dialog" aria-modal="true" aria-label="사진 전체 화면 보기" onClick={() => setSelectedPhoto(null)}><button className="lightbox-close" type="button" onClick={() => setSelectedPhoto(null)} aria-label="사진 닫기">×</button><img src={`${import.meta.env.BASE_URL}${selectedPhoto}`} alt="선택한 사진" onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}

export default App;
