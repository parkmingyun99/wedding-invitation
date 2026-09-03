import { useEffect, useState } from 'react';

const photos = [
  '원본-1.jpg', '원본-110.jpg', '원본-173.jpg', '원본-188.jpg',
  '원본-195.jpg', '원본-24.jpg', '원본-375.jpg', '원본-495.jpg',
  '원본-530.jpg', '원본-536.jpg', '원본-587.jpg', '원본-601.jpg',
  '원본-604.jpg', '원본-617.jpg', '원본-651.jpg', '원본-658.jpg',
  '원본-659.jpg', '원본-834.jpg', '원본-87.jpg', '원본-886.jpg',
  '원본-95.jpg', '원본-957.jpg',
];

const venueImageUrl = 'https://houseoftheraum.co.kr/wp-content/uploads/2025/08/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80_%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C_%EA%B0%80%EB%A1%9C29.jpg';
const venueMapImageUrl = 'https://houseoftheraum.co.kr/wp-content/uploads/images/house_of_the_raum_map.jpg';
const naverVenueUrl = 'https://naver.me/GbDMwi5B';
const directions = [
  ['지하철', '2호선 · 7호선 건대입구역 5번 출구'],
  ['간선버스', '240'],
  ['지선버스', '2222 · 2224'],
  ['직행버스', '3500'],
  ['공항버스', '6013'],
  ['마을버스', '광진05'],
  ['자동차', '내비게이션에 “하우스 오브 더 라움” 입력 · 건물 내 지하 주차장'],
];

function App() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [copiedAccount, setCopiedAccount] = useState('');

  const copyAccount = async (account: string, owner: string) => {
    await navigator.clipboard.writeText(account);
    setCopiedAccount(owner);
    window.setTimeout(() => setCopiedAccount(''), 1800);
  };

  useEffect(() => {
    const weddingDay = new Date('2027-01-17T13:00:00+09:00');
    const updateCountdown = () => setDaysLeft(Math.max(0, Math.ceil((weddingDay.getTime() - Date.now()) / 86400000)));
    updateCountdown();
    const countdown = window.setInterval(updateCountdown, 3600000);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => {
      window.clearInterval(countdown);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="invitation">
      <section className="hero">
        <img className="hero-photo" src={`${import.meta.env.BASE_URL}원본-1.jpg`} alt="박민균과 김희연의 웨딩 사진" />
        <div className="hero-shade" />
        <div className="hero-top"><span>17</span><span>JAN</span><span>2027</span></div>
        <div className="hero-copy">
          <p className="kicker">A NEW CHAPTER BEGINS</p>
          <h1>Min Gyun<br /><em>&amp;</em> Hee Yeon</h1>
          <p className="hero-date">2027. 01. 17 SUN · 1:00 PM</p>
        </div>
        <div className="scroll-note"><span /> SCROLL TO DISCOVER</div>
      </section>

      <section className="intro reveal">
        <p className="section-index">01 / INVITATION</p>
        <p className="script">With all our hearts</p>
        <h2>서로의 계절이 되어<br />함께 걷고 싶습니다.</h2>
        <p className="body-copy">처음 만난 순간부터 지금까지,<br />우리의 모든 장면을 사랑으로 기억합니다.<br />소중한 분들을 모시고 새로운 시작을 약속하려 합니다.</p>
        <div className="names"><span>주효정의 아들<br /><b>박민균</b></span><i>그리고</i><span>김정호 이상숙의 딸<br /><b>김희연</b></span></div>
      </section>

      <section className="feature-photo reveal">
        <img src={venueImageUrl} alt="하우스 오브 더 라움" />
        <div className="photo-caption"><span>OUR<br />DAY</span><strong>02</strong></div>
      </section>

      <section className="details reveal">
        <p className="section-index">02 / THE DAY</p>
        <div className="date-lockup"><span>JAN</span><strong>17</strong><span>SUN<br />2027</span></div>
        <p className="detail-time">1:00 PM</p>
        <p className="venue">하우스 오브 더 라움<br />벨루스홀</p>
        <div className="countdown"><span>WEDDING DAY IN</span><strong>{daysLeft}</strong><span>DAYS</span></div>
      </section>

      <section className="gallery reveal">
        <div className="gallery-heading"><p className="section-index">03 / MOMENTS</p><h2>우리의<br /><em>beautiful</em> scenes</h2></div>
        <div className="gallery-grid">
          {photos.slice(2, 14).map((photo, index) => (
            <img key={photo} className={`gallery-image image-${index + 1}`} src={`${import.meta.env.BASE_URL}${photo}`} alt={`박민균과 김희연의 웨딩 사진 ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="location reveal">
        <p className="section-index">04 / JOIN US</p>
        <h2>우리 결혼식에<br /><em>놀러 오세요.</em></h2>
        <p className="body-copy">2027년 1월 17일 일요일<br />오후 1시, 하우스 오브 더 라움 벨루스홀</p>
        <a className="map-frame" href={naverVenueUrl} target="_blank" rel="noreferrer" aria-label="네이버 지도에서 하우스 오브 더 라움 위치 보기">
          <img src={venueMapImageUrl} alt="하우스 오브 더 라움 약도" loading="lazy" />
          <span className="map-overlay">네이버 지도에서 보기 <b>↗</b></span>
        </a>
        <p className="address">서울특별시 광진구 능동로 81, B1<br /><small>02-6457-8100 · 건대입구역 5번 출구</small></p>
        <div className="directions">
          <p className="directions-title">Getting there</p>
          {directions.map(([type, detail]) => (
            <div className="direction-row" key={type}><b>{type}</b><span>{detail}</span></div>
          ))}
        </div>
        <div className="account-area">
          <p className="account-title">마음 전하실 곳</p>
          <div className="account-list">
            <div className="account-row">
              <span><b>신랑</b> 박민균<br /><small>국민은행</small></span>
              <strong>024802-04-248253</strong>
              <button type="button" onClick={() => copyAccount('024802-04-248253', 'groom')}>{copiedAccount === 'groom' ? '복사됨' : '복사'}</button>
            </div>
            <div className="account-row">
              <span><b>신부</b> 김희연<br /><small>신한은행</small></span>
              <strong>110-536-892857</strong>
              <button type="button" onClick={() => copyAccount('110-536-892857', 'bride')}>{copiedAccount === 'bride' ? '복사됨' : '복사'}</button>
            </div>
            <div className="account-row">
              <span><b>혼주</b> 주효정<br /><small>신랑측</small></span>
              <strong>0000</strong>
              <button type="button" onClick={() => copyAccount('0000', 'groom-parent')}>{copiedAccount === 'groom-parent' ? '복사됨' : '복사'}</button>
            </div>
            <div className="account-row">
              <span><b>혼주</b> 김정호 · 이상숙<br /><small>신부측</small></span>
              <strong>0000</strong>
              <button type="button" onClick={() => copyAccount('0000', 'bride-parent')}>{copiedAccount === 'bride-parent' ? '복사됨' : '복사'}</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer"><p className="script">See you there</p><p>MIN GYUN &amp; HEE YEON</p><small>17 · 01 · 2027</small></footer>
    </main>
  );
}

export default App;