export const signup = (user) => (
    $.ajax({
        url: '/api/users',
        method: 'POST',
        data: { user }
    })
)

export const newsignup = user => (
    $.ajax({
        url: '/api/users',
        method: 'GET',
        data: { user }
    })
)

export const login = (user) => (
    $.ajax({
        url: '/api/session',
        method: 'POST',
        data: { user }
    })
)

export const newlogin = (user) => (
    $.ajax({
        url: '/api/session',
        method: 'PATCH',
        data: { user } 
    })
)

export const logout = () => (
    $.ajax({
        url: '/api/session',
        method: 'DELETE'
    })
)

export const update = (formData) => {
    return (
        $.ajax({
            url: '/api/users',
            method: 'PATCH',
            data: formData,
            contentType: false,
            processData: false
        })
    )
}