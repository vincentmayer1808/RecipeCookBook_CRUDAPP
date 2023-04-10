
const createButton = document.getElementById('create')
createButton.addEventListener('click', create)

const recipes = []

function create(event) {
    event.preventDefault()
    const recipe = readForm()
    createArticle(recipe)
    clearForm()
    saveDataLS()
}

function readForm() {
    const nameInput = document.getElementById('name')
    const categorieInput = document.getElementById('categorie')
    const ingredientsInput = document.getElementById('ingredients')
    const instructionsInput = document.getElementById('instructions')

    const recipe = {
        name: nameInput.value,
        categorie: categorieInput.value,
        ingredients: ingredientsInput.value,
        instructions: instructionsInput.value
    }

    recipes.push(recipe)
    return recipe

}

function createArticle(recipe) {

    const recipesList = document.getElementById('recipes')
    recipesList.innerHTML += `
        <article id="fullArticle">
            <div class="articletop">
                <div class="recipe">
                    <h3>${recipe.name}</h3>
                    <span>${recipe.categorie}</span>
                </div>
                <div class="button">
                    <button id="edit">Edit</button>
                    <button id="delete">Delete</button>
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
    const recipes = JSON.parse(localStorage.getItem('recipes'))
    recipes.forEach((el) => createArticle(el))
}

readFromLS()

const editButton = document.getElementById('edit')
editButton.addEventListener('click', editRecipe)

function editRecipe() {
    const recipe = document.getElementById('fullArticle')
    
}

const deleteButton = document.getElementById('delete')
deleteButton.addEventListener('click', deleteRecipe)

function deleteRecipe() {
    const element = document.getElementById('fullArticle')
 
    deleteFromLS(element)
    element.remove()

}

function deleteFromLS() {
    localStorage.removeItem('this')
}