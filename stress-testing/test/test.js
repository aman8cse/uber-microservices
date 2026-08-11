import autocannon from 'autocannon';

const urls = ["http://localhost:3000", "http://localhost:3000/stress-test"];
const duration = 30;

urls.forEach(url => {
    const instance = autocannon({ url, duration }, (err, result) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log("URL: ", url)
            console.log('No. of requests:', result.requests.total);
            console.log('Duration:', result.duration);
        }
    });


    autocannon.track(instance, { renderProgressBar: false, renderLatencyTable: false });
})