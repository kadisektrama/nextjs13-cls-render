import Cookies from "js-cookie";

export function AdvancedFetch(...options: Parameters<typeof fetch>) {
    return fetch(...options)
        .then(async res => {
            if (res.status === 404) {
                throw new Error('404 Page Not Found')
            }
            if (res.status === 422) {
                throw new Error(await res.json().then((result) =>  result.message))
            }
            if (res.status === 500) {
                return res
            }
            if (res.status >= 400) {
                throw new Error(res.statusText)
            }

            if (res.headers.get("content-type") === 'application/json') {
                return res.json()
            }
            if (res.headers.get("content-type") === 'text/plain') {
                return res.text()
            }
            if (res.headers.get("content-type")?.startsWith('text/html')) {
                return res.text()
            }

            return res
        })
}

const token = {
    toString: function() {
        return `Bearer ${Cookies.get('token')}`;
    }
};

export const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
    }
};