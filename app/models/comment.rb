class Comment < ApplicationRecord
    validates :user_id, :video_id, :body, presence: true

    belongs_to :user
    belongs_to :video

    has_many :likes, as: :likeable

    def num_likes
        likes = self.likes.select { |like| like.liked == true }
        likes.length
    end

    def num_dislikes
        dislikes = self.likes.select { |like| like.liked == false }
        dislikes.length
    end
end
