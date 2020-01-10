json.set! video.id do
    json.extract! video, :id, :title, :description, :views, :published_at
    json.username video.user.username
end