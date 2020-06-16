const buttonSearch = document.querySelector('#page_home .main a')
const modal = document.querySelector('#modal')
const close = document.querySelector('#modal .header a')

// aparece a tela pra procurar cidade
buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide')
})

// fecha a janela pra procurar cidade
close.addEventListener('click', () => {
    modal.classList.add('hide')
})
