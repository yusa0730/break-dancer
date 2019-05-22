class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  has_many :likes, dependent: :destroy

  validates :context,length: { minimum: 1 }
  validates :context,length: { maximum: 100 }

  def like_user(user_id)
   	likes.find_by(user_id: user_id)
  end
end
