const loadImages = (target: any) => {
  target.src = target.dataset.src;
  target.removeAttribute('data-src')
  target.classList.remove("skeleton")

}

export function lazyLoadImagesEffect(imageElements: any[]) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, imgObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            imgObserver.unobserve(entry.target);
            loadImages(entry.target);
          }
        });
      },
      {
        threshold: 1
      }
    );

    imageElements.forEach(imageElement => {
      observer.observe(imageElement);
    });
  } else {
    imageElements.forEach(loadImages);
  }
}
