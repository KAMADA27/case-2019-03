<template>
    <v-layout column>
        <v-form class="form-card">
            <p class="form-title title">CRIAÇÃO DA PRESCRIÇÃO MÉDICA</p>
            <v-select 
                :items="medicaments"
                v-model="medicament"
                class="form-input"
                @change="verifyInteraction(medicament)" 
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
            <p class="warning-msg" v-if="warningMsg">
                ATENÇÃO! A INTERAÇÃO ENTRE {{ foundInteraction.Farmaco1 }} E {{ foundInteraction.Farmaco2 }} TEM RISCO {{ foundInteraction.Nome }}
            </p>
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
                    @click="clear">
                        Limpar
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
                medicamentEndpoint: 'http://www.mocky.io/v2/5e72bf1c330000930044ca2f',
                dosage: '',
                routeOfAdm: '',
                routesOfAdm: [],
                routeOfAdmEndpoint: 'http://www.mocky.io/v2/5e71915a300000d99b7a35e4',
                completePrescription: [],
                drugsInteraction: [],
                drugInteractionEndpoint: 'http://www.mocky.io/v2/5e72e8ce330000b35444cab5',
                listInteractions: [],
                foundInteraction: {},
                warningMsg: false
            }
        },
        created() {
            this.getAllMedicaments();
            this.getAllRouteOfAdm();
            this.getAllInteraction();
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
            getAllInteraction() {
                axios.get(this.drugInteractionEndpoint)
                    .then(response => {
                        this.drugsInteraction = response.data;
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
                this.clear();
            },
            clear() {
                this.medicament = [];
                this.dosage = '',
                this.routeOfAdm = ''
            },
            verifyInteraction(medicament) {
                let searchDrug;
                let interationIndex;
                let medicamentIndex;
                this.warningMsg = false;

                if (this.completePrescription.length == 0) {
                    return 
                }

                this.drugsInteraction.filter(drug => {
                    this.completePrescription.forEach(pre => {
                        searchDrug = pre.Farmacos.find(farmaco => {
                            return farmaco == drug.Farmaco1 || farmaco == drug.Farmaco2
                        });
                    
                        if (searchDrug != undefined) {
                            this.listInteractions.push(drug);
                        }
                    })
                })

                interationIndex = this.listInteractions.findIndex(interation => {
                    medicamentIndex = medicament.Farmacos.findIndex(med => {
                        return med == interation.Farmaco1 || med == interation.Farmaco2
                    });

                    return interation.Farmaco1 == medicament.Farmacos[medicamentIndex] || interation.Farmaco2 == medicament.Farmacos[medicamentIndex]; 
                });

                if (interationIndex != -1) {
                    this.warningMsg = true;
                    this.foundInteraction = this.listInteractions[interationIndex];
                }

                console.log(this.foundInteraction);
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
        margin: 20px 0 30px 0;
    }

    .warning-msg {
        color: #e53935;
        font-weight: 500;
        position: relative;
        bottom: 15px;
    }
</style>