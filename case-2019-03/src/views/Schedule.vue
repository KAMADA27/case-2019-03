<template>
    <v-container fluid fill-height style="flex-direction: column">
        <v-layout align-center justify-center style="width:100%">
            <span class="opt-select">
                <v-select :items="doctors" item-text="name" color="blue darken-1" label="Escolha um médico"></v-select>
            </span>
            <span class="opt-select">
                <v-select :items="pacients" item-text="name" color="blue darken-1" label="Escolha um paciente"></v-select>
            </span>
        </v-layout>
        <v-layout justify-center>
            <v-btn color="blue darken-1" class="btn-style">Agendar</v-btn>
            <v-btn color="red darken-1" class="btn-style" to="/">Cancelar agenda</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'schedule',
        data() {
            return {
                doctors: [],
                pacients: [],
                doctorEndpoint: 'http://www.mocky.io/v2/5e704e8230000081007a2de9',
                pacientEndpoint: 'http://www.mocky.io/v2/5e7053aa30000029007a2dfb'
            }
        },
        created() {
            this.getAllDoctor();
            this.getAllPacients();
        },
        methods: {
            getAllDoctor() {
                axios.get(this.doctorEndpoint)
                    .then(response => {
                        this.doctors = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            getAllPacients() {
                axios.get(this.pacientEndpoint)
                    .then(response => {
                        debugger
                        this.pacients = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
</script>

<style scoped>
    .btn-style {
        color: white;
        width: 55%;
    }

    .opt-select {
        width: 30%;
        margin: 50px;
    }
</style>