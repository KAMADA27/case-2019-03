<template>
    <v-container>
        <v-layout>
            <v-select label="Escolha um médico"></v-select>
            <v-spacer></v-spacer>
            <v-select label="Escolha um paciente"></v-select>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'schedule'
    }
</script>