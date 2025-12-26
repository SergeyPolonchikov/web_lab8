let dishes = [];

// Локальные данные для fallback (взять из примера задания, 30 блюд)
const LOCAL_DISHES = [
    {
        "id": 1,
        "keyword": "gaspacho",
        "name": "Гаспачо",
        "price": 195,
        "category": "soup",
        "count": "350 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/soups/gazpacho",
        "kind": "veg"
    },
    {
        "id": 2,
        "keyword": "gribnoy",
        "name": "Грибной суп-пюре",
        "price": 185,
        "category": "soup",
        "count": "330 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/soups/mushroom_soup",
        "kind": "veg"
    },
    {
        "id": 3,
        "keyword": "norvezhskiy",
        "name": "Норвежский суп",
        "price": 270,
        "category": "soup",
        "count": "330 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/soups/norwegian_soup",
        "kind": "fish"
    },
    {
        "id": 4,
        "keyword": "ramen",
        "name": "Рамен",
        "price": 375,
        "category": "soup",
        "count": "425 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/soups/ramen",
        "kind": "meat"
    },
    {
        "id": 5,
        "keyword": "tomyum",
        "name": "Том ям с креветками",
        "price": 650,
        "category": "soup",
        "count": "500 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/soups/tomyum",
        "kind": "fish"
    },
    {
        "id": 6,
        "keyword": "chicken",
        "name": "Куриный суп",
        "price": 330,
        "category": "soup",
        "count": "350 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/soups/chicken",
        "kind": "meat"
    },
    {
        "id": 7,
        "keyword": "zharenaya-kartoshka",
        "name": "Жареная картошка с грибами",
        "price": 150,
        "category": "main",
        "count": "250 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/main_course/friedpotatoeswithmushrooms1",
        "kind": "veg"
    },
    {
        "id": 8,
        "keyword": "lazanya",
        "name": "Лазанья",
        "price": 385,
        "category": "main",
        "count": "310 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/main_course/lasagna",
        "kind": "meat"
    },
    {
        "id": 9,
        "keyword": "kotlety-s-pyure",
        "name": "Котлеты из курицы с картофельным пюре",
        "price": 225,
        "category": "main",
        "count": "280 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/main_course/chickencutletsandmashedpotatoes",
        "kind": "meat"
    },
    {
        "id": 10,
        "keyword": "fishrice",
        "name": "Рыбная котлета с рисом и спаржей",
        "price": 320,
        "category": "main",
        "count": "270 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/main_course/fishrice",
        "kind": "fish"
    },
    {
        "id": 11,
        "keyword": "pizza",
        "name": "Пицца Маргарита",
        "price": 450,
        "category": "main",
        "count": "470 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/main_course/pizza",
        "kind": "veg"
    },
    {
        "id": 12,
        "keyword": "shrimppasta",
        "name": "Паста с креветками",
        "price": 340,
        "category": "main",
        "count": "280 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/main_course/shrimppasta",
        "kind": "fish"
    },
    {
        "id": 13,
        "keyword": "saladwithegg",
        "name": "Корейский салат с овощами и яйцом",
        "price": 330,
        "category": "salad",
        "count": "250 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/salads_starters/saladwithegg",
        "kind": "veg"
    },
    {
        "id": 14,
        "keyword": "caesar",
        "name": "Цезарь с цыпленком",
        "price": 370,
        "category": "salad",
        "count": "220 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/salads_starters/caesar",
        "kind": "meat"
    },
    {
        "id": 15,
        "keyword": "caprese",
        "name": "Капрезе с моцареллой",
        "price": 350,
        "category": "salad",
        "count": "235 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/salads_starters/caprese",
        "kind": "veg"
    },
    {
        "id": 16,
        "keyword": "tunasalad",
        "name": "Салат с тунцом",
        "price": 480,
        "category": "salad",
        "count": "250 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/salads_starters/tunasalad",
        "kind": "fish"
    },
    {
        "id": 17,
        "keyword": "frenchfries1",
        "name": "Картофель фри с соусом Цезарь",
        "price": 280,
        "category": "salad",
        "count": "235 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/salads_starters/frenchfries1",
        "kind": "veg"
    },
    {
        "id": 18,
        "keyword": "frenchfries2",
        "name": "Картофель фри с кетчупом",
        "price": 260,
        "category": "salad",
        "count": "235 г",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/salads_starters/frenchfries2",
        "kind": "veg"
    },
    {
        "id": 19,
        "keyword": "apelsinoviy",
        "name": "Апельсиновый сок",
        "price": 120,
        "category": "drink",
        "count": "300 мл",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/beverages/orangejuice",
        "kind": "cold"
    },
    {
        "id": 20,
        "keyword": "yablochniy",
        "name": "Яблочный сок",
        "price": 90,
        "category": "drink",
        "count": "300 мл",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/beverages/applejuice",
        "kind": "cold"
    },
    {
        "id": 21,
        "keyword": "morkovniy",
        "name": "Морковный сок",
        "price": 110,
        "category": "drink",
        "count": "300 мл",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/beverages/carrotjuice",
        "kind": "cold"
    },
    {
        "id": 22,
        "keyword": "cappuccino",
        "name": "Капучино",
        "price": 180,
        "category": "drink",
        "count": "300 мл",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/beverages/cappuccino",
        "kind": "hot"
    },
    {
        "id": 23,
        "keyword": "greentea",
        "name": "Зеленый чай",
        "price": 100,
        "category": "drink",
        "count": "300 мл",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/beverages/greentea",
        "kind": "hot"
    },
    {
        "id": 24,
        "keyword": "tea",
        "name": "Черный чай",
        "price": 90,
        "category": "drink",
        "count": "300 мл",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/beverages/tea",
        "kind": "hot"
    },
    {
        "id": 25,
        "keyword": "baklava",
        "name": "Пахлава",
        "price": 220,
        "category": "dessert",
        "count": "300 гр",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/desserts/baklava",
        "kind": "medium"
    },
    {
        "id": 26,
        "keyword": "checheesecake",
        "name": "Чизкейк",
        "price": 240,
        "category": "dessert",
        "count": "125 гр",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/desserts/checheesecake",
        "kind": "small"
    },
    {
        "id": 27,
        "keyword": "chocolatecheesecake",
        "name": "Шоколадный чизкейк",
        "price": 260,
        "category": "dessert",
        "count": "125 гр",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/desserts/chocolatecheesecake",
        "kind": "small"
    },
    {
        "id": 28,
        "keyword": "chocolatecake",
        "name": "Шоколадный торт",
        "price": 270,
        "category": "dessert",
        "count": "140 гр",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/desserts/chocolatecake",
        "kind": "small"
    },
    {
        "id": 29,
        "keyword": "donuts2",
        "name": "Пончики (3 штуки)",
        "price": 410,
        "category": "dessert",
        "count": "350 гр",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/desserts/donuts2",
        "kind": "medium"
    },
    {
        "id": 30,
        "keyword": "donuts",
        "name": "Пончики (6 штуки)",
        "price": 650,
        "category": "dessert",
        "count": "700 гр",
        "image": "https://edu.std-900.ist.mospolytech.ru/labs/api/images/desserts/donuts",
        "kind": "large"
    }
];

