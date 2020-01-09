class Video < ApplicationRecord
    validates :user_id, :title, :description, :views, presence: true

    belongs_to :user
end
