json.set! comment.id do
    json.extract! comment, :id, :body, :created_at
    json.userId comment.user_id
    json.videoId comment.video_id
    json.username comment.user.username
    json.profilePicture url_for(comment.user.profile_picture)
    json.likes comment.num_likes
    json.dislikes comment.num_dislikes
    if current_user
        likes = comment.likes.select { |like| like.user_id == current_user.id }
        curr_like = likes[0]

        if curr_like
            json.like do
                json.set! curr_like.id do
                    json.extract! curr_like, :id, :liked, :likeable_id, :likeable_type, :user_id
                end
            end
        end
    end
end
