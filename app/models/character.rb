class Character < ApplicationRecord
  belongs_to :user

  has_many :character_groups
  has_many :groups, through: :character_groups

  has_many :posts
  has_many :comments
end
