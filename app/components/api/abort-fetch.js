/*
    thanks to :
    https://www.npmjs.com/package/react-native-cancelable-fetch
 */
function headers(xhr) {
    let head = new Headers();
    let pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function(header) {
        let split = header.trim().split(':');
        let key = split.shift().trim();
        let value = split.join(':').trim();
        head.append(key, value)
    });
    return head
}

class AbortFetch {
    constructor(input, init){
        this.promise;
        this.responseBody;
        this.xhr;

        // TODO request timeout

        this.promise = new Promise((resolve, reject) => {
            let request;
            if (Request.prototype.isPrototypeOf(input) && !init) {
                request = input
                // resolve('true');return;
            } else {
                request = new Request(input, init);
                // resolve('false');return;
            }

            this.xhr = new XMLHttpRequest();

            let responseURL = () => {
                if ('responseURL' in this.xhr) {
                    return this.xhr.responseURL
                }

                // Avoid security warnings on getResponseHeader when not allowed by CORS
                if (/^X-Request-URL:/m.test(this.xhr.getAllResponseHeaders())) {
                    return this.xhr.getResponseHeader('X-Request-URL')
                }

                return;
            }

            this.xhr.onload = () => {
                var status = (this.xhr.status === 1223) ? 204 : this.xhr.status;
                if (status < 100 || status > 599) {
                    reject(new TypeError('Network request failed'))
                    return
                }

                var options = {
                    status: status,
                    statusText: this.xhr.statusText,
                    headers: headers(this.xhr),
                    url: responseURL()
                }
                var body = 'response' in this.xhr ? this.xhr.response : this.xhr.responseText;
                this.responseBody = body;
                resolve(new Response(body, options))
            }

            this.xhr.addEventListener('error',evt=>{
                reject(evt);
            });
            // this.xhr.onerror = () => {
                // reject(new TypeError('Network request failed'))
            // }

            this.xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                this.xhr.withCredentials = true
            }

            /* istanbul ignore else  */
            if ('responseType' in this.xhr && typeof Request.prototype.blob === 'function') {
                this.xhr.responseType = 'blob'
            }

            request.headers.forEach((value, name) => {
                this.xhr.setRequestHeader(name, value)
            })

            this.xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
        });
    }
    abort(){
        this.xhr.abort();
    }
    // promise api calls
    then(callback){
        return this.promise.then(callback);
    }
    catch(callback){
        return this.promise.catch(callback);
    }
    finally(callback){
        return this.promise.finally(callback);
    }
}

let abortFetch = (url,options) => {return new AbortFetch(url,options)};

export default abortFetch;