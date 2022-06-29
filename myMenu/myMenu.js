 /////////////////////// Sessão de comidas /////////////////////

 const addFoodButton = document.querySelector('#add-food');

 const food = {};

 const showFoodInMenu = () => {
    const foodArray = Object.entries(food);
    const foodMenu = document.querySelector('ol.food-menu');
    const line = document.createElement('li');
    line.className = 'food-item list-group-item';
    foodArray.forEach((item) => {
        line.innerHTML = `${item[0]}: R$ ${item[1]}`;
        foodMenu.appendChild(line);
    })
 };

 const foodObject = () => {
    const foodInput = document.querySelector('#food-input');
    const foodPrice = document.querySelector('#food-price');
    const foodKey = foodInput.value.toLowerCase();
    food[foodKey] = Number(foodPrice.value);
    showFoodInMenu();
 }
 addFoodButton.addEventListener('click', foodObject);

/////////////////////// Sessão de bebidas /////////////////////////

 const addDrinkButton = document.querySelector('#add-drink');

 const drink = {};

 const showDrinkInMenu = () => {
    const drinkArray = Object.entries(drink);
    const drinkMenu = document.querySelector('ol.drink-menu');
    const line = document.createElement('li');
    line.className = 'drink-item list-group-item';
    drinkArray.forEach((item) => {
        line.innerHTML = `${item[0]}: R$ ${item[1]}`;
        drinkMenu.appendChild(line);
    })
 };

 const drinkObject = () => {
    const drinkInput = document.querySelector('#drink-input');
    const drinkPrice = document.querySelector('#drink-price');
    const drinkKey = drinkInput.value.toLowerCase();
    drink[drinkKey] = Number(drinkPrice.value);
    showDrinkInMenu();
 }
 addDrinkButton.addEventListener('click', drinkObject);

 const menuObject = (food, drink) => ({ food, drink });

////////// Sessão para mostrar menu salvo de escolha do usuário /////////

const getChosenMenu = (event) => {
  const chosenSavedMenu = event.target.innerText;
  const menu = JSON.parse(localStorage.getItem(chosenSavedMenu));
  return menu;
}

const showChosenFood = (food) => {
  const foodArray = Object.entries(food);

  const chosenMenuSection = document.getElementById('show-chosen-menu');
  const savedFoodOl = document.createElement('ul');
  savedFoodOl.className = 'chosen-food list-group';
  
  chosenMenuSection.appendChild(savedFoodOl);

  foodArray.forEach((item) => {
      const line = document.createElement('li');
      line.className = 'chosen-food-item list-group-item';
      line.innerHTML = `${item[0].toUpperCase()}: R$ ${item[1]}`;
      savedFoodOl.appendChild(line);
  })
}

const showChosenDrink = (drink) => {
  const drinkArray = Object.entries(drink);
  
  const chosenMenuSection = document.getElementById('show-chosen-menu');
  const savedDrinkOl = document.createElement('ul');
  savedDrinkOl.className = 'chosen-drink list-group';
  chosenMenuSection.appendChild(savedDrinkOl);

  drinkArray.forEach((item) => {
      const line = document.createElement('li');
      line.className = 'chosen-drink-item list-group-item';
      line.innerHTML = `${item[0].toUpperCase()}: R$ ${item[1]}`;
      savedDrinkOl.appendChild(line);
  })
}

const showChosenMenu = (event) => {
  const savedMenu = getChosenMenu(event);
  const food = savedMenu.food;
  const drink = savedMenu.drink;
  const chosenMenuSection = document.getElementById('show-chosen-menu');
  chosenMenuSection.innerHTML = '';
  showChosenFood(food);
  showChosenDrink(drink);
}

const showMenuFunction = () => {
  const savedMenuOl = document.querySelectorAll('.saved-menus li');
  [...savedMenuOl].forEach((menu) => {
    menu.addEventListener('click', showChosenMenu);
  })
}

/////////////////////// Deletar menu salvo ///////////

const deleteItemFromStorage = (event) => {
  const menuName = event.target.innerText;
  localStorage.removeItem(menuName);
};

const deleteItem = (event) => {
  event.target.remove();
  deleteItemFromStorage(event);
  storageSavedMenuOl();
}

const deleteMenu = () => {
  const savedMenus = document.querySelectorAll('.saved-item');
  console.log(savedMenus);
  savedMenus.forEach((item) => {
    item.addEventListener('dblclick', deleteItem);
  })
}


///////////////////////////Sessão para salvar o Menu ////////////////

const getBuiltMenu = () => JSON.stringify(menuObject(food, drink));

const storageSavedMenuOl = () => {
  const savedMenuOl = document.querySelector('.saved-menus');
  localStorage.setItem('ListaMenus', savedMenuOl.innerHTML);
}

const savedMenuList = (menuName) => {
  const savedMenuOl = document.querySelector('.saved-menus');
  const line = document.createElement('li');
  line.className = 'saved-item';
  line.innerHTML = menuName;
  savedMenuOl.appendChild(line);
}

const saveMenu = () => {
  const savedMenuName = document.querySelector('#saved-menu-name').value;
  localStorage.setItem(savedMenuName, getBuiltMenu())
  savedMenuList(savedMenuName);
  storageSavedMenuOl();
  showMenuFunction();
  deleteMenu();
};

const saveButton = document.querySelector('#save-menu');
saveButton.addEventListener('click', saveMenu);

const showStorageSavedMenuList = () => {
  const savedMenuOl = document.querySelector('.saved-menus');
  const savedContent = localStorage.getItem('ListaMenus');
  savedMenuOl.innerHTML = savedContent;
}
 
