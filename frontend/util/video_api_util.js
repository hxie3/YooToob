export const fetchVideos = () => (
    $.ajax({
        url: '/api/videos',
        method: 'GET',
    })
)

export const searchVideos = (query) => {
    return $.ajax({
        url: `/api/videos/search/`,
        method: 'GET',
        data: { query }
    })
}

export const createVideo = (formData) => (
    $.ajax({
        url: '/api/videos',
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
    })
)

export const fetchVideo = (videoId) => (
    $.ajax({
        url: `/api/videos/${videoId}`,
        method: 'GET'
    })
)

export const updateVideo = (formData, videoId) => {
    return (
        $.ajax({
            url: `/api/videos/${videoId}`,
            method: 'PATCH',
            data: formData,
            contentType: false,
            processData: false,
        })
    )
}

export const updateVideoViews = (video) => {
    return (
        $.ajax({
            url: `api/videos/updateViews`,
            method: 'PUT',
            data: { video }
        })
    )
}

export const deleteVideo = (videoId) => (
    $.ajax({
        url: `/api/videos/${videoId}`,
        method: 'DELETE'
    })
)