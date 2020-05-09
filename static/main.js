function sendRequest(url, method, data) {
    const configAxios = axios({
        method: method,
        url: url,
        data: data,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    return configAxios;
}

const app = new Vue({
    el: '#app',
    data: {
        task: '',
        tasks: [{title:'probando'}]
    },
    created() {
        sendRequest('','get')
            .then(function(response){
                this.tasks = response.data.tasks;
            });
    },
    methods: {
        createTask() {
            const formData = new FormData();
            formData.append('title', this.task);

            sendRequest('', 'post', formData)
                .then(function(response){
                    this.tasks.push(response.data.task);
                    this.task = '';
                });
        }
    }
})