/*------------------------------------ Eléments recettes ------------------------------------*/

//Création des différents tableau d'éléments
var ingredientTable = [];
var applianceTable = [];
var ustensileTable = [];
var filteredRecipes = recipes;
defaultDisplay();

filteredRecipes.forEach((recipe)=>{
    for(let i =0; i<recipe.ingredients.length; i++){
        if(!ingredientTable.includes(recipe.ingredients[i].ingredient)){
            ingredientTable.push(recipe.ingredients[i].ingredient);
        }
    }
    if(!applianceTable.includes(recipe.appliance)){
        applianceTable.push(recipe.appliance);
    }
    for(let i = 0; i<recipe.ustensils.length; i++){
        if(!ustensileTable.includes(recipe.ustensils[i])){
            ustensileTable.push(recipe.ustensils[i]);
        }
    }
})

/*------------ Créations des listes HTML ------------*/
const listeIngredientsDIV = document.getElementById('liste-ingredients');
const listeAppliancesDIV = document.getElementById('liste-appareils');
const listeUstensilesDIV = document.getElementById('liste-ustensiles');

function createElementHTML(){
    //Création HTML de tous les ingrédients
    ingredientTable.forEach((ingredient)=>{
        const name = document.createElement('p',ingredient);
        name.setAttribute('class', 'single-ingredient');
        name.textContent = ingredient;
        name.setAttribute('id', ingredient);
        listeIngredientsDIV.append(name);
    })

    //Création HTML de tous les appareils
    applianceTable.forEach((appliance)=>{
        const name = document.createElement('p',appliance);
        name.setAttribute('class', 'single-appliance');
        name.textContent = appliance;
        name.setAttribute('id', appliance);
        listeAppliancesDIV.append(name);
    })

    //Création HTML de tous les ustensiles
    ustensileTable.forEach((ustensile)=>{
        const name = document.createElement('p',ustensile);
        name.setAttribute('class', 'single-ustensile');
        name.textContent = ustensile;
        name.setAttribute('id', ustensile);
        listeUstensilesDIV.append(name);
    })
}

createElementHTML();

/*------------------------------------ filtrer éléments ------------------------------------*/
var elementInput = document.querySelectorAll('.elem-searchbar');

function filterTableElements(input){
    if(input.id == "ingrediant-searchbar"){
        var returnTable = ingredientTable;
    }else if(input.id == "appareil-searchbar"){
        var returnTable = applianceTable;
    }else if(input.id == "ustensile-searchbar"){
        var returnTable = ustensileTable;
    }

    if(input.value.trim().length > 2){
        var filteredElement = [];
        returnTable.forEach((element)=>{
            if(input.value !== "" && element.toLowerCase().includes(input.value.toLowerCase())){
                filteredElement.push(element);
            }
        })
        return filteredElement;
    }else{
        return;
    }
}

elementInput.forEach((input)=>{
    input.addEventListener('keyup', function(){
        var filteredElement = filterTableElements(input);
        displayElementList(null, null, input, filteredElement);
    });
});

/*------------------------------------ display éléments ------------------------------------*/
const dropdown = document.querySelectorAll('.fa-angle-down');
const dropup = document.querySelectorAll('.fa-angle-up');

dropdown.forEach((btn)=>{
    btn.addEventListener('click', function(){
        displayElementList(btn, null, null);
    })
})

dropup.forEach((btn)=>{
    btn.addEventListener('click', function(){
        displayElementList(null, btn, null);
    })
})

