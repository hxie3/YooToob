json.set! video.id do
    json.extract! video, :id, :title, :description, :views, :created_at
    json.userId video.user_id
    json.username video.user.username
    json.profilePicture url_for(video.user.profile_picture)
    json.thumbnail url_for(video.thumbnail)
    json.thumbnailFile video.thumbnail
    json.video url_for(video.video)
    json.likes video.num_likes
    json.dislikes video.num_dislikes
end
