// class Formulario {
//   constructor(){
//     this.ufSelect = document.querySelector('select[name=uf]')
//     this.getEstados()
//     this.handleSelectUF()
//   }

//   handleSelectUF() {
//     this.ufSelect.addEventListener('change', this.getIdCidade)
//   }

//   async getEstados() {
//     await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
//       .then(resp => resp.json())
//       .then(estados => {
//         estados.forEach((estado) => {
//           this.ufSelect.appendChild(this.createOption(estado.id, estado.nome))
//         })
//       })
//   }

//   async getIdCidade(event) {
//     let id = event.target.value
//     let citySelect = document.querySelector('select[name=city]')
//     citySelect.disabled = true

//     await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
//       .then(resp => resp.json())
//       .then(cidades => {
//         citySelect.innerHTML = ''
//         cidades.forEach((cidade) => {
//           citySelect.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
//         })
//         citySelect.disabled = false
//       })
//   }

//   createOption(id, value) {
//     let option = document.createElement('option')
//     let optionText = document.createTextNode(value)
//     option.setAttribute('value', id)
//     option.appendChild(optionText)
//     return option
//   }

// }

// new Formulario();

let ufSelect = document.querySelector('select[name=uf]')

function populateUFs() {
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(estados => {
      estados.forEach(estado => {
        ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
      })
    })
}

populateUFs()

function getCities(event) {
  let citySelect = document.querySelector('select[name=city]')
  let stateIpunt = document.querySelector('input[name=state]')

  const idCity = event.target.value
  const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idCity}/municipios`
  
  stateIpunt.value = event.target.options[event.target.selectedIndex].text

  citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
  citySelect.disabled = true

  fetch(urlCity)
    .then(res => res.json())
    .then(cities => {
      
      cities.forEach(city => {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      })
      citySelect.disabled = false

    })
}

ufSelect.addEventListener('change', getCities)


// itens de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')
itemsToCollect.forEach(item => {
  item.addEventListener('click', handleSelectedItem)
})

let collectedItems = document.querySelector('input[name=items]')
let selectItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id

  itemLi.classList.toggle('selected')

  // Verificar se existem itens selecionados, se sim
  // pegar os itens selecionados
  const alreadySelected = selectItems.findIndex(item => item == itemId)

  // se tiver selecionado, tirar da seleção
  if(alreadySelected >= 0) {
    // tirar da seleção
    const filteredItems = selectItems.filter(item => {
      const itemDiferent = item != itemId
      return itemDiferent
    })
    selectItems = filteredItems

  } else {
    selectItems.push(itemId)
  }

  collectedItems.value = selectItems

}


