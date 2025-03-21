<template>
    <div class="container">
    <main>
        <div class="p2-5 text-center">
            <img class="d-block mx-auto mb-2" src="/images/logo.png" alt="" width="250">
            <h3 style="font-weight: 700;font-size: 25px;">Pre Order Form</h3>
            <p style="font-family: 11px;">A form used to confirm and submit pre-orders,<br> ensuring all required details are correctly provided before finalizing the order</p>
        </div>

        <PreOrderForm />
        
    </main>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; 2017–2025 <a target="_blank" href="https://facebook.com/mamunur6286">Md Mamunur Rashid</a> </p>
        <ul class="list-inline">
        <li class="list-inline-item"><a href="#">Privacy</a></li>
        <li class="list-inline-item"><a href="#">Terms</a></li>
        <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
    </footer>
    </div>
</template>
<script>

import PreOrderForm from '../../componests/PreOrderForm.vue';
export default {
    name: "FrontEnd",
    components: {
        PreOrderForm
    }
}
</script>