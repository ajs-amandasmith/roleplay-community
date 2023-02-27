class Comment < ApplicationRecord
  belongs_to :character
  belongs_to :user
  belongs_to :post
end
