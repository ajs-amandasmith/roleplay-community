class Post < ApplicationRecord
  belongs_to :chracter
  belongs_to :group
  has_many :comments
end
