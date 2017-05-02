//Code from MDN
//https://developer.mozilla.org/en-US/docs/Tools/Performance/Scenarios/Intensive_JavaScript
const iterations = 500;
const multiplier = 1000000000;

function calculatePrimes(iterations, multiplier) {
    let primes = new Int32Array(iterations);
    for (let i = 0; i < iterations; i++) {
        let candidate = i * (multiplier * Math.random());
        let isPrime = true;
        for (var c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes[i] = candidate;
        }
    }
    return primes;
}

function doPointlessComputationsWithBlocking() {
    let primes = calculatePrimes(iterations, multiplier);
    return primes;
}
