<template>
    <div class="orders-list-container">
        <h1>order list</h1>
        <table class="orders-table">
            <thead>
                <tr>
                    <th>Número de orden</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.orderNumber }}</td>
                    <td>${{ order.total }}</td>
                    <td>
                        <button class="btn-small btn-danger" @click="deleteOrder(order.id)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/create-order" class="add-order-link">Agregar nueva orden</router-link>
    </div>
</template>

<script>
    import {db} from '../firebaseConfig';
    import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

    export default {
        data(){
            return{
                orders: [],
            };
        },
        async created(){
            await this.fetchOrders();
        },
        methods:{
            async fetchOrders(){
                const querySnapshot = await getDocs(collection(db,"orders"));
                this.orders =querySnapshot.docs.map(doc=>({id: doc.id, ...doc.data()}));
            },
            async deleteOrder(id){
                await deleteDoc(doc(db,"orders", id));
                await this.fetchOrders();
            },

        }
    };
</script>

<style scoped>
    .order-list-container{
        max-width:800px;
        margin: auto;
        padding: 20px;
    }

    .orders-table{
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .orders-table th,
    .orders-table td{
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    .orders-table th{
        background-color: #f5f5f5;
    }

    .btn-small {
        font-size: 0.8rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
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

    .add-order-link {
        display: inline-block;
        margin-top:20px;
        padding: 10px 15px;
        text-decoration: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
    }

    .add-order-link:hover{
        background-color: #0056b3;
    }
</style>