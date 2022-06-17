'use strict';

///////////////////////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const header = document.querySelector('header');

const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improvement functionality and analytics. <button class="btn btn--close-cookie"> Got it!</button>';
header.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383c';
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 30 + 'px';


btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//page navigatoion

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navbar
const navHeight=nav.getBoundingClientRect();
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin:navHeight.height+'px',
});

headObserver.observe(header);

//Reveal sections
const allSection=document.querySelectorAll('.section')

const revealSection=function(entries,observer){
  const[entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver=new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.2,
});

allSection.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

//Lazy loading images
const imgTargets=document.querySelectorAll('img[data-src]')

const loadImg=function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return;
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
};

const imgObserver=new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'-200px',
})

imgTargets.forEach(img=>imgObserver.observe(img));

//slider
const slides=document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
let curslide=0;

slides.forEach((s,i)=>(s.style.transform=`translateX(${100*i}%)`))

const createDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"> </button>`);
  });
};
createDots();

const activeDot=function(slide){
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

activeDot(0)

const rightSlide=function(){
  if(curslide==slides.length-1)
  curslide=-1;
  curslide++;
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i-curslide)}%)`));
  activeDot(curslide);
}

const leftSlide=function () {
  if(curslide==0)
  curslide=slides.length;
  curslide--;
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curslide)}%)`)
  );
  activeDot(curslide);
}

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

btnRight.addEventListener('click',rightSlide)

btnLeft.addEventListener('click',leftSlide);

document.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight') rightSlide();
  else if(e.key==='ArrowLeft') leftSlide();
})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
    curslide=slide;
  }
})

window.addEventListener('load',function(e){
  console.log("Page loaded");
})

window.addEventListener('beforeunload',function(e){
  e.preventDefault();
  e.returnValue='';
})

