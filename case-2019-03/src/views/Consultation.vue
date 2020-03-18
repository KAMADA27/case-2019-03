<template>
    <v-container fluid>
        <v-layout align-center class="card-container">
            <v-card max-width="400" style="width: 100%">
                <v-card-text>
                    <p class="title" style="color: #1e88e5">
                        INFORMAÇÃO MÉDICA
                        <v-icon color="blue darken-1">local_hospital</v-icon>
                    </p>
                    <div class="card-text">
                        <p><strong>Nome:</strong> {{ doctor.name }}</p> 
                        <p><strong>Especialidade:</strong> {{ doctor.specialty }}</p>
                        <p><strong>CRM:</strong> {{ doctor.crm }}</p> 
                    </div>
                </v-card-text>
            </v-card>
            <div class="space"></div>
            <v-card max-width="400" style="width: 100%">
                <v-card-text>
                    <p class="title" style="color: #1e88e5">
                        INFORMAÇÃO PACIENTE
                        <v-icon color="blue darken-1">face</v-icon>
                    </p>
                    <div class="card-text">
                        <p><strong>Nome:</strong> {{ pacient.name }}</p> 
                        <p><strong>Idade:</strong> {{ pacient.age }}</p>
                        <p><strong>Sexo:</strong> {{ pacient.gender }}</p> 
                    </div>
                </v-card-text>
            </v-card>
        </v-layout>
        <consultation-form></consultation-form>
    </v-container>
</template>

<script>
    import ConsultationForm from '@/components/ConsultationForm';

    export default {
        name: 'consultation',
        components: {
            ConsultationForm
        },
        data() {
            return {
                doctor: [],
                pacient: []
            }
        },
        created() {
            this.doctor = JSON.parse(localStorage.getItem('doctor'));
            this.pacient = JSON.parse(localStorage.getItem('pacient'));
        }
    }
</script>

<style scoped>
    .card-container {
        justify-content: center;
        margin: 40px 0 40px 0;
    }

    .card-text {
        display: flex;
        flex-direction: column;
    }

    .space {
        margin: 0 40px 0 40px;
    }
</style>