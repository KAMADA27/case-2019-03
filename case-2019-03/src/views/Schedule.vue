<template>
    <v-container fluid fill-height style="flex-direction: column">
        <v-layout align-center justify-center style="width:100%">
            <span class="opt-select">
                <v-select 
                    :items="doctors" 
                    v-model="doctor" 
                    label="Escolha um médico">
                        <template slot='selection' slot-scope='{ item }'>
                            {{ item.name }} - {{ item.specialty }}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                            <span style="color: black">
                                {{ item.name }} - {{ item.specialty }}
                            </span>
                        </template>
                </v-select>
            </span>
            <span class="opt-select">
                <v-select 
                    :items="pacients"  
                    v-model="pacient"
                    label="Escolha um paciente">
                        <template slot='selection' slot-scope='{ item }'>
                            {{ item.name }}
                        </template>
                        <template slot='item' slot-scope='{ item }'>
                            <span style="color: black">
                                {{ item.name }}
                            </span>
                        </template>
                </v-select>
            </span>
        </v-layout>
        <v-layout justify-center>
            <v-btn 
                color="blue darken-1" 
                class="btn-style"
                :disabled="doctor.length == 0 || pacient.length == 0" 
                @click="save">
                    Consultar
                </v-btn>
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
                doctor: [],
                doctors: [],
                pacient: [],
                pacients: [],
                doctorEndpoint: 'http://www.mocky.io/v2/5e71142b30000033b97a3424',
                pacientEndpoint: 'http://www.mocky.io/v2/5e715954300000d99b7a3557'
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
                        this.pacients = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            save() {
                localStorage.doctor = JSON.stringify(this.doctor);
                localStorage.pacient = JSON.stringify(this.pacient); 
                this.$router.push('/consultation');
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