/////////////////////// Gerência de Menu, pedidos e preços //////////

// Recebimento do nome do menu escolhido para o dia!
const getMenuName = () => {
  const menuName = document.getElementById('menu-obj-name').value;
  const chosenMenuObj = localStorage.getItem(menuName);
  return chosenMenuObj;
}

let presentMenu;

const foodLinesFunc = (foodArray) => {
  const menuForClients = document.getElementById('menu-for-clients');
  foodArray.forEach((each) => {
    const line = document.createElement('li');
      line.className = 'chosen-food-item list-group-item';
      line.innerHTML = `${each[0].toUpperCase()}: R$ ${each[1]}`;
      menuForClients.appendChild(line);
  })
}

const drinkLinesFunc = (drinkArray) => {
  const menuForClients = document.getElementById('menu-for-clients');

  drinkArray.forEach((each) => {
    const line = document.createElement('li');
      line.className = 'chosen-food-item list-group-item';
      line.innerHTML = `${each[0].toUpperCase()}: R$ ${each[1]}`;
      menuForClients.appendChild(line);
  })
}

const callMenuButtonFunc = () => {
  const menuObjName = document.getElementById('menu-obj-name').value.toLowerCase();
  const chosenMenuInfo = JSON.parse(localStorage.getItem(menuObjName))
  presentMenu = chosenMenuInfo;
  console.log(chosenMenuInfo);
  const menuForClients = document.getElementById('menu-for-clients');
  menuForClients.innerHTML = '';
  foodLinesFunc(Object.entries(chosenMenuInfo.food))
  drinkLinesFunc(Object.entries(chosenMenuInfo.drink))
}

const callMenuButton = document.getElementById('call-menu');
callMenuButton.addEventListener('click', callMenuButtonFunc);


 //Registra os clientes presentes no estabelecimento. Para cada cliente registrado,
// teremos uma linha com seu nome, input de consumo, botão de adição do produto, 
// valor consumido e botão de encerramento do consumo. 

const createMenu = (menu = {}) => {
  const theMenu = { 
    fetchMenu: () => menu, 
    consumption: [],
    order: (product) => {
      theMenu.consumption.push(product);
    },
    pay: () => {
      let total = 0;

      const produtos = theMenu.fetchMenu();
      const foods = Object.keys(produtos.food);
      const drinks = Object.keys(produtos.drink);

      theMenu.consumption.forEach((produto) => {
        console.log(produto);
        if (foods.includes(produto)) {
          total += produtos.food[produto];
        } else if (drinks.includes(produto)) {
          total += produtos.drink[produto];
        }
      });

      return total;
    },
  };
  return theMenu;
};

const placeAnOrderFunction = ({ target }) => {
  const name = target.className.split(' ')[0]

  const orderInputValue = document.querySelector(`.${name}-input`).value;
  const orderedList = document.querySelector(`.${name}-orderList`);

  const newOrderLine = document.createElement('li');
  newOrderLine.innerHTML = orderInputValue;
  orderedList.appendChild(newOrderLine)

  const menu = createMenu(presentMenu)
  menu.order(orderInputValue);
  const price = menu.pay()
  const clientOrderArray = JSON.parse(sessionStorage.getItem(name))
  clientOrderArray.push(price)

  sessionStorage.removeItem(name)
  sessionStorage.setItem(name, JSON.stringify(clientOrderArray));

  document.querySelector(`.${name}-totalPrice`).innerHTML = `Preço total: R$ ${clientOrderArray.reduce((prev, act) => prev + act)}`;
}

const removeClient = ({target}) => {
  document.querySelector(`.${target.id}-client-section`).remove();
  sessionStorage.removeItem(target.id)
}

const createClient = () => {
  const clientInput = document.getElementById('client-name-input').value;
  const clientsList = document.getElementById('client-name-list');

  const theClientSection = document.createElement('section');
  theClientSection.className = `${clientInput}-client-section client-section`;
  const clientNameH3 = document.createElement('h3');
  clientNameH3.innerHTML = clientInput;
  theClientSection.appendChild(clientNameH3);

  const subSection = document.createElement('section');
  subSection.className = 'sub-section-client';
  
  const clientOrderInput = document.createElement('input');
  clientOrderInput.className = `${clientInput}-input form-control`;
  subSection.appendChild(clientOrderInput);

  const placeAnOrderButton = document.createElement('button');
  placeAnOrderButton.className = `${clientInput} btn-success`;
  placeAnOrderButton.innerHTML = 'Pedir';
  subSection.appendChild(placeAnOrderButton)
  placeAnOrderButton.addEventListener('click', placeAnOrderFunction)

  const removeClientButton = document.createElement('button');
  removeClientButton.className = 'btn-success';
  removeClientButton.id = `${clientInput}`
  removeClientButton.innerHTML = 'Encerrar'
  subSection.appendChild(removeClientButton);
  removeClientButton.addEventListener('click', removeClient)

  theClientSection.appendChild(subSection)

  const theOrderList = document.createElement('ol');
  theOrderList.className = `${clientInput}-orderList list-group`;
  theClientSection.appendChild(theOrderList);

  sessionStorage.setItem(clientInput, JSON.stringify([]));

  const totalPriceToPay = document.createElement('h5');
  totalPriceToPay.className = `${clientInput}-totalPrice`;
  theClientSection.appendChild(totalPriceToPay);

  theClientSection.appendChild(document.createElement('hr'))

  clientsList.appendChild(theClientSection);
}

const createClientButton = document.getElementById('create-client');
createClientButton.addEventListener('click', createClient);

 window.onload = () => {
  showStorageSavedMenuList();
  showMenuFunction();
  deleteMenu();
 }