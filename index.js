document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const quote = document.querySelector('.quote');
    const subQuote = document.querySelector('.sub-quote');

    const images = [
        { url: "image1.jpg", quote: 'Experience the Serenity', subQuote: 'Your perfect getaway awaits.' },
        { url: "image2.jpg", quote: 'Discover New Horizons', subQuote: 'Adventure is out there.' },
        { url: "image3.jpg", quote: 'Relax and Recharge', subQuote: 'Find your inner peace.' },
    ];

    let currentIndex = 0;

    
    function changeBackground() {
      currentIndex = (currentIndex+1) % images.length; // Loop through images
      // Change background image
      const newStyle = `
        .hero::before{
          background-image: url(${images[currentIndex].url});
        }
      `;
      let styleTag = document.getElementById('dynamicHeroStyle');
      if (styleTag) {
          styleTag.textContent = newStyle;
      } else {
          styleTag = document.createElement('style');
          styleTag.id = 'dynamicHeroStyle';
          styleTag.textContent = newStyle;
          document.head.appendChild(styleTag);
      }

      quote.textContent = images[currentIndex].quote;
      subQuote.textContent = images[currentIndex].subQuote;
    }

    changeBackground();

    setInterval(changeBackground, 6000);


  });


  document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    const facilities = document.querySelectorAll('.facility');
    const revealOnScroll = () => {
      features.forEach(feature => {
        const rect = feature.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          feature.style.animation = 'curtainEffect2 1s ease';
          feature.style.opacity = '1';
        }
      });

      facilities.forEach((facility, index) => {
        const rect = facility.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          facility.style.transform= 'scale(1)';
          facility.style.transition= 'transform 0.3s ease, box-shadow 0.3s ease';
          facility.style.opacity = '0';
          facility.style.animation = `fadeInUp 2s ease forwards`;
          const delay = index % 2 === 0 ? 0.2 : 0.4; // 0.2s for even, 0.4s for odd
          facility.style.animationDelay = `${delay}s`;
        }
      });
    };
  
    window.addEventListener('scroll', revealOnScroll);
  });

// booking functionality

const maxReservationsPerDay = 10;
const reservations = {}; // Stores reservation counts for each day

// Disable dates with max reservations
function updateCalendar() {
    const checkInDate = document.getElementById('checkInDate');
    checkInDate.addEventListener('change', () => {
        const date = checkInDate.value;
        if (reservations[date] >= maxReservationsPerDay) {
            alert('Reservations for this date are full. Please choose another date.');
            checkInDate.value = '';
        }
    });
}

updateCalendar();





  