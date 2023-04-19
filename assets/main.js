const createButton = document.getElementById('create')
createButton.addEventListener('click', create)

const updateButton = document.getElementById('update')
updateButton.addEventListener('click', updateRecipe)

let recipes = []
let idEditing = null

function create(event) {
    event.preventDefault()
    const recipe = readForm()
    recipes.push(recipe)
    createArticle(recipe)
    clearForm()
    saveDataLS()
    location.href = `#fullArticle${recipe.id}`
}

const nameInput = document.getElementById('name')
const categorieInput = document.getElementById('categorie')
const ingredientsInput = document.getElementById('ingredients')
const instructionsInput = document.getElementById('instructions')
const recipesList = document.getElementById('recipes')

function readForm() {
    let id = Date.now()
    if (idEditing !== null) {
        id = idEditing
    }
    const recipe = {
        name: nameInput.value,
        categorie: categorieInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value,
        id
    }
    return recipe
}

function createArticle(recipe) {
    recipesList.innerHTML += `
        <article id="fullArticle${recipe.id}">
            <div class="articletop">
                <div class="recipe">
                    <h3>${recipe.name}</h3>
                    <span>${recipe.categorie}</span>
                </div>
                <div class="button">
                    <a href="#createrecipe"><button onclick="editArticle(${recipe.id})">Edit</button></a>
                    <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                </div>
            </div>
            <div class="articlebottom">
                <ul>
                    <h4>Ingredients</h4>
                    ${toList(recipe.ingredients)}
                </ul>
                <ol>
                    <h4>Step By Step</h4>
                    ${toList(recipe.instructions)}
                </ol>
            </div>
        </article> 
    `
}

function toList(text) {
    let lines = text.split('\n')
    let html = lines
        .filter(line => line.trim() !== '')
        .map(line => `<li>${line}</li>`)
        .join('')
    return html
}

function clearForm() {
    const form = document.getElementById('form')
    form.reset()
}

function saveDataLS() {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

function readFromLS() {
    const recipesLS = JSON.parse(localStorage.getItem('recipes'))
    if (recipesLS) {
        recipes = recipesLS
        recipes.forEach((el) => createArticle(el))
    } else {
        recipes = []
    }
}

function deleteRecipe(id) {
    Swal.fire({
        title: 'Are you sure you want to delete this recipe?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(248, 169, 22)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = recipes.findIndex((recipe) => recipe.id == id)
            recipes.splice(index, 1)
            saveDataLS()
            readFromLS()
            recipesList.innerHTML = ``
            recipes.forEach((el) => createArticle(el))
            Swal.fire(
                'Deleted!',
                'Your recipe has been deleted.',
                'success'
            )
        }
    })

}

function editArticle(id) {
    createButton.classList.add('hide')
    updateButton.classList.remove('hide')
    const index = recipes.findIndex((recipe) => recipe.id == id)
    const recipe = recipes[index]

    nameInput.value = recipe.name
    categorieInput.value = recipe.categorie
    ingredientsInput.value = recipe.ingredients
    instructionsInput.value = recipe.instructions

    idEditing = id
}

function updateRecipe(e) {
    e.preventDefault()
    const recette = readForm()
    const index = recipes.findIndex((receta) => receta.id == recette.id)
    recipes[index] = recette
    saveDataLS()
    clearForm()

    createButton.classList.remove('hide')
    updateButton.classList.add('hide')
    idEditing = null

    recipesList.innerHTML = ``
    readFromLS()
    location.href = `#fullArticle${recette.id}`
}

readFromLS()