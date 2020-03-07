class Video < ApplicationRecord
    validates :user_id, :title, :description, :views, presence: true

    has_one_attached :video
    has_one_attached :thumbnail
    belongs_to :user
    has_many :comments
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
