<template>
    <v-layout column>
        <v-form class="form-card">
            <p class="form-title title">CRIAÇÃO DA PRESCRIÇÃO MÉDICA</p>
            <v-select 
                :items="medicaments"
                v-model="medicament"
                class="form-input" 
                label="Nome do medicamento">
                    <template slot='selection' slot-scope='{ item }'>
                        {{ item.name }}
                    </template>
                    <template slot='item' slot-scope='{ item }'>
                        <span style="color: black">
                            {{ item.name }}
                        </span>
                    </template>
            </v-select>
            <v-text-field class="form-input" v-model="dosage" label="Posologia"></v-text-field>
            <v-select 
                :items="routesOfAdm"
                item-text="name"
                v-model="routeOfAdm"
                class="form-input" 
                label="Via de administração">
            </v-select>
            <v-layout justify-center>
                <v-btn 
                    color="blue darken-1" 
                    style="color: #ffffff"
                    @click="addMedicament">
                        {{  completePrescription.length == 0 ? 'Adicionar' : 'Adicionar outro' }}
                </v-btn>
                <v-btn 
                    color="red darken-1" 
                    style="color: #ffffff" 
                    @click="cancelMedicament">
                        Cancelar
                </v-btn>
            </v-layout>
        </v-form>
        <list-medicament v-if="completePrescription.length != 0" :prescriptions="completePrescription"></list-medicament>
    </v-layout>
</template>

<script>
    import axios from 'axios';
    import ListMedicament from './ListMedicament';

    export default {
        name: 'consultation-form',
        components: {
            ListMedicament
        },
        data() {
            return {
                medicament: [],
                medicaments: [],
                medicamentEndpoint: 'http://www.mocky.io/v2/5e7184bc300000d2227a35c1',
                dosage: '',
                routeOfAdm: '',
                routesOfAdm: [],
                routeOfAdmEndpoint: 'http://www.mocky.io/v2/5e71915a300000d99b7a35e4',
                completePrescription: [],
            }
        },
        created() {
            this.getAllMedicaments();
            this.getAllRouteOfAdm();
        }, 
        methods: {
            getAllMedicaments() {
                axios.get(this.medicamentEndpoint)
                    .then(response => {
                        this.medicaments = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            getAllRouteOfAdm() {
                axios.get(this.routeOfAdmEndpoint)
                    .then(response => {
                        this.routesOfAdm = response.data
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            addMedicament() {
                let doctorPrescription = { ...this.medicament };
                doctorPrescription.dosage = this.dosage;
                doctorPrescription.routeOfAdm = this.routeOfAdm;

                this.completePrescription.push(doctorPrescription);
                localStorage.completePrescription = JSON.stringify(this.completePrescription);
            },
            cancelMedicament() {
                this.medicament = [];
                this.dosage = '',
                this.routeOfAdm = ''
            }
        }
    }
</script>

<style scoped>
    .form-card {
        font-size: 16px;
        width: 880px;
        padding: 15px 30px;
        border-radius: 4px;
        margin: 50px auto;
        background-color: #fff;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    }
    
    .form-title {
        color: #1e88e5;
        margin: 15px 0 40px 0;
    }

    .form-input {
        margin: 20px 0 40px 0;
    }
</style>