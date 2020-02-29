class Video < ApplicationRecord
    validates :user_id, :title, :description, :views, presence: true

    has_one_attached :video
    has_one_attached :thumbnail
    belongs_to :user
    has_many :comments
end