function displayElementList(dropdownBtn, dropupBtn, input, filteredElement){
    if(dropdownBtn != null){
        if(dropdownBtn.parentElement.className == "filter-ingredient filter"){
            listeIngredientsDIV.style.display = "flex";
            dropdownBtn.style.display = "none";
            dropdownBtn.nextElementSibling.style.display = "flex";
        }else if(dropdownBtn.parentElement.className == "filter-appareil filter"){
            listeAppliancesDIV.style.display = "flex";
            dropdownBtn.style.display = "none";
            dropdownBtn.nextElementSibling.style.display = "flex";
        }else if(dropdownBtn.parentElement.className == "filter-ustensiles filter"){
            listeUstensilesDIV.style.display = "flex";
            dropdownBtn.style.display = "none";
            dropdownBtn.nextElementSibling.style.display = "flex";
        }
    }

    if(dropupBtn != null){
        if(dropupBtn.parentElement.className == "filter-ingredient filter"){
            document.querySelector('.filter-ingredient.filter .fas.fa-angle-down').style.display = "flex";
            dropupBtn.style.display = "none";
            listeIngredientsDIV.style.display = "none";
        }else if(dropupBtn.parentElement.className == "filter-appareil filter"){
            document.querySelector('.filter-appareil.filter .fas.fa-angle-down').style.display = "flex";
            dropupBtn.style.display = "none";
            listeAppliancesDIV.style.display = "none";
        }else if(dropupBtn.parentElement.className == "filter-ustensiles filter"){
            document.querySelector('.filter-ustensiles.filter .fas.fa-angle-down').style.display = "flex";
            dropupBtn.style.display = "none";
            listeUstensilesDIV.style.display = "none";
        }
    }

    if(input != null){
        if(input.id == "ingrediant-searchbar"){
            var listeDIV = document.getElementById('liste-ingredients');
            var elemDropdown = document.querySelector('.filter-ingredient.filter .fas.fa-angle-down');
            var elemDropup = document.querySelector('.filter-ingredient.filter .fas.fa-angle-up');
            var elementClassName = 'single-ingredient';
        }else if(input.id == "appareil-searchbar"){
            var listeDIV = document.getElementById('liste-appareils');
            var elemDropdown = document.querySelector('.filter-ingredient.filter .fas.fa-angle-down');
            var elemDropup = document.querySelector('.filter-ingredient.filter .fas.fa-angle-up');
            var elementClassName = 'single-appliance';
        }else if(input.id == "ustensile-searchbar"){
            var listeDIV = document.getElementById('liste-ustensiles');
            var elemDropdown = document.querySelector('.filter-ustensiles.filter .fas.fa-angle-down');
            var elemDropup = document.querySelector('.filter-ustensiles.filter .fas.fa-angle-up');
            var elementClassName = 'single-ustensile';
        }
    
        if(input.value.trim().length > 2){
            listeDIV.innerHTML = "";
            filteredElement.forEach((element)=>{
                const name = document.createElement('p',element);
                name.setAttribute('class', elementClassName);
                name.textContent = element;
                name.setAttribute('id', element);
                listeDIV.append(name);
                name.addEventListener('click', function(){
                    createTag(name);
                })
            })
            listeDIV.style.display = "flex";
            elemDropdown.style.display = "none";
            elemDropup.style.display = "flex";
        }else{
            createElementHTML();
            elemDropdown.style.display = "flex";
            elemDropup.style.display = "none";
            listeDIV.style.display = "none";
        }
    }
    
}

/*------------------------------------ Tags ------------------------------------*/
const tagContainer = document.getElementById('tag-container');
var allLists = document.querySelectorAll('.liste-element');

allLists.forEach((list)=>{
    var listNodes = list.childNodes;
    listNodes.forEach((node)=>{
        node.addEventListener('click', function(){
            createTag(node);
        })
    })
})

function tagsClickEvent(){
    allLists = document.querySelectorAll('.liste-element');

    allLists.forEach((list)=>{
        var listNodes = list.childNodes;
        listNodes.forEach((node)=>{
            node.addEventListener('click', function(){
                createTag(node);
            })
        })
    })
}

//création des tags
function createTag(element){
    if(element.className == "single-ingredient"){
        var classTag = "single-tag ingredient";
    }else if(element.className == "single-appliance"){
        var classTag = "single-tag appliance";
    }else if(element.className == "single-ustensile"){
        var classTag = "single-tag ustensile";
    }
    const tagDiv = document.createElement("div");
    const tagName = document.createElement("p");
    const tagDelete = document.createElement("i");
    tagDelete.setAttribute("class","far fa-times-circle");
    tagName.textContent = element.id;
    tagDiv.setAttribute("class", classTag);
    tagDiv.append(tagName, tagDelete);
    tagContainer.append(tagDiv);
    createTagsTable();
    element.remove();
    deleteTag();      
}

function deleteTag(){
    var marks = document.querySelectorAll('.single-tag i');
    marks.forEach((mark)=>{
        mark.addEventListener('click', function(){
            mark.parentElement.remove();
            if(marks.length == 1){
                var recetteContainer = document.getElementById('recette-container');
                recetteContainer.innerHTML = "";  
            }
            createTagsTable();
        })
    })
}


function createTagsTable(){
    var allTags = document.querySelectorAll('.single-tag p');
    var tagsTable = [new Array(),new Array(),new Array()];
    var counterIngredients, counterAppliances, counterUstensiles;
    counterIngredients = counterAppliances = counterUstensiles = 0;
    allTags.forEach((tag)=>{
        var tagType = tag.parentNode.className;
        if(tagType == "single-tag ingredient"){
            tagsTable[0][counterIngredients] = tag.textContent;
            counterIngredients++;
        }else if(tagType == "single-tag appliance"){
            tagsTable[1][counterAppliances] = tag.textContent;
            counterAppliances++;
        }else if(tagType == "single-tag ustensile"){
            tagsTable[2][counterUstensiles] = tag.textContent;
            counterUstensiles++;
        }
    })
    filteredRecipesWithTags(tagsTable);
}


