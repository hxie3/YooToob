class Comment < ApplicationRecord
    validates :user_id, :video_id, :body, presence: true

    belongs_to :user
    belongs_to :video
end
