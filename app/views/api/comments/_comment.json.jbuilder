json.set! comment.id do
    json.extract! comment, :id, :body, :created_at
    json.userId comment.user_id
    json.username comment.user.username
    json.profilePicture url_for(comment.user.profile_picture)
end
