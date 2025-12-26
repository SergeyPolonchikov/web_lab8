class OrderValidator {
    constructor() {
        this.notificationContainer = null;
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        this.createNotificationContainer();
        this.setupFormValidation();
        this.isInitialized = true;
        
        console.log('OrderValidator initialized');
    }
    
    createNotificationContainer() {
        // Удаляем старый контейнер если есть
        const oldContainer = document.querySelector('.notifications-container');
        if (oldContainer) {
            oldContainer.remove();
        }
        
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notifications-container';
        document.body.appendChild(this.notificationContainer);
    }
    
    setupFormValidation() {
        const submitBtn = document.querySelector('.submit-btn');
        
        if (submitBtn) {
            // Удаляем старые обработчики
            const newSubmitBtn = submitBtn.cloneNode(true);
            submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
            
            // Добавляем обработчик на кнопку отправки
            newSubmitBtn.addEventListener('click', (e) => {
                this.handleSubmitClick(e);
            });
            
            console.log('Form validation setup complete');
        } else {
            console.error('Submit button not found');
            // Попробуем найти кнопку позже
            setTimeout(() => {
                this.setupFormValidation();
            }, 500);
        }
    }
    
    handleSubmitClick = (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
        
        // Сначала проверяем валидность заказа (состав ланча)
        const orderValidation = this.validateOrder();
        if (!orderValidation.isValid) {
            console.log('Order validation failed');
            this.showNotification(orderValidation.message, 'error');
            return;
        }
        
        // Затем проверяем личные данные
        const personalDataValidation = this.validatePersonalData();
        if (!personalDataValidation.isValid) {
            console.log('Personal data validation failed');
            this.showNotification(personalDataValidation.message, 'error');
            return;
        }
        
        console.log('All validations passed - submitting form');
        this.submitForm();
    }
    
    validateOrder() {
        console.log('Starting order validation');
        
        // Проверяем доступность orderManager
        if (typeof orderManager === 'undefined') {
            console.error('OrderManager is not defined');
            return {
                isValid: false,
                message: 'Ошибка системы. Пожалуйста, обновите страницу.'
            };
        }
        
        // Получаем текущие выбранные блюда
        const selectedDishes = orderManager.getSelectedDishes();
        console.log('Current selected dishes:', selectedDishes);
        
        const validationResult = this.checkLunchCombo(selectedDishes);
        
        if (!validationResult.isValid) {
            return {
                isValid: false,
                message: validationResult.message
            };
        }
        
        console.log('Order validation passed');
        return { isValid: true };
    }
    
    validatePersonalData() {
        console.log('Validating personal data');
        
        const requiredFields = [
            { id: 'name', name: 'Имя' },
            { id: 'email', name: 'Email' },
            { id: 'phone', name: 'Телефон' },
            { id: 'address', name: 'Адрес доставки' }
        ];
        
        const errors = [];
        
        // Проверяем обязательные поля
        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input && !input.value.trim()) {
                errors.push(`• ${field.name} - обязательное поле`);
            }
        });
        
        // Проверяем выбор времени доставки
        const deliveryTimeSelected = document.querySelector('input[name="delivery_time"]:checked');
        if (!deliveryTimeSelected) {
            errors.push('• Выберите время доставки');
        }
        
        // Если выбрано конкретное время, проверяем его заполнение
        if (deliveryTimeSelected && deliveryTimeSelected.value === 'specific') {
            const timeInput = document.getElementById('delivery-time-input');
            if (timeInput && !timeInput.value) {
                errors.push('• Укажите конкретное время доставки');
            }
        }
        
        // Проверяем валидность email
        const emailInput = document.getElementById('email');
        if (emailInput && emailInput.value.trim() && !this.isValidEmail(emailInput.value)) {
            errors.push('• Введите корректный email адрес');
        }
        
        // Проверяем валидность телефона (базовая проверка)
        const phoneInput = document.getElementById('phone');
        if (phoneInput && phoneInput.value.trim()) {
            const phone = phoneInput.value.replace(/\D/g, '');
            if (phone.length < 10) {
                errors.push('• Введите корректный номер телефона (минимум 10 цифр)');
            }
        }
        
        if (errors.length > 0) {
            return {
                isValid: false,
                message: `Заполните следующие поля:<br>${errors.map(error => `${error}<br>`).join('')}`
            };
        }
        
        console.log('Personal data validation passed');
        return { isValid: true };
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    checkLunchCombo(selectedDishes) {
        const hasSoup = selectedDishes.soup !== null;
        const hasMain = selectedDishes.main !== null;
        const hasSalad = selectedDishes.salad !== null;
        const hasDrink = selectedDishes.drink !== null;
        const hasDessert = selectedDishes.dessert !== null;
        
        console.log('Combo check - hasSoup:', hasSoup, 'hasMain:', hasMain, 'hasSalad:', hasSalad, 'hasDrink:', hasDrink, 'hasDessert:', hasDessert);
        
        // 1. Проверяем, что выбрано хотя бы одно блюдо
        if (!hasSoup && !hasMain && !hasSalad && !hasDrink && !hasDessert) {
            console.log('Validation failed: Nothing selected');
            return {
                isValid: false,
                message: 'Ничего не выбрано. Выберите блюда для заказа'
            };
        }
        
        // 2. Проверяем наличие главного блюда (первый приоритет)
        if (!hasMain) {
            console.log('Validation failed: No main dish');
            return {
                isValid: false,
                message: 'Выберите главное блюдо'
            };
        }
        
        // 3. Проверяем обязательный напиток (второй приоритет)
        if (!hasDrink) {
            console.log('Validation failed: No drink selected');
            return {
                isValid: false,
                message: 'Обязательно выберите напиток'
            };
        }
        
        console.log('Validation passed: Valid combo selected');
        return { isValid: true };
    }
    
    submitForm() {
        console.log('Preparing to submit form');
        
        // Собираем данные формы для отображения в уведомлении
        const orderSummary = this.getOrderSummary();
        
        // Показываем подтверждение заказа
        this.showOrderConfirmation(orderSummary, () => {
            // После подтверждения симулируем отправку и показываем успех
            this.simulateFormSubmission();
        });
    }
    
    getOrderSummary() {
        const selectedDishes = orderManager.getSelectedDishes();
        const total = Object.values(selectedDishes)
            .filter(dish => dish !== null)
            .reduce((sum, dish) => sum + dish.price, 0);
        
        const categoryNames = {
            soup: 'Суп',
            salad: 'Салат',
            main: 'Главное блюдо',
            drink: 'Напиток',
            dessert: 'Десерт'
        };
        
        let summary = '<div style="text-align: left; margin-bottom: 20px;">';
        summary += '<h4 style="color: #2c3e50; margin-bottom: 15px; text-align: center;">Детали заказа:</h4>';
        
        // Показываем только выбранные блюда
        let hasSelectedDishes = false;
        Object.entries(selectedDishes).forEach(([category, dish]) => {
            if (dish) {
                hasSelectedDishes = true;
                summary += `<p><strong>${categoryNames[category]}:</strong> ${dish.name} - ${dish.price} руб.</p>`;
            }
        });
        
        if (hasSelectedDishes) {
            summary += `<p style="font-weight: bold; margin-top: 15px;"><strong>Итого:</strong> ${total} руб.</p>`;
        } else {
            summary += '<p>Нет выбранных блюд</p>';
        }
        summary += '</div>';
        
        // Добавляем данные клиента
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;
        
        summary += '<hr style="margin: 20px 0;">';
        summary += '<div style="text-align: left;">';
        summary += '<h4 style="color: #2c3e50; margin-bottom: 15px; text-align: center;">Данные клиента:</h4>';
        summary += `<p><strong>Имя:</strong> ${name}</p>`;
        summary += `<p><strong>Email:</strong> ${email}</p>`;
        summary += `<p><strong>Телефон:</strong> ${phone}</p>`;
        summary += `<p><strong>Адрес:</strong> ${address}</p>`;
        
        // Добавляем время доставки
        const deliveryTime = document.querySelector('input[name="delivery_time"]:checked');
        if (deliveryTime) {
            if (deliveryTime.value === 'soon') {
                summary += `<p><strong>Время доставки:</strong> Как можно скорее</p>`;
            } else if (deliveryTime.value === 'specific') {
                const specificTime = document.getElementById('delivery-time-input').value;
                summary += `<p><strong>Время доставки:</strong> ${specificTime}</p>`;
            }
        }
        
        // Добавляем комментарий если есть
        if (comment.trim()) {
            summary += `<p><strong>Комментарий:</strong> ${comment}</p>`;
        }
        summary += '</div>';
        
        return summary;
    }
    
    showOrderConfirmation(orderSummary, onConfirm) {
        const notification = document.createElement('div');
        notification.className = 'notification confirmation';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>Подтверждение заказа</h3>
                <div class="order-summary-details" style="max-height: 300px; overflow-y: auto; padding: 10px; background: #f8f9fa; border-radius: 8px; margin: 15px 0;">
                    ${orderSummary}
                </div>
                <p style="margin: 20px 0; font-weight: bold; text-align: center;">Всё верно?</p>
                <div class="confirmation-buttons" style="display: flex; gap: 15px; justify-content: center;">
                    <button class="notification-cancel-btn" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Изменить</button>
                    <button class="notification-confirm-btn" style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Подтвердить заказ</button>
                </div>
            </div>
            <div class="notification-overlay"></div>
        `;
        
        this.showCustomNotification(notification);
        
        // Обработчики кнопок
        const cancelBtn = notification.querySelector('.notification-cancel-btn');
        const confirmBtn = notification.querySelector('.notification-confirm-btn');
        
        cancelBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        confirmBtn.addEventListener('click', () => {
            this.hideNotification(notification);
            onConfirm();
        });
        
        // Закрытие по overlay
        const overlay = notification.querySelector('.notification-overlay');
        overlay.addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }
    
    simulateFormSubmission() {
        console.log('Simulating form submission');
        
        // Имитируем загрузку
        const loadingNotification = document.createElement('div');
        loadingNotification.className = 'notification loading';
        loadingNotification.innerHTML = `
            <div class="notification-content">
                <h3>Отправка заказа...</h3>
                <p>Пожалуйста, подождите</p>
                <div class="loading-spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
            </div>
            <div class="notification-overlay"></div>
        `;
        
        this.showCustomNotification(loadingNotification);
        
        // Добавляем стили для спиннера
        if (!document.querySelector('#loading-spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-spinner-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Имитируем задержку отправки
        setTimeout(() => {
            this.hideNotification(loadingNotification);
            this.showSuccessNotification();
            
            // Сбрасываем форму после успешной отправки
            setTimeout(() => {
                this.resetForm();
            }, 100);
        }, 1500);
    }
    
    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>Успех!</h3>
                <p>Ваш заказ успешно отправлен!</p>
                <div class="success-details">
                    <p>Мы свяжемся с вами для подтверждения заказа.</p>
                    <p>Спасибо, что выбрали наш сервис!</p>
                </div>
                <button class="notification-ok-btn" style="margin-top: 15px;">Отлично</button>
            </div>
            <div class="notification-overlay"></div>
        `;
        
        this.showCustomNotification(notification);
        
        // Обработчик кнопки "Отлично"
        const okBtn = notification.querySelector('.notification-ok-btn');
        okBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Также закрываем через 5 секунд автоматически
        setTimeout(() => {
            if (notification.parentNode) {
                this.hideNotification(notification);
            }
        }, 5000);
    }
    
    resetForm() {
        console.log('Resetting form...');
        
        // Только сбрасываем личные данные, НЕ трогаем выпадающие списки с блюдами
        // OrderManager сам сбросит выбранные блюда через свой resetOrder()
        
        // Сбрасываем форму через OrderManager (он сбросит только выбранные блюда)
        if (typeof orderManager !== 'undefined' && orderManager.resetOrder) {
            orderManager.resetOrder();
        }
        
        // Сбрасываем только личные данные, НЕ выпадающие списки с блюдами
        const form = document.querySelector('.order-form-container');
        if (form) {
            // Только текстовые поля, email, телефон, textarea
            const inputs = form.querySelectorAll('input[type="text"]:not([id*="soup"]):not([id*="salad"]):not([id*="main"]):not([id*="drink"]):not([id*="dessert"]), input[type="email"], input[type="tel"], textarea');
            inputs.forEach(input => {
                input.value = '';
            });
            
            // Сбрасываем радио-кнопки
            const radios = form.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.checked = false;
            });
            
            // Устанавливаем чекбокс по умолчанию
            const newsletter = document.getElementById('newsletter');
            if (newsletter) {
                newsletter.checked = true;
            }
            
            // НЕ сбрасываем select'ы с блюдами - они управляются через OrderManager
            // Не трогаем: soup, salad, main-course, drink, dessert
        }
        
        console.log('Form reset complete - personal data cleared, dishes remain managed by OrderManager');
    }
    
    showNotification(message, type = 'error') {
        console.log(`Showing ${type} notification:`, message);
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <h3>${type === 'error' ? 'Внимание!' : 'Информация'}</h3>
                <div class="notification-message">${message}</div>
                <button class="notification-ok-btn">Окей</button>
            </div>
            <div class="notification-overlay"></div>
        `;
        
        this.showCustomNotification(notification);
    }
    
    showCustomNotification(notification) {
        // Удаляем существующие уведомления
        const existingNotifications = this.notificationContainer.querySelectorAll('.notification');
        existingNotifications.forEach(existingNotification => {
            this.hideNotification(existingNotification);
        });
        
        // Добавляем новое уведомление
        this.notificationContainer.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Обработчики закрытия
        this.setupNotificationCloseHandlers(notification);
    }
    
    setupNotificationCloseHandlers(notification) {
        // Кнопка "Окей" (если есть)
        const okBtn = notification.querySelector('.notification-ok-btn');
        if (okBtn) {
            okBtn.addEventListener('click', () => {
                this.hideNotification(notification);
            });
        }
        
        // Overlay
        const overlay = notification.querySelector('.notification-overlay');
        overlay.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Клавиша ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.hideNotification(notification);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        notification._escHandler = escHandler;
    }
    
    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                if (notification._escHandler) {
                    document.removeEventListener('keydown', notification._escHandler);
                }
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Инициализация
let orderValidator;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing OrderValidator');
    
    // Даем время другим скриптам загрузиться
    setTimeout(() => {
        orderValidator = new OrderValidator();
        window.orderValidator = orderValidator; // Делаем глобальной для тестирования
        
        console.log('OrderValidator initialized successfully');
        console.log('System ready - form validation is active');
    }, 1000);
});