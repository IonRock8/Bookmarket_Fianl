<template>
    <v-container>
        <v-card>
            <v-card-text class="text-center">
                <v-icon color="green" size="64">mdi-check-circle-outline</v-icon>
                <p>ขอบคุณที่ชำระเงิน เรากำลังดำเนินการตามคำสั่งซื้อของคุณ</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn x-large to="/">กลับไปหน้าหลัก</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
    
</template>

<script>
export default {
    mounted() {
        this.$store.commit("CLEAR_ORDER");
    }
}
</script>
