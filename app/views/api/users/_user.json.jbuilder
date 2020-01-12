json.extract! user, :id, :username
if user.profile_picture.attached?
    json.profilePicture url_for(user.profile_picture)
end