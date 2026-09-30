const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const faqToggles = Array.from(document.querySelectorAll("[data-faq-toggle]"));
const weightInput = document.querySelector("[data-weight-input]");
const rateOutput = document.querySelector("[data-rate-output]");

const rates = [
  { weight: 1, price: 5.75 },
  { weight: 2, price: 9.92 },
  { weight: 3, price: 13.07 },
  { weight: 4, price: 16.22 },
  { weight: 5, price: 19.37 },
  { weight: 6, price: 22.52 },
  { weight: 7, price: 25.67 },
  { weight: 8, price: 28.82 },
  { weight: 9, price: 31.97 },
  { weight: 10, price: 35.12 },
  { weight: 11, price: 38.5 },
  { weight: 12, price: 41.76 },
  { weight: 13, price: 45.21 },
  { weight: 14, price: 48.41 },
  { weight: 15, price: 51.57 },
  { weight: 16, price: 54.69 },
  { weight: 17, price: 57.77 },
  { weight: 18, price: 60.8 },
  { weight: 19, price: 63.8 },
  { weight: 20, price: 66.76 },
  { weight: 21, price: 70.14 },
  { weight: 22, price: 73.48 },
  { weight: 23, price: 76.82 },
  { weight: 24, price: 80.16 },
  { weight: 25, price: 83.5 },
  { weight: 26, price: 86.84 },
  { weight: 27, price: 90.18 },
  { weight: 28, price: 93.52 },
  { weight: 29, price: 96.86 },
  { weight: 30, price: 100.2 },
  { weight: 33, price: 110.22 },
  { weight: 34, price: 113.56 },
  { weight: 35, price: 116.9 },
  { weight: 37, price: 123.58 },
  { weight: 38, price: 126.92 },
  { weight: 40, price: 133.6 },
  { weight: 43, price: 143.62 },
  { weight: 44, price: 146.96 },
  { weight: 45, price: 150.3 },
  { weight: 46, price: 153.64 },
  { weight: 47, price: 156.98 },
  { weight: 50, price: 167 },
  { weight: 51, price: 170.34 },
  { weight: 52, price: 173.68 },
  { weight: 53, price: 177.02 },
  { weight: 54, price: 180.36 },
  { weight: 55, price: 183.7 },
  { weight: 56, price: 187.04 },
  { weight: 57, price: 190.38 },
  { weight: 58, price: 193.72 },
  { weight: 59, price: 197.06 },
  { weight: 60, price: 200.4 },
  { weight: 61, price: 203.74 },
  { weight: 62, price: 207.08 },
  { weight: 63, price: 210.42 },
  { weight: 64, price: 213.76 },
  { weight: 65, price: 217.1 },
  { weight: 71, price: 237.14 },
  { weight: 100, price: 334 },
  { weight: 122, price: 407.48 }
];

const rateByWeight = new Map(rates.map((rate) => [rate.weight, rate.price]));
const formatPrice = (amount) => `$${amount.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

let activeSlide = 0;
let slideTimer;

const showSlide = (index) => {
  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });
};

const startSlider = () => {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
};

showSlide(0);
startSlider();

faqToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const item = toggle.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

const updateRate = () => {
  if (!weightInput || !rateOutput) return;

  const weight = Math.min(122, Math.max(1, Math.round(Number(weightInput.value) || 1)));
  weightInput.value = String(weight);
  const price = rateByWeight.get(weight);
  rateOutput.textContent = price ? formatPrice(price) : "No listed rate";
};

weightInput?.addEventListener("input", updateRate);
updateRate();
