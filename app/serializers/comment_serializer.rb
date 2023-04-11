class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :character, :user, :post

  belongs_to :user, serializer: CommentUserSerializer
  belongs_to :character, serializer: CommentCharacterSerializer
  belongs_to :post

end