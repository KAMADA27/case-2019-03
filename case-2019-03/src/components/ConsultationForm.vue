<template>
    <v-layout column style="overflow: auto">
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
            <p v-for="(interation, id) in foundInteraction" :key="id" class="warning-msg">
                ATENÇÃO! A INTERAÇÃO ENTRE {{ interation.farmaco1 }} E {{ interation.farmaco2 }} TEM RISCO {{ interation.nome }}
            </p>
            <v-text-field class="form-input" v-model="dosage" label="Posologia"></v-text-field>
            <v-text-field class="form-input" v-model="medicament.viaAdministracao" label="Via de administração"></v-text-field>
            <v-layout justify-end style="margin-bottom: 25px">
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
        <list-medicament 
            v-if="completePrescription.length != 0" 
            :prescriptions="completePrescription">
        </list-medicament>
        <v-layout justify-center>
            <v-btn 
                color="blue darken-1" 
                style="color: #ffffff"
                :disabled="completePrescription.length === 0"
                @click="endOfConsultation">
                    Finalizar atendimento
            </v-btn>
            <v-btn 
                color="red darken-1" 
                style="color: #ffffff"
                to="/">
                    Cancelar atendimento
            </v-btn>
        </v-layout>
        <modal name="end-of-consultation" :clickToClose="false" height="240">
            <v-layout align-center column>
                <p class="modal-title">ATENDIMENTO FINALIZADO COM SUCESSO!</p>
                <p>Para prosseguir com o próximo atendimento clique em FINALIZAR</p>
                <v-btn 
                    color="blue darken-1" 
                    class="btn-modal"
                    to="/">
                        FINALIZAR
                </v-btn>
            </v-layout>
        </modal>
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
                medicamentEndpoint: 'http://www.mocky.io/v2/5e73ca8b300000fd9b2e6828',
                dosage: '',
                completePrescription: [],
                drugsInteraction: [],
                drugInteractionEndpoint: 'http://www.mocky.io/v2/5e73bbeb3000002fab2e67c7',
                interactions: [],
                foundInteraction: []
            }
        },
        created() {
            this.getAllMedicaments();
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
                console.log(this.$refs.form)
                let doctorPrescription = { ...this.medicament };
                doctorPrescription.dosage = this.dosage;

                this.completePrescription.push(doctorPrescription);
                localStorage.completePrescription = JSON.stringify(this.completePrescription);
                this.clear();
            },
            clear() {
                this.medicament = [];
                this.dosage = '',
                this.foundInteraction = [];
            },
            verifyInteraction(medicament) {
                let hasInteration = [];
                this.foundInteraction = [];

                if (this.completePrescription.length == 0) {
                    return 
                }

                this.drugsInteraction.forEach((interation) => {
                    let interations;
                    
                    [interation.farmaco1, interation.farmaco2].forEach(farmaco => {
                        this.completePrescription.forEach(pre => {
                            interations = pre.farmacos.includes(farmaco);
                            if (interations === true) {
                               hasInteration.push(interation);
                            }
                        })
                    });
                })

                hasInteration.forEach(interation => {
                    let result;

                    result = [interation.farmaco1, interation.farmaco2].some(farmaco => {
                        return medicament.farmacos.includes(farmaco);
                    })

                    if (result) {
                        this.foundInteraction.push(interation)  
                    }  
                })
            },
            endOfConsultation() {
                console.log(this.$modal)
                this.$modal.show('end-of-consultation');
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

    .modal-title {
        color: #1e88e5;
        font-size: 20px;
        font-weight: 500;
        margin-top: 30px;
    }

    .btn-modal {
        color: #ffffff;
        margin-top: 30px;
    }
</style>