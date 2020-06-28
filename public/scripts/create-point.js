function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]") 
    const stateInput = document.querySelector("[name=state]")// busca no HTML

    const ufValue = event.target.value
     
    const indexOfSelectdState = event.target.selectedIndex
    stateInput.value = event.target.options [indexOfSelectdState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value=>Seleciona o Estado</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for( const city of cities) {
           citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    } )

}

  
 
// depois vai rodar o ouvidor de eventos
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLI = event.target
    
    // adiconar ou remover uma class JS.
    itemLI.classList.toggle("selected")
    const itemId = itemLI.dataset.id

    // verificar se existem itens selecionados se nao
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item  => {
        const itemFound = item == itemId
        return itemFound
    }) 

    if (alreadySelected >= 0) {
        // tirar de seleção
        const filteredItems = selectedItems.filter( item  => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent  
        })

        selectedItems = filteredItems
    } else {
        // se nao estiver selecinado 
        // adicina a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido  
    collectedItems.value = selectedItems

}
 
