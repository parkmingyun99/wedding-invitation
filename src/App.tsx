import { useEffect, useState } from 'react';

const photos = [
  '원본-1.jpg', '원본-110.jpg', '원본-173.jpg', '원본-188.jpg',
  '원본-195.jpg', '원본-24.jpg', '원본-375.jpg', '원본-495.jpg',
  '원본-530.jpg', '원본-536.jpg', '원본-587.jpg', '원본-601.jpg',
  '원본-604.jpg', '원본-617.jpg', '원본-651.jpg', '원본-658.jpg',
  '원본-659.jpg', '원본-834.jpg', '원본-87.jpg', '원본-886.jpg',
  '원본-95.jpg', '원본-957.jpg',
];

function App() {
  const [daysLeft, setDaysLeft] = useState(0);

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
        <div className="names"><span>박민균</span><i>그리고</i><span>김희연</span></div>
      </section>

      <section className="feature-photo reveal">
        <img src={`${import.meta.env.BASE_URL}원본-110.jpg`} alt="신랑 신부의 자연스러운 순간" />
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
        <div className="map-card"><div className="map-lines" /><span>HOUSE OF THE RAUM<br /><b>VELLUS HALL</b></span></div>
        <p className="address">서울특별시 광진구 능동로 81, B1<br /><small>02-6457-8100 · 건대입구역 5번 출구</small></p>
        <a className="map-link" href="https://houseoftheraum.co.kr/location/" target="_blank" rel="noreferrer">장소 안내 보기 <span>↗</span></a>
      </section>

      <footer className="footer"><p className="script">See you there</p><p>MIN GYUN &amp; HEE YEON</p><small>17 · 01 · 2027</small></footer>
    </main>
  );
}

export default App;