// Функция для загрузки блюд из API с CORS-прокси
async function loadDishes() {
    try {
        const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';
        
        console.log('Попытка загрузки блюд из API...');
        
        // Пробуем загрузить без прокси (если CORS разрешен)
        try {
            const directResponse = await fetch(API_URL);
            if (directResponse.ok) {
                const dishesData = await directResponse.json();
                console.log('✓ Блюда успешно загружены напрямую:', dishesData.length, 'шт.');
                dishes = processApiDishes(dishesData);
                return dishes;
            }
        } catch (directError) {
            console.log('Прямой запрос не удался, пробуем через прокси:', directError.message);
        }
        
        // Список доступных CORS-прокси (будем пробовать по очереди)
        const proxyConfigs = [
            {
                url: `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`,
                name: 'allorigins'
            },
            {
                url: `https://corsproxy.io/?${encodeURIComponent(API_URL)}`,
                name: 'corsproxy.io'
            },
            {
                url: `https://thingproxy.freeboard.io/fetch/${API_URL}`,
                name: 'thingproxy'
            }
        ];
        
        let dishesData = null;
        let successfulProxy = null;
        
        // Пробуем каждый прокси по очереди
        for (let proxy of proxyConfigs) {
            try {
                console.log(`Пробуем прокси: ${proxy.name}`);
                
                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        ...(proxy.headers || {})
                    }
                };
                
                // Добавляем таймаут через Promise.race
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Таймаут')), 10000);
                });
                
                const fetchPromise = fetch(proxy.url, options);
                
                const response = await Promise.race([fetchPromise, timeoutPromise]);
                
                if (response && response.ok) {
                    dishesData = await response.json();
                    successfulProxy = proxy.name;
                    console.log(`✓ Успешно через прокси: ${proxy.name}`);
                    break;
                }
                
            } catch (error) {
                console.log(`✗ Прокси ${proxy.name} не сработал:`, error.message);
                continue;
            }
        }
        
        if (!dishesData) {
            console.log('Все прокси не сработали, используем локальные данные');
            throw new Error('Не удалось получить данные через прокси');
        }
        
        dishes = processApiDishes(dishesData);
        console.log(`✓ Блюда успешно загружены через ${successfulProxy}: ${dishes.length} шт.`);
        return dishes;
        
    } catch (error) {
        console.error('Ошибка загрузки из API:', error.message);
        console.log('Используем локальные данные как fallback');
        
        // Используем локальные данные как fallback
        dishes = LOCAL_DISHES.map(item => ({
            ...item,
            category: item.category === 'main-course' ? 'main' : item.category
        }));
        
        console.log(`✓ Используются локальные данные: ${dishes.length} блюд`);
        return dishes;
    }
}

