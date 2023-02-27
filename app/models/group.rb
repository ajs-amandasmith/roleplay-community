class Group < ApplicationRecord
  has_many :characters
  has_many :users
  has_many :posts
end
