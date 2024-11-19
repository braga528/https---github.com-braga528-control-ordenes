<template>
  <div id="app">
    <h1>Bom appeti - Comida para llevar</h1>
    <nav>
      <router-link to="/products">Menú</router-link>
      <router-link to="/orders">Ordenes</router-link>
      <router-link to="/create-order">Crear order</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App',
  };
</script>

<style>
  nav a {
    margin: 0 10px;
  }
</style>