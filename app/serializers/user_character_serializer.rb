class UserCharacterSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :avatar, :about

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end

end