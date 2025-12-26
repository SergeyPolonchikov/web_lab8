class ApiService {
    constructor() {
        this.API_KEY = '2b974891-4ca2-4132-9a60-d2cdb785f6bd'; // Замените на ваш API ключ
        this.BASE_URL = 'https://edu.std-900.ist.mospolytech.ru';
    }
    
    setApiKey(apiKey) {
        this.API_KEY = apiKey;
    }
    
    async getDishes() {
        try {
            const response = await fetch(`${this.BASE_URL}/labs/api/dishes?api_key=${this.API_KEY}`);
            if (!response.ok) throw new Error('Ошибка загрузки блюд');
            return await response.json();
        } catch (error) {
            console.error('API Error (getDishes):', error);
            throw error;
        }
    }
    
    async createOrder(orderData) {
        try {
            const response = await fetch(`${this.BASE_URL}/labs/api/orders?api_key=${this.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка при создании заказа');
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error (createOrder):', error);
            throw error;
        }
    }
    
    async getOrders() {
        try {
            const response = await fetch(`${this.BASE_URL}/labs/api/orders?api_key=${this.API_KEY}`);
            if (!response.ok) throw new Error('Ошибка загрузки заказов');
            return await response.json();
        } catch (error) {
            console.error('API Error (getOrders):', error);
            throw error;
        }
    }
    
    async deleteOrder(orderId) {
        try {
            const response = await fetch(`${this.BASE_URL}/labs/api/orders/${orderId}?api_key=${this.API_KEY}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка при удалении заказа');
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error (deleteOrder):', error);
            throw error;
        }
    }
}

// Создаем глобальный экземпляр API сервиса
const apiService = new ApiService();