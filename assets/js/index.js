const searchbar = document.getElementById('searchbar');
const ingredientInput = document.getElementById('ingrediant-searchbar');
var ingredientTable = [];
const dropdown = document.querySelector('.filter-ingredient .fa-angle-down');
const dropup = document.querySelector('.filter-ingredient .fa-angle-up');
const listeIngredientsDIV = document.getElementById('liste-ingredients');
const tagContainer = document.getElementById('tag-container');
var ingredientID = [];


/*------------------------------------ Ingrédients ------------------------------------*/

//Création du tableau d'ingrédient complet
recipes.forEach((recipe)=>{
    for(let i =0; i<recipe.ingredients.length; i++){
        if(!ingredientTable.includes(recipe.ingredients[i].ingredient)){
            ingredientTable.push(recipe.ingredients[i].ingredient);
        }
    }
})

//Création HTML de tous les ingrédients
ingredientTable.forEach((ingredient)=>{
    const name = document.createElement('p',ingredient);
    name.setAttribute('class', 'single-ingredient');
    name.textContent = ingredient;
    name.setAttribute('id', ingredient);
    listeIngredientsDIV.append(name);
})

var singleIngredient = document.querySelectorAll(".single-ingredient");
createTag();

//Affichage de la liste des ingrédients
dropdown.addEventListener('click', function(){
    listeIngredientsDIV.style.display = "flex";
    dropdown.style.display = "none";
    dropup.style.display = "flex";
})

//Cacher la liste des ingrédients
dropup.addEventListener('click', function(){
    dropdown.style.display = "flex";
    dropup.style.display = "none";
    listeIngredientsDIV.style.display = "none";
})

//affichage de la liste des ingrédient lorsque l'utilisateur tape sur son clavier
ingredientInput.addEventListener('keyup', function(){
    if(ingredientInput.value.trim().length > 1){
        listeIngredientsDIV.style.display = "flex";
        dropdown.style.display = "none";
        dropup.style.display = "flex";
        var searchValue = ingredientInput.value;
    }else{
        var searchValue = ''
        dropdown.style.display = "flex";
        dropup.style.display = "none";
        listeIngredientsDIV.style.display = "none";
    }
    filteredIngredientTable(searchValue);
})

//création du nouveau tableau d'ingrédients a afficher
function filteredIngredientTable(value){
    if(value ==""){
        renderFilteredIngredients(ingredientTable);
        return;
    }
    var filteredIngredients = [];
    ingredientTable.forEach((ingredient)=>{
        if(value !== "" && ingredient.toLowerCase().includes(value.toLowerCase())){
            filteredIngredients.push(ingredient);
        }
    })
    renderFilteredIngredients(filteredIngredients);
}

//Création des ingrédients filtrés
function renderFilteredIngredients(searchValue){
    listeIngredientsDIV.innerHTML = "";
    listeIngredientsDIV.style.display = "flex";
    searchValue.forEach((ingredient)=>{
        const name = document.createElement('p',ingredient);
        name.setAttribute('class', 'single-ingredient');
        name.textContent = ingredient;
        name.setAttribute('id', ingredient);
        listeIngredientsDIV.append(name);
    })
    singleIngredient = document.querySelectorAll(".single-ingredient");
    createTag();
}

/*------------------------------------ Tags ------------------------------------*/

//création des tags
function createTag(){
    singleIngredient.forEach((ingredient)=>{
        ingredient.addEventListener('click', function(){
            const tagDiv = document.createElement("div");
            const tagName = document.createElement("p");
            const tagDelete = document.createElement("i");
            tagDelete.setAttribute("class","far fa-times-circle");
            tagName.textContent = ingredient.id;
            tagDiv.setAttribute("class", "single-tag ingredient");
            tagDiv.append(tagName, tagDelete);
            tagContainer.append(tagDiv);
            filterWithTags();
            
        }, {once : true})
    })
}

var deleteTag = document

function filterWithTags(){
    var allTags = document.querySelectorAll('.single-tag p');
    var tagsTable = [];
    allTags.forEach((tag)=>{
        tagsTable.push(tag.textContent);
    })
    filteredRecipesWithTags(tagsTable);
}

function filteredRecipesWithTags(tags){
    var filteredRecipesWithTags = [];
    recipes.forEach((recipe)=>{
        tags.forEach((tag)=>{
            if(recipe.ingredient === tag){
                console.log('recipe : '+ recipe.ingredient + 'tag : ' + tag);
            }else{console.log('recipe : '+ recipe.ingredient + 'tag : ' + tag);}
        })
    })
}

/*------------------------------------ Barre de recherche ------------------------------------*/

//Récupération de la valeur de la barre de recherche
searchbar.addEventListener('keyup', function(){
    if(searchbar.value.length > 1){
        var searchValue = searchbar.value;
    }
    createRecipeTable(searchValue);
})

//création d'un nouveau tableau de recette en fonction de ce que tape l'utilisateur dans la barre de recherche
function createRecipeTable(value){
    var filteredRecipes = []; 
    recipes.forEach((recipe)=>{
        if(recipe.name.toLowerCase().includes(value.toLowerCase()) || recipe.description.toLowerCase().includes(value.toLowerCase())){
            filteredRecipes.push(recipe);
        }
        
    });
    renderRecipe(filteredRecipes);
}

//création des recettes HTML
function renderRecipe(searchValue){
    var recetteContainer = document.getElementById('recette-container');
    recetteContainer.innerHTML = "";
    searchValue.forEach(recipe => {
        //création des élément de chaque recette
        const article = document.createElement('article');
        const img = document.createElement('div');
        const infoContainer = document.createElement('div');
        const primaryInfos = document.createElement('div');
        const h3 = document.createElement('h3');
        const primaryDIV = document.createElement('div');
        const icon = document.createElement('i');
        const timeP = document.createElement('p');
        const recette = document.createElement('div');
        const listeIngredients = document.createElement('ul');
        for(let i =0; i<recipe.ingredients.length; i++){
            var li = document.createElement('li');
            var dosage = document.createElement('p');
            var ingredient = document.createElement('strong');
            if(recipe.ingredients[i].unit == undefined || recipe.ingredients[i].quantity == undefined){
                var unite = "";
            }else{
                var unite = recipe.ingredients[i].unit
            }
            dosage.textContent = recipe.ingredients[i].quantity + ' ' + unite;
            ingredient.textContent = recipe.ingredients[i].ingredient + ' :';
            li.append(ingredient, dosage);
            listeIngredients.append(li);
        }
        const preparation = document.createElement('p');
        //création des attributs
        img.setAttribute('class', 'img-recette');
        infoContainer.setAttribute('class', 'infos-container');
        primaryInfos.setAttribute('class','primary-infos');
        icon.setAttribute('class', 'far fa-clock');
        timeP.setAttribute('class', 'time');
        recette.setAttribute('class','recette');
        listeIngredients.setAttribute('class','ingrediants');
        preparation.setAttribute('class','preparation');
        //insertion des éléments html
        h3.textContent = recipe.name;
        timeP.textContent = recipe.time + ' min';
        primaryDIV.append(icon,timeP);
        primaryInfos.append(h3, primaryDIV);
        preparation.textContent = recipe.description;
        recette.append(listeIngredients, preparation);
        infoContainer.append(primaryInfos, recette);
        article.append(img,infoContainer);
        recetteContainer.append(article);
        
    });
}

