<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-btn color="blue darken-1" style="color: white" to="/schedule">
                Iniciar Atendimento
                <v-icon style="padding-left: 5px">local_hospital</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'medicalCare',
        data() {
            return {
                schedule: false
            }
        }
    }
</script>