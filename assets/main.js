
const createButton = document.getElementById('create')
createButton.addEventListener('click', create)

const updateButton = document.getElementById('update')
updateButton.addEventListener('click', updateRecipe)

let recipes = []

function create(event) {
    event.preventDefault()
    const recipe = readForm()
    recipes.push(recipe)
    createArticle(recipe)
    clearForm()
    saveDataLS()
}

const nameInput = document.getElementById('name')
const categorieInput = document.getElementById('categorie')
const ingredientsInput = document.getElementById('ingredients')
const instructionsInput = document.getElementById('instructions')
const recipesList = document.getElementById('recipes')

function readForm() {

    const recipe = {
        name: nameInput.value,
        categorie: categorieInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value,
        id: Date.now()
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
                    <button onclick="editArticle(${recipe.id})">Edit</button>
                    <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                </div>
            </div>
            <div class="articlebottom">
                <ul>
                    <h4>Ingredients</h4>
                    <li>${recipe.ingredients}</li>
                </ul>
                <ol>
                    <h4>Step By Step</h4>
                    <li>${recipe.instructions}</li>
                </ol>
            </div>
        </article> 
    `
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

readFromLS()

function deleteRecipe(id) {
    const index = recipes.findIndex((recipe) => recipe.id === id)
    recipes.splice(index, 1)
    saveDataLS()
    readFromLS()
    recipesList.innerHTML = ``
    recipes.forEach((el) => createArticle(el))
}

function editArticle(id) {
    createButton.classList.add('hide')
    updateButton.classList.remove('hide')
    const index = recipes.findIndex((recipe) => recipe.id === id)
    const recipe = recipes[index]

    nameInput.value = recipe.name
    categorieInput.value = recipe.categorie
    ingredientsInput.value = recipe.ingredients
    instructionsInput.value = recipe.instructions

}

function updateRecipe() {
    const recipe = readForm()
    const index = recipes.findIndex((recipe) => recipe.id === recipe.id)
    recipes[index] = recipe
    clearForm()
    saveDataLS()
    readFromLS()
    recipes.forEach((el) => createArticle(el))

}