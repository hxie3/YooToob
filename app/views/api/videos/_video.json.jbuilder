json.set! video.id do
    json.extract! video, :id, :title, :description, :views, :published_at
    json.userId video.user_id
    json.username video.user.username
    # json.video = url_for(video.video)
end
