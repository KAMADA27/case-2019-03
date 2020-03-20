<template>
    <v-layout class="form-card" column>
        <p class="form-title title">PRESCRIÇÃO MÉDICA</p>
        <v-layout v-for="prescription in prescriptions" :key="prescription.key" column>
            <p><strong>Remédio:</strong> {{ prescription.name }}</p>
            <p><strong>Posologia:</strong> {{ prescription.dosage }}</p>
            <v-layout  justify-space-between>
                <p><strong>Via de administração:</strong> {{ prescription.viaAdministracao }}</p>
                <v-btn 
                    color="red darken-1" 
                    class="btn-list"
                    @click="removePrescription(prescription.idMedicamento)">
                        Remover
                </v-btn>
            </v-layout>
            <v-divider style="margin-bottom: 20px"></v-divider>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        name: 'listMedicament',
        props: {
            prescriptions: Array
        },
        methods: {
            removePrescription(id) {
                let index;

                index = this.prescriptions.findIndex(p => p.idMedicamento === id);
                this.prescriptions.splice(index, 1);
                localStorage.completePrescription = JSON.stringify(this.prescriptions);
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

    .btn-list {
        color: #ffffff;
        position: relative;
        bottom: 15px;
    }
</style>