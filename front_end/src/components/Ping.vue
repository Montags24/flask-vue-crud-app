<template>
    <div class="container">
        <button type="button" class="btn btn-primary">
            {{ msg }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Ping',
    data() {
        return {
            msg: 'Hello!',
        };
    },
    methods: {
        getMessage() {
            const url = "http://localhost:5000/ping";
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': 'Bearer my-token',
                },
            }

            fetch(url, requestOptions)
                .then(response => {
                    // Check if the request was successful (status code 200-299)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Parse the JSON response
                    return response.json();
                })
                .then(data => {
                    this.msg = data;
                }).catch(error => {
                    // Handle errors
                    console.error('Fetch error:', error);
                });
        }
    },
    created() {
        this.getMessage();
    }
};
</script>