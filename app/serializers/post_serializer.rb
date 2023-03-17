class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :comments, :post, :user, :character

  belongs_to :user
  belongs_to :character

end