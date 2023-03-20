class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :comments, :post, :user, :character

  belongs_to :user, serializer: PostUserSerializer
  belongs_to :character, serializer: PostCharacterSerializer

end