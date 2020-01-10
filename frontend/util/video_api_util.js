export const fetchVideos = () => (
    $.ajax({
        url: '/api/videos',
        method: 'GET',
        error: err => console.log(err)
    })
)

export const createVideo = (video) => (
    $.ajax({
        url: '/api/videos',
        method: 'POST',
        data: { video }
    })
)

export const fetchVideo = (videoId) => (
    $.ajax({
        url: `/api/videos/${videoId}`,
        method: 'GET'
    })
)

export const updateVideo = (video) => (
    $.ajax({
        url: `/api/videos/${video.id}`,
        method: 'PATCH',
        data: { video }
    })
)

export const deleteVideo = (videoId) => (
    $.ajax({
        url: `/api/videos/${videoId}`,
        method: 'DELETE'
    })
)