//params: nodeClassName（images palceHolder styleClassName）
function addlazyLoadImages(nodeClassName) {
    document.addEventListener('DomContentLoaded', () => {
        let lazyLoadImages = document.querySelector(nodeClassName);
        if ('IntersectionObserver' in window) {
            const imagesObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(item => {
                    if (item.isIntersecting) {
                        let image = item.target;
                        image.src = image.dataset.src;
                        image.classList.remove(nodeClassName);
                        imagesObserver.unobserve(image);
                    }
                })
            })
            lazyLoadImages.forEach(image => {
                imagesObserver.observe(image);
            })
        } else {
            function lazyLoad() {
                if (lazyLoadThrottleTimeout) {
                    clearTimeout(lazyLoadThrottleTimeout);
                }
                lazyLoadThrottleTimeout = setTimeout(() => {
                    const windowInnerHeight = window.innerHeight,
                    const windowScollY = window.pageYOffset;
                    lazyLoadImages.forEach(image => {
                    if ((windowInnerHeight+windowScollY) > image.scrollTop) {
                        image.src = image.dataset.src;
                        images.classList.remove(nodeClassName);
                    }
                    })

                    if (lazyLoadImages.length == 0) {
                        document.removeEventListener('scroll', lazyLoad);
                        window.removeEventListener('resize',  lazyLoad);
                        window.removeEventListener('orientationChange',  lazyLoad);
                    }
                }, 20)
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);

        }
    })
}
