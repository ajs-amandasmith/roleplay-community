class Post < ApplicationRecord
  belongs_to :chracter
  belongs_to :user
  has_many :comments
end
