// Функция для отображения блюд на странице
async function displayDishes() {
    // Сначала показываем загрузку
    showLoadingIndicator();
    
    // Загружаем блюда из API
    await loadDishes();
    
    // Проверяем, что блюда загружены
    if (!dishes || dishes.length === 0) {
        console.error('Блюда не загружены');
        showErrorIndicator();
        return;
    }
    
    // Сортируем блюда по названию в алфавитном порядке
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
    
    // Группируем блюда по категориям
    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        salad: sortedDishes.filter(dish => dish.category === 'salad'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        drink: sortedDishes.filter(dish => dish.category === 'drink'),
        dessert: sortedDishes.filter(dish => dish.category === 'dessert')
    };
    
    // Отображаем блюда для каждой категории
    displayCategory('soup', 'Супы', dishesByCategory.soup);
    displayCategory('salad', 'Салаты и стартеры', dishesByCategory.salad);
    displayCategory('main', 'Главные блюда', dishesByCategory.main);
    displayCategory('drink', 'Напитки', dishesByCategory.drink);
    displayCategory('dessert', 'Десерты', dishesByCategory.dessert);
    
    // Создаем фильтры для каждой категории
    createFilters();
    
    // Скрываем индикатор загрузки
    hideLoadingIndicator();
}

// Функция для отображения индикатора загрузки
function showLoadingIndicator() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Загружаем меню...</p>
    `;
    main.appendChild(loadingDiv);
    
    // Добавляем стили для индикатора
    const style = document.createElement('style');
    style.textContent = `
        #loading-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
            text-align: center;
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #ff1a1a;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

function showErrorIndicator() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-indicator';
    errorDiv.innerHTML = `
        <div style="color: #f44336; font-size: 48px; margin-bottom: 20px;">⚠️</div>
        <h3>Не удалось загрузить меню</h3>
        <p>Пожалуйста, проверьте подключение к интернету и обновите страницу.</p>
        <button id="retry-button" style="margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Повторить попытку
        </button>
    `;
    main.appendChild(errorDiv);
    
    document.getElementById('retry-button').addEventListener('click', () => {
        errorDiv.remove();
        displayDishes();
    });
}

// Функция для отображения блюд конкретной категории
function displayCategory(category, categoryName, dishes, filterKind = null) {
    let section = document.querySelector(`.menu-section[data-category="${category}"]`);
    
    if (!section) {
        // Создаем секцию если её нет
        section = createCategorySection(category, categoryName);
    }
    
    // Очищаем существующую сетку
    const grid = section.querySelector('.dishes-grid');
    grid.innerHTML = '';
    
    // Фильтруем блюда если указан фильтр
    const filteredDishes = filterKind ? 
        dishes.filter(dish => dish.kind === filterKind) : 
        dishes;
    
    // Если нет блюд после фильтрации
    if (filteredDishes.length === 0) {
        grid.innerHTML = `
            <div class="no-dishes">
                <p>Нет блюд по выбранному фильтру</p>
            </div>
        `;
        return;
    }
    
    // Создаем карточки для каждого блюда
    filteredDishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        grid.appendChild(dishCard);
    });
}

// Функция для создания секции категории
function createCategorySection(category, categoryName) {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.setAttribute('data-category', category);
    
    section.innerHTML = `
        <h2>${categoryName}</h2>
        <div class="filters" data-category="${category}">
            <!-- Фильтры будут добавлены динамически -->
        </div>
        <div class="dishes-grid">
            <!-- Блюда будут добавлены через JavaScript -->
        </div>
    `;
    
    main.appendChild(section);
    return section;
}

// Функция для создания карточки блюда
function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);
    dishCard.setAttribute('data-category', dish.category);
    dishCard.setAttribute('data-kind', dish.kind);
    
    dishCard.innerHTML = `
        <div class="dish-image-container">
            <img src="${dish.image}" alt="${dish.name}" class="dish-image" 
                 onerror="this.src='placeholder.jpg'; this.onerror=null;">
        </div>
        <div class="dish-info">
            <p class="price">${dish.price} руб.</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button class="add-button">Добавить</button>
        </div>
    `;
    
    return dishCard;
}

// Функция для создания фильтров (БЕЗ кнопки "Все")
function createFilters() {
    const filterConfig = {
        soup: [
            { name: 'рыбный', kind: 'fish' },
            { name: 'мясной', kind: 'meat' },
            { name: 'вегетарианский', kind: 'veg' }
        ],
        salad: [
            { name: 'рыбный', kind: 'fish' },
            { name: 'мясной', kind: 'meat' },
            { name: 'вегетарианский', kind: 'veg' }
        ],
        main: [
            { name: 'рыбное', kind: 'fish' },
            { name: 'мясное', kind: 'meat' },
            { name: 'вегетарианское', kind: 'veg' }
        ],
        drink: [
            { name: 'холодный', kind: 'cold' },
            { name: 'горячий', kind: 'hot' }
        ],
        dessert: [
            { name: 'маленькая порция', kind: 'small' },
            { name: 'средняя порция', kind: 'medium' },
            { name: 'большая порция', kind: 'large' }
        ]
    };
    
    Object.keys(filterConfig).forEach(category => {
        const filtersContainer = document.querySelector(`.filters[data-category="${category}"]`);
        if (filtersContainer) {
            filtersContainer.innerHTML = '';
            
            // Добавляем только фильтры, без кнопки "Все"
            filterConfig[category].forEach(filter => {
                const filterButton = document.createElement('button');
                filterButton.className = 'filter-btn';
                filterButton.setAttribute('data-kind', filter.kind);
                filterButton.textContent = filter.name;
                filtersContainer.appendChild(filterButton);
            });
            
            // По умолчанию все фильтры не активны - показываются все блюда
        }
    });
}

// Функция для фильтрации блюд
function filterDishes(category, kind) {
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
    const categoryDishes = sortedDishes.filter(dish => dish.category === category);
    
    // Получаем контейнер фильтров
    const filtersContainer = document.querySelector(`.filters[data-category="${category}"]`);
    if (!filtersContainer) return;
    
    const activeFilter = filtersContainer.querySelector('.filter-btn.active');
    
    let filterToApply = null;
    
    if (activeFilter && activeFilter.getAttribute('data-kind') === kind) {
        // Если кликнули на активный фильтр - снимаем фильтр (показываем все)
        activeFilter.classList.remove('active');
        filterToApply = null; // Показываем все блюда
    } else {
        // Убираем активный класс со всех фильтров
        filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем активный класс к выбранному фильтру
        const selectedFilter = filtersContainer.querySelector(`[data-kind="${kind}"]`);
        if (selectedFilter) {
            selectedFilter.classList.add('active');
            filterToApply = kind; // Применяем фильтр
        }
    }
    
    // Отображаем отфильтрованные блюда
    const categoryName = getCategoryName(category);
    displayCategory(category, categoryName, categoryDishes, filterToApply);
}

// Функция для получения названия категории
function getCategoryName(category) {
    const names = {
        soup: 'Супы',
        salad: 'Салаты и стартеры',
        main: 'Главные блюда',
        drink: 'Напитки',
        dessert: 'Десерты'
    };
    return names[category];
}

// Обработчик кликов на фильтры
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        const filtersContainer = e.target.closest('.filters');
        if (!filtersContainer) return;
        
        const category = filtersContainer.getAttribute('data-category');
        const kind = e.target.getAttribute('data-kind');
        
        if (category && kind) {
            filterDishes(category, kind);
        }
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await displayDishes();
    } catch (error) {
        console.error('Ошибка при отображении блюд:', error);
        showErrorIndicator();
    }
});