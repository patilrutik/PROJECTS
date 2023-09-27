const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxText = document.getElementById('lightbox-text');

// Array of image URLs and text descriptions
const imageData = [
  {
    src: 'Images/img1.jpg',
    text: ' Image 1',
  },
  {
    src: 'Images/img2.jpg',
    text: ' Image 2',
  },
  {
    src: 'Images/img3.jpg',
    text: ' Image 3',
  },
  {
    src: 'Images/img4.jpg',
    text: ' Image 4',
  },
  {
    src: 'Images/img5.jpg',
    text: ' Image 5',
  },
  {
    src: 'Images/img6.jpg',
    text: ' Image 6',
    text: ' Image 6',
  },
  {
    src: 'Images/img7.jpg',
    text: ' Image 7',
  },
  {
    src: 'Images/img8.jpg',
    text: ' Image 8',
  },
  {
    src: 'Images/img9.jpg',
    text: ' Image 9',
  },
  {
    src: 'Images/img10.jpg',
    text: ' Image 10',
  },
  // Add more image URLs and text descriptions here as needed
];

function openLightbox(index) {
  const imageInfo = imageData[index];
  lightboxImage.src = imageInfo.src;
  lightboxText.textContent = imageInfo.text;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

// Close the lightbox when pressing the Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});