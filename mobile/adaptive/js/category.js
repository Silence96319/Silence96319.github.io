window.onload = () => {

  document.querySelector('.jd_cateLeft').addEventListener('touchmove', (e) => {
    e.preventDefault()
  })

  document.querySelector('.jd_cateRight').addEventListener('touchmove', (e) => {
    e.preventDefault()
  })

  new IScroll(document.querySelector('.jd_cateLeft'), {
    scrollX: false,
    scrollY: true
  })

  new IScroll(document.querySelector('.jd_cateRight'), {
    scrollX: false,
    scrollY: true
  })
}
