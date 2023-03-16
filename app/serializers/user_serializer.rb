class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :about_me, :avatar, :posts

  has_many :posts
  has_many :characters
  has_many :comments

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end
