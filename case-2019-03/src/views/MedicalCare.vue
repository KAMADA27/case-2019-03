<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center column>
            <v-btn color="blue darken-1" style="color: white">
                Agendar Consulta
                <v-icon style="padding-left: 5px">local_hospital</v-icon>
            </v-btn>
            <schedule></schedule>
        </v-layout>
    </v-container>
</template>

<script>
import Schedule from '@/components/Schedule';

    export default {
        name: 'medicalCare',
        components: {
            Schedule
        }
    }
</script>