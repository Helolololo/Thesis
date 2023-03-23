// RXJS OBSERVABLES

// create observable
const observable = Rx.Observable.create(observer => {
    observer.next('hello')      // what observable sends to server
    observer.next('world')

})
observable.subscribe(val => print(val))

// observable of any kind of data
const mashup = Rx.Observable.of('anything', ['I', 'want'], 0, true, { cool: 'stuff' })
mashup.subscribe(val => print(val))

// observable from click events
const clicks = Rx.Observable.fromEvent(document, 'click')

clicks.subscribe(click => console.log(click))

// convert promise directly into an observable
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {      // timeout that simulates an api call
        resolve('fake api call resolved!')
    }, 1000)
})

const obsPromise = Rx.Observable.fromPromise(promise)

// converst observable back to a promise
obsPromise.subscribe(result => print(result))

// cold observable
const cold = Rx.Observable.create(observer => {
    observer.next(Math.random())        // when i do this outside of the observable it becomes hot
})
cold.subscribe(a => print(`Cold Subscriber A: ${a}`))
cold.subscribe(b => print(`Cold Subscriber B: ${b}`))

// hot observable without decoupling variable
const hot = cold.publish()
hot.subscribe(a => print(`Hot Subscriber A: ${a}`))
hot.subscribe(b => print(`Hot Subscriber B: ${b}`))
hot.connect()

// timer
const timer = Rx.Observable.timer(1000)
timer.subscribe(done => print('1s done!'))

// repeating timer that finishes after some time
const interval = Rx.Observable.interval(1000)
    .finally(() => print('Timer done!'))
const subscription = interval.subscribe(x => print(x))
setTimeout(() => {
    subscription.unsubscribe()
}, 5000)


// RXJS OPERATORS

// map transforms emitted value
/* const jsonString = '{ "type:" "Dog", "breed": "Pug" }'
const apiCall = Rx.Observable.of(jsonString);
apiCall
    .map(json => JSON.parse(json))
    .subscribe(obj => {
        print(obj.type)
        print(obj.breed)
    }) */

// do executes code without effecting observable
const names = Rx.Observable.of('Isabelle')
names
    .do(name => print(name))
    .map(name => name.toUpperCase())
    .do(name => print(name))
    .subscribe()

// filter
const numbers = Rx.Observable.of(-3, 5, 7, 3, -9, 10, -2)
numbers
    .filter(n => n >= 0)
    .subscribe(n => print(n))

// debounce & throttle deal with events that emit more values than i need

// scan through emitted values

// switch map used when i need a value from one observable before getting 2nd observable

// take until complete observable based on value of another observable

// take while emit value until condition is met

// zip to combine observable of same length which are connected in some way

// helper to print values
function print(val) {
    let el = document.createElement('p')        // append the results from the observable to the browser
    el.innerText = val
    document.body.appendChild(el)
}