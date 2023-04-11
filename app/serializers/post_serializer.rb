class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :comments, :post, :user, :character, :image, :tags

  belongs_to :user, serializer: PostUserSerializer
  belongs_to :character, serializer: PostCharacterSerializer
  has_many :comments, serializer: PostCommentSerializer
  has_many :tags, through: :post_tags

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

end