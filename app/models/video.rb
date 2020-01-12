class Video < ApplicationRecord
    validates :user_id, :title, :description, :views, presence: true

    has_one_attached :video
    belongs_to :user
end
