class Group < ApplicationRecord
  has_many :chracter_groups
  has_many :characters, through: :character_groups
  has_many :users
  has_many :posts
end
