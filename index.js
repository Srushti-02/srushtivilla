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


// payment
// Get references to the form and QR code pages
const formPage = document.getElementById("form-page");
const qrPage = document.getElementById("qr-page");
const receiptPage = document.getElementById("receipt-page");


// Get the Generate button and Back button
const generateButton = document.getElementById("generate-button");
const backButton = document.getElementById("back-button");
const receiptDetails = document.getElementById("receipt-details");


// Add event listener to Generate button
generateButton.addEventListener("click", function () {
  // Step 1: Create a transaction ID (UUID or from backend)
  const transactionId = `TXN${Date.now()}`; // Example transaction ID
  const upiId = "9529474135@axl";
  const amount = 1;
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  // Step 2: Generate UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tid=${transactionId}`;

    // Step 3: Generate QR Code
  const qrCode = new QRious({
    element: document.getElementById("qr-code"),
    size: 200,
    value: upiLink,
  });

  // Switch to QR code page
  formPage.style.display = "none";
  qrPage.style.display = "block";

  // Step 4: Poll for payment confirmation
  checkPaymentStatus(transactionId, name, mobile, amount);
});

async function checkPaymentStatus(transactionId, name, mobile, amount) {
  try {
    // Poll the server every 3 seconds for payment status
    const interval = setInterval(async () => {
      const response = await fetch(`/api/check-payment-status?transactionId=${transactionId}`);
      const data = await response.json();

      if (data.status === "SUCCESS") {
        clearInterval(interval);

        // Step 5: Show the receipt
        receiptDetails.innerHTML = `
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Mobile Number:</strong> ${mobile}</p>
          <p><strong>Amount Paid:</strong> INR ${amount}</p>
          <p><strong>Transaction ID:</strong> ${transactionId}</p>
          <p><strong>Payment Status:</strong> Successful</p>
        `;

        qrPage.style.display = "none";
        receiptPage.style.display = "block";
      }
    }, 3000);
  } catch (error) {
    console.error("Error checking payment status:", error);
  }
}

// Add event listener to Back button
backButton.addEventListener("click", function () {
  // Clear QR code
  document.getElementById("qr-code").getContext("2d").clearRect(0, 0, 200, 200);

  // Switch back to form page
  formPage.style.display = "block";
  qrPage.style.display = "none";
});




  