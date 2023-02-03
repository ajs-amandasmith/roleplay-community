class Character < ApplicationRecord
  belongs_to :user

  has_many :groups
  has_many :posts
  has_many :comments
end
