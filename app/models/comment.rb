class Comment < ApplicationRecord
  belongs_to :chracter
  belongs_to :user
  belongs_to :post
end
