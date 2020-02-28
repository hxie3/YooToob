export const fetchVideos = () => (
    $.ajax({
        url: '/api/videos',
        method: 'GET',
    })
)

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

export const updateVideo = (video) => {
    return (
        $.ajax({
            url: `/api/videos/${video.id}`,
            method: 'PATCH',
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