function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((res) => res.json())
        .then((states) => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    // traz o target do evento, ou seja, o valor do estado em questão
    const ufValue = event.target.value

    // fala o index do estado selecionado e salva
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // limpa o campo da cidade pra poder atualizar e bloqueia a opção novamente
    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(url)
        .then((res) => res.json())
        .then((cities) => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

// quando mudar, executa getCities
document.querySelector('select[name=uf]').addEventListener('change', getCities)

// Items de Coleta
// pegar todos os li

const itemsToCollect = document.querySelectorAll('.items_grid li')

for (let item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

// input vazio no primeiro momento
const collectedItems = document.querySelector('input[name=items]')

// array pra colocar ou tirar dados das opções selecionadas
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // add ou remove uma classe com js - toggle = add/remove -> se exsistir, remove, se nao, add
    itemLi.classList.toggle('selected')

    // vai salvar na variável o id de cada li (1, 2, .., 6)
    const itemId = itemLi.dataset.id

    // verificar se tem items selecionados
    // se sim, pega-los

    // alreadySelected retorna 0 a 5 (index) se possuir algo - se retornar -1, é pq nao tem nada
    const alreadySelected = selectedItems.findIndex((item) => item === itemId) //compara todos os itens até retornar true

    // se ja estiver selecionado, tirar da seleção []

    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId
            return false
        })

        // atualiza a array
        selectedItems = filteredItems
    } else {
        // se nao estiver selecionado, adicionar a seleção []
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido (input hidden) com os items selecionados
    collectedItems.value = selectedItems
}