// Функция для обработки данных из API
function processApiDishes(apiDishes) {
    return apiDishes.map(item => {
        // Преобразуем категории
        let category;
        switch (item.category) {
            case 'main-course':
                category = 'main';
                break;
            case 'soup':
            case 'salad':
            case 'drink':
            case 'dessert':
                category = item.category;
                break;
            default:
                console.warn('Неизвестная категория:', item.category);
                category = 'main'; // fallback
        }
        
        // Проверяем наличие всех необходимых полей
        return {
            id: item.id || 0,
            keyword: item.keyword || `dish_${item.id}`,
            name: item.name || 'Блюдо без названия',
            price: item.price || 0,
            category: category,
            count: item.count || '0 г',
            image: item.image || 'placeholder.jpg',
            kind: item.kind || 'default'
        };
    });
}

// Функция для получения блюд по категории
function getDishesByCategory(category) {
    if (!dishes || dishes.length === 0) {
        console.warn('Блюда еще не загружены');
        return [];
    }
    
    return dishes.filter(dish => {
        if (category === 'main') {
            return dish.category === 'main';
        }
        return dish.category === category;
    });
}

// Функция для получения блюда по ключевому слову
function getDishByKeyword(keyword) {
    if (!dishes || dishes.length === 0) {
        console.warn('Блюда еще не загружены');
        return null;
    }
    
    return dishes.find(dish => dish.keyword === keyword);
}

// Функция для получения блюда по ID
function getDishById(id) {
    if (!dishes || dishes.length === 0) {
        console.warn('Блюда еще не загружены');
        return null;
    }
    
    return dishes.find(dish => dish.id === id);
}

// Экспортируем функции для использования в других файлах
if (typeof window !== 'undefined') {
    window.getDishesByCategory = getDishesByCategory;
    window.getDishByKeyword = getDishByKeyword;
    window.getDishById = getDishById;
}