class CharacterSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :about, :user_id, :avatar

  belongs_to :user
  has_many :posts
  has_many :comments

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end