function filteredRecipesWithTags(tags){
    var recipesTags = [];
    var counter = 0;
    filteredRecipes.forEach((recipe)=>{
        var allIngredientsAreIn = true;
        tags[0].forEach((ingredientTag)=>{
            try {
                recipe.ingredients.forEach((value)=>{
                    if(value.ingredient == ingredientTag){
                        allIngredientsAreIn = true;
                        throw 'Break';
                    }else{
                        allIngredientsAreIn = false;
                    }
                })
            }catch  (e){
                if(e !== 'Break'){
                    throw e;
                }
            }
            
        })

        var allAppliancesAreIn = true;
        tags[1].forEach((applianceTag)=>{
            allAppliancesAreIn = false
            if(recipe.appliance == applianceTag){
                allAppliancesAreIn = true;
            }
        })
        
        var allUstensilesAreIn = true;
        tags[2].forEach((ustensileTag)=>{
            allUstensilesAreIn = false;
            if(recipe.ustensils.includes(ustensileTag)){
                allUstensilesAreIn = true;
            }
        })

        if(allIngredientsAreIn == true && allAppliancesAreIn == true && allUstensilesAreIn == true){
            recipesTags.push(recipe);
        }
    })
    filterList(recipesTags);
    renderRecipes(recipesTags);
}



/*------------------------------------ Barre de recherche ------------------------------------*/
const searchbar = document.getElementById('searchbar');

//Récupération de la valeur de la barre de recherche
searchbar.addEventListener('keyup', function(){
    var searchValue = searchbar.value;
    createRecipeTable(searchValue);
})

//création d'un nouveau tableau de recette en fonction de ce que tape l'utilisateur dans la barre de recherche
function createRecipeTable(value){
    if(value.length > 2){
        filteredRecipes = recipes.map((recipe)=>{
            if(recipe.name.toLowerCase().includes(value.toLowerCase()) || recipe.description.toLowerCase().includes(value.toLowerCase())){
                return recipe;
            }
        }).filter(notUndefined=>notUndefined!=undefined);
    }else{
        filteredRecipes = [];
    }
    filterList(filteredRecipes);
    renderRecipes(filteredRecipes);
}

function filterList(value){
    if(value != ""){
        ingredientTable = [];
        ustensileTable = [];
        applianceTable = [];
        value.forEach((recipe)=>{
            for(let i=0; i<recipe.ingredients.length; i++){
                if(!ingredientTable.includes(recipe.ingredients[i].ingredient)){
                    ingredientTable.push(recipe.ingredients[i].ingredient);
                }
            }
            if(!applianceTable.includes(recipe.appliance)){
                applianceTable.push(recipe.appliance);
            }
            for(let i = 0; i<recipe.ustensils.length; i++){
                if(!ustensileTable.includes(recipe.ustensils[i])){
                    ustensileTable.push(recipe.ustensils[i]);
                }
            }
        })
        listeIngredientsDIV.innerHTML = "";
        listeAppliancesDIV.innerHTML = "";
        listeUstensilesDIV.innerHTML = "";
    }else{
        filteredRecipes.forEach((recipe)=>{
            for(let i =0; i<recipe.ingredients.length; i++){
                if(!ingredientTable.includes(recipe.ingredients[i].ingredient)){
                    ingredientTable.push(recipe.ingredients[i].ingredient);
                }
            }
            if(!applianceTable.includes(recipe.appliance)){
                applianceTable.push(recipe.appliance);
            }
            for(let i = 0; i<recipe.ustensils.length; i++){
                if(!ustensileTable.includes(recipe.ustensils[i])){
                    ustensileTable.push(recipe.ustensils[i]);
                }
            }
        })
    }
    
    createElementHTML(ingredientTable);
    tagsClickEvent();
}

//création des recettes HTML
//création des recettes HTML
function defaultDisplay(){
    var recetteContainer = document.getElementById('recette-container');
    recipes.forEach((recipe)=>{
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
    })
}

function renderRecipes(searchValue){
    var recetteContainer = document.getElementById('recette-container');
    recetteContainer.innerHTML = "";
    searchValue.forEach(recipe => {
        if(recipe != undefined){
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
        }
    });
}