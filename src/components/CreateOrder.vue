<template>
    <div class="create-order-container">
        <h1>Crear una nueva orden</h1>
        <form @submit.prevent="submitOrder">
            <input v-model="newOrder.orderNumber" placeholder="Número de orden" class="input-style"/>
            <table class="product-selection-table">
                <thead>
                    <tr>
                        <th>Productos</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in availableProducts" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>${{ product.price }}</td>
                        <td>
                            <input type="number" v-model="product.quantity" min="0" placeholder="Quantity" class="input-style"/>
                        </td>
                        <td>
                            <button type="button" @click="addProductToOrder(product)" class="add-button" :disabled="isProductAdded(product)">Agregar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>Productos seleccionados:</h2>
            <ul>
                <li v-for="(item, index) in newOrder.products" :key="index">
                    {{ item.name }} - Cantidad: {{ item.quantity }} - Total: ${{ item.total }}
                    <button @click="removeProductFromOrder(index)" class="btn-small btn-danger">Elimiar</button>
                </li>
            </ul>
            <p><strong>Total de la orden: ${{ newOrder.total }}</strong></p>
            <button type="submit" clas="submit-button">Enviar orden</button>
        </form>
    </div>
</template>

<script>
    import {db} from '../firebaseConfig';
    import { collection, addDoc, getDocs } from 'firebase/firestore';

    export default{
        data(){
            return {
                newOrder:{
                    orderNumber: '',
                    products: [],
                    total: 0,
                },
                availableProducts: [],
            };
        },
        async created(){
            await this.fetchProducts();
        },
        methods:{
            async fetchProducts(){
                const querySnapshot = await getDocs(collection(db,"products"));
                this.availableProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    quantity:0,
                }));
            },
            addProductToOrder(selectedProduct){
                if(selectedProduct.quantity <= 0){
                    alert('Por favor agregue una cantidad válida');
                    return;
                }
                const productTotal= selectedProduct.price * selectedProduct.quantity;
                const productToAdd = {
                    ...selectedProduct,
                    total:productTotal,
                };
                this.newOrder.products.push(productToAdd);
                this.calculateOrderTotal();
            },
            calculateOrderTotal(){
                this.newOrder.total = this.newOrder.products.reduce((acc, product) => acc + product.total, 0);
            },
            isProductAdded(product){
                return this.newOrder.products.some(item => item.id === product.id);
            },
            removeProductFromOrder(index){
                this.newOrder.products.splice(index,1);
                this.calculateOrderTotal();
            },
            async submitOrder(){
                if(this.newOrder.products.length === 0){
                    alert("Por favor, agrege al menos un producto");
                    return;
                }
                await addDoc(collection(db, "orders"), this.newOrder);
                alert("La orden fue creada satisfactoriamente");
                this.resetORderFrom();
            },
            resetORderFrom(){
                this.newOrder = {
                    orderNumber: '',
                    products: [],
                    total: 0
                };
                this.availableProducts.forEach(product => product.quantity = 0);
            },
        },
    }
</script>

<style scoped>
    .create-order-container{
        max-width:800px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        background: #f9f9f9;
    }

    form{
        display: flex;
        flex-direction: column;
        gap:15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="number"],
    input[type="text"] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }

    button {
        font-size: 1rem;
    }

    .add-button {
        background-color: #007bff;
        color:white;
    }

    .add-button:hover{
        background-color: #0056b3;
    }

    .submit-button{
        background-color: #28a745;
        color: white;
    }

    .submit-button:hover{
        background-color: #19792f;
        color: white;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li{
        background: #e9ecef;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btn-small.btn-danger{
        background-color: #cd3545 !important;
        color: white;
    }

    .btn-small:hover,
    .btn-small.btn-danger:hover{
        background-color: #c82333;
        opacity: 0.8;
    }
</style>