json.set! like.id do
    json.extract! like, :id
    json.userId like.user_id
    json.likeableType like.likeable_type
    json.likeableId like.likeable_